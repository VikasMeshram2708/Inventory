/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  pages: {
    newUser: "/auth/newuser",
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Type Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type Password",
        },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const user = await db.query.usersTable.findFirst({
          where: eq(usersTable.email, credentials?.email),
        });

        if (!user) {
          throw new Error("User Does not exist");
        }

        // compare the password
        const validPassword = await bcrypt.compare(
          credentials.password,
          user?.password as string
        );

        if (!validPassword) {
          throw new Error("Invalid Credentials");
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
      }
      return token;
    },
    session({ token, session }) {
      if (token) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (token.exp && currentTime > token.exp) {
          throw new Error("Session Expired");
        }

        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
} satisfies NextAuthOptions;

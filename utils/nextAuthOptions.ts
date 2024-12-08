import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      async authorize(credentials) {
        const user = {
          id: "1",
          username: "test1",
          email: "test1@gmail.com",
          password: "test1",
        };

        if (credentials?.email !== user.email) {
          throw new Error("Invalid Email Provided");
        }

        if (credentials.password !== user.password) {
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
      }
      return token;
    },
    session({ token, session }) {
      if (token) {
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

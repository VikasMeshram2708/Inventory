"use server";

import { newUser } from "@/app/models/authSchema";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Creating New User
export async function signUp(formData: FormData) {
  const rawData: newUser = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
    avatarUrl: formData.get("avatarUrl") as string,
  };

  const validateSchema = newUser.safeParse(rawData);

  if (!validateSchema.success) {
    return {
      error: validateSchema.error.message,
    };
  }
  const { email, password, username, avatarUrl } = validateSchema.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [userNameExist, emailExist] = await Promise.all([
    await db.query.usersTable.findFirst({
      where: eq(usersTable.username, username),
    }),

    await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    }),
  ]);

  if (userNameExist) {
    return {
      error: "User Name already in use",
    };
  }

  if (emailExist) {
    return {
      error: "Email already in use",
    };
  }

  await db.insert(usersTable).values({
    username: username,
    email: email,
    password: hashedPassword,
    avatarUrl: (avatarUrl as string) || "https://is.gd/YnlDuO",
  });

  revalidatePath("/auth/newuser");

  return {
    message: "User Registered Successfully",
  };
}

"use server";

import { newUser } from "@/app/models/authSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
      error: validateSchema.error.issues,
    };
  }
  const { email, password, username, avatarUrl } = validateSchema.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [emailExist, userNameExist] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        email,
      },
    }),

    await prisma.user.findUnique({
      where: {
        username,
      },
    }),
  ]);

  if (emailExist) {
    return {
      error: "Email is already in use",
    };
  }
  if (userNameExist) {
    return {
      error: "User Name is already in use",
    };
  }

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      avatarUrl,
    },
  });

  return {
    message: "User Registered Successfully",
  };
}

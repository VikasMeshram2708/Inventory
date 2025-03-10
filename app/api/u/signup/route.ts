import { signUpSchema } from "@/app/models/UserSchema";
import { DbConnect } from "@/lib/DB";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const parsedRes = signUpSchema.safeParse(reqBody);
    if (!parsedRes.success) {
      throw parsedRes.error;
    }

    const parsedData = parsedRes.data;

    await DbConnect();

    // validate email
    const userExist = await prismaInstance.user.findFirst({
      where: {
        email: parsedData?.email,
      },
    });

    if (userExist) {
      throw new Error("User Already Exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(parsedData?.password, 10);

    await prismaInstance.user.create({
      data: {
        username: parsedData?.username,
        email: parsedData?.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User Registered",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};

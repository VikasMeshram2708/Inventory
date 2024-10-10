import { loginSchema } from "@/app/models/UserSchema";
import { DbConnect } from "@/lib/DB";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const parsedRes = loginSchema.safeParse(reqBody);
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

    if (!userExist) {
      throw new Error("User does not exist");
    }

    // compare the password
    const validPassword = await bcrypt.compare(
      parsedData?.password,
      userExist?.password
    );

    if (!validPassword) {
      throw new Error("Invalid Credentials");
    }

    return NextResponse.json(
      {
        message: "User Logged In",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};

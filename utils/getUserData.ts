import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getUserData(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      throw new Error("Un-authorized- Login Required");
    }
    return token;
  } catch (error) {
    throw new Error(`Something went wrong. Please try again. ${error}`);
  }
}

import { DbConnect } from "@/lib/DB";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const token = await GetDataFromToken(request);
    if (!token) {
      throw new Error("Unauthenticated User");
    }
    await DbConnect();
    const products = await prismaInstance.product.findMany({
      where: {
        userId: token?.id as number,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      {
        products,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};

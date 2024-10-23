import { DbConnect } from "@/lib/DB";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const skip = searchParams.get("skip");
    const limit = searchParams.get("limit");

    const token = await GetDataFromToken(request);
    if (!token) {
      throw new Error("Unauthenticated User");
    }
    await DbConnect();

    const [total, products] = await Promise.all([
      await prismaInstance.product.count({
        where: {
          userId: token?.id as number,
        },
      }),
      await prismaInstance.product.findMany({
        where: {
          userId: token?.id as number,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: Number(skip) || 0,
        take: Number(limit) || 10,
      }),
    ]);
    return NextResponse.json(
      {
        hasMore: total - Number(skip) - Number(limit) > 0,
        total,
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

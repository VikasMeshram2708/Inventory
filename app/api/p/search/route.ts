import { queryProductSchema } from "@/app/models/ProductSchema";
import { DbConnect } from "@/lib/DB";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const token = await GetDataFromToken(request);

    const parsedRes = queryProductSchema.safeParse(reqBody);
    if (!parsedRes.success) {
      throw new Error(parsedRes.error.message || "Invalid Data");
    }
    const parsedData = parsedRes.data;
    const { query } = parsedData;
    // console.log("pd", query);

    await DbConnect();

    const products = await prismaInstance.product.findMany({
      where: {
        userId: token?.id as number,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        title: "asc",
      },
    });

    if (products.length === 0) {
      return NextResponse.json(
        {
          message: "No products found matching the query",
        },
        {
          status: 404,
        }
      );
    }
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

import { createProductSchema } from "@/app/models/ProductSchema";
import { DbConnect } from "@/lib/DB";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const token = await GetDataFromToken(request);
    // console.log("to", token);

    const parsedRes = createProductSchema.safeParse(reqBody);
    if (!parsedRes.success) {
      throw parsedRes.error;
    }

    const parsedData = parsedRes.data;

    await DbConnect();

    await prismaInstance.product.create({
      data: {
        title: parsedData?.title,
        description: parsedData?.description,
        category: parsedData?.category,
        amount: parsedData?.amount,
        User: {
          connect: {
            id: token?.id as number,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Product Added",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};

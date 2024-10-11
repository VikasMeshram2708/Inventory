// import { createProductSchema } from "@/app/models/ProductSchema";
// import { DbConnect } from "@/lib/DB";
// import { ErrorHandler } from "@/lib/ErrorHandler";
// import { prismaInstance } from "@/lib/PrismaInstance";
// import { NextRequest, NextResponse } from "next/server";

// export const POST = async (request: NextRequest) => {
//   try {
//     const reqBody = await request.json();

//     const parsedRes = createProductSchema.safeParse(reqBody);
//     if (!parsedRes.success) {
//       throw parsedRes.error;
//     }

//     const parsedData = parsedRes.data;

//     await DbConnect();

//     await prismaInstance.product.create({
//       data: {
//         title: parsedData?.title,
//         description: parsedData?.description,
//         category: parsedData?.category,
//         amount: parsedData?.amount,
//         User: {
//           connect: {
//             id: 1,
//           },
//         },
//       },
//     });

//     return NextResponse.json(
//       {
//         messagse: "Product Added",
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error) {
//     return ErrorHandler(request, error as Error);
//   }
// };

"use server";

import { db } from "@/db";
import { getUserData } from "./auth";
import { addProductSchema } from "@/app/models/inventorySchema";
import { inventoryTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Add Product
export async function addProduct(formData: FormData) {
  const rawData = {
    title: String(formData.get("title")),
    description: String(formData.get("description")),
    amount: Number(formData.get("amount")),
    quantity: Number(formData.get("quantity")),
  };

  const parsedRes = addProductSchema.safeParse(rawData);

  if (!parsedRes.success) {
    const msg = parsedRes.error.issues.map((e) => ({
      message: e.message,
    }));
    return {
      error: msg,
    };
  }

  const { title, amount, description, quantity } = parsedRes.data;

  const userData = await getUserData();

  await db.insert(inventoryTable).values({
    title,
    amount,
    description,
    quantity,
    userId: Number(userData.user?.id),
  });

  revalidatePath("/");

  return {
    message: "Product Added to Inventory",
  };
}

// Read all Products user Specific

export async function fetchProducts() {
  const userData = await getUserData();

  if (!userData) {
    throw new Error("Login Required");
  }

  const products = await db.query.inventoryTable.findMany({
    where: eq(inventoryTable.userId, Number(userData?.user?.id)),
    orderBy: [desc(inventoryTable.createdAt)],
    limit: 10,
  });

  return {
    data: products,
  };
}

"use server";

import { addProductSchema } from "@/app/models/inventorySchema";
import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { getUserData } from "./auth";

export async function addProduct(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  };

  console.log("rw", Number(rawData.price));

  const { title, description, price } = rawData;
  const parsedRes = addProductSchema.safeParse({
    title,
    description,
    price: Number(price),
  });

  if (!parsedRes.success) {
    return {
      error: parsedRes.error?.message,
    };
  }

  const parsedData = parsedRes.data;

  const userData = await getUserData();
  if (!userData) {
    return {
      error: "Login Required",
    };
  }

  await db.insert(productsTable).values({
    title: parsedData.title,
    price: parsedData.price,
    description: parsedData.description,
    userId: Number(userData?.user?.id),
  });

  return {
    message: "Product Added to Inventory",
  };
}

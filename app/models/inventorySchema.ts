import * as z from "zod";

export const addProductSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must have at-least 2 characters",
    })
    .max(250, { message: "Title should not exceed more than 200 characters" }),
  description: z
    .string()
    .min(2, {
      message: "Title must have at-least 2 characters",
    })
    .max(255, { message: "Title should not exceed more than 255 characters" }),
  amount: z.number(),
  quantity: z.number(),
});

export type addProductSchema = z.infer<typeof addProductSchema>;

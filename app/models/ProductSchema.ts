import * as z from "zod";

export const createProductSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(150, { message: "Title cannot exceed 150 characters." }),

  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long." })
    .max(250, { message: "Description cannot exceed 250 characters." }),

  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters long." })
    .max(50, { message: "Category cannot exceed 50 characters." }),

  amount: z
    .number()
    .positive({ message: "Amount must be a positive number." })
    .max(10000, { message: "Amount cannot exceed 10,000." }),
});

export type createProductSchema = z.infer<typeof createProductSchema>;

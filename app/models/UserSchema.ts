import * as z from "zod";

export const signUpSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

export type loginSchema = z.infer<typeof loginSchema>;

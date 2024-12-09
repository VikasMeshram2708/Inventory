import * as z from "zod";

export const newUser = z.object({
  username: z
    .string()
    .min(2, {
      message: "User Name must have at-least 2 characters",
    })
    .max(100, {
      message: "User Name should not exceed more than 100 characters",
    }),
  avatarUrl: z.string().url().optional().nullable().or(z.literal("")),
  email: z.string().email(),
  password: z
    .string()
    .min(50, {
      message: "User Name must have at-least 50 characters",
    })
    .max(100, {
      message: "User Name should not exceed more than 100 characters",
    }),
});

export type newUser = z.infer<typeof newUser>;

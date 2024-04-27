import { z } from "zod";

export const MessageSchema = z.object({
  conetnt: z
    .string()
    .min(10, { message: "Contetn must be at least 10 characters" })
    .max(300, { message: "Contetn must be less than 300 characters" }),
});

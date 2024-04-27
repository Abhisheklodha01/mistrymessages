import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(5, "Username must be atleast 5 character")
  .max(10, "Username must be no more than 10 character")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const SignUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 character" }),
});
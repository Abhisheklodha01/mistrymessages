import { z } from "zod";

export const SingInSchema = z.object({
  identifier: z.string(),
  password: z.string()
});

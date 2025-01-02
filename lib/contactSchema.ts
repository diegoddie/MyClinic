import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  email: z.string().email(),
  message: z.string().min(4).max(500),
});
import * as z from "zod";

export const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }).optional().or(z.literal("")),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }).optional().or(z.literal("")),
  profilePicture: z.string().url().optional(),
  taxId: z.string().length(16, {
    message: "Tax ID must be exactly 16 characters.",
  }).optional().or(z.literal("")),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: "Please enter a valid birth date in the format dd/mm/yyyy.",
  }).optional().or(z.literal("")),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }).optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
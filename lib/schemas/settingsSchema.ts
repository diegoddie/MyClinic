import * as z from "zod";

const fileValidator = (file: File | null) => {
  if (!file) return true; // Allow null (empty input)

  const allowedTypes = ["image/jpeg", "image/png"]; // Add other types if needed
  const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

  if (!allowedTypes.includes(file.type)) {
    return false;
  }

  if (file.size > maxSize) {
    return false;
  }

  return true;
};

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .optional()
    .or(z.literal("")),
  profilePicture: z
    .union([
      z.instanceof(File).refine(fileValidator, {
        message: "File must be an image and cannot exceed 5MB in size.",
      }),
      z.string().url().optional().or(z.literal("")),
      z.null()
    ])
    .optional(),
  taxId: z
    .string()
    .length(16, {
      message: "Tax ID must be exactly 16 characters.",
    })
    .optional()
    .or(z.literal("")),
  birthDate: z.date().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    })
    .optional()
    .or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

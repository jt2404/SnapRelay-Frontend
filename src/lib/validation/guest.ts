import { z } from "zod";

export const guestDetailsSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  whatsapp: z
    .string()
    .min(1, "WhatsApp number is required")
    .regex(/^\+?[0-9\s\-()]{10,17}$/, "Enter a valid phone number (10-15 digits)"),
  consent: z.literal(true, {
    message: "Please consent to continue",
  }),
});

export type GuestDetailsValues = z.infer<typeof guestDetailsSchema>;

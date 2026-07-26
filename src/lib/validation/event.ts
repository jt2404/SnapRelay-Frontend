import { z } from "zod";

export const FUNCTION_TYPES = [
  "Wedding Ceremony",
  "Reception",
  "Sangeet",
  "Mehendi",
  "Haldi",
  "Engagement",
  "Pre-Wedding Shoot",
  "Other",
] as const;

export const eventFormSchema = z
  .object({
    name: z.string().min(2, "Event name must be at least 2 characters").max(255),
    coupleName: z.string().max(255).optional().or(z.literal("")),
    functionType: z.string().min(1, "Select a function type"),
    venue: z.string().max(255).optional().or(z.literal("")),
    eventDate: z.string().min(1, "Event date is required"),
    privacyMode: z.enum(["public", "private"]),
    publicSubmissionEnabled: z.boolean(),
  })
  .refine(
    (data) => !(data.privacyMode === "private" && data.publicSubmissionEnabled),
    {
      message: "Private events can't allow public self-submission",
      path: ["publicSubmissionEnabled"],
    }
  );

export type EventFormValues = z.infer<typeof eventFormSchema>;

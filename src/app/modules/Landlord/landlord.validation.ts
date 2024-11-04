import { z } from "zod";

export const createLandlordValidationSchema = z.object({
  body: z.object({
    landlord: z.object({
      firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
          message: "First Name must start with a capital letter",
        }),
      lastName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
          message: "First Name must start with a capital letter",
        }),
      email: z.string().email("Invalid email format"),
      phoneNumber: z.string({ required_error: "Phone Number is required" }),
      about: z.string({ required_error: "About is required" }),
    }),
  }),
});

export const landlordValidations = { createLandlordValidationSchema };

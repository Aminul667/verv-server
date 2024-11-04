import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    user: z.object({
      email: z.string().email("Invalid email format"),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
      role: z.enum(["superAdmin", "admin", "landlord", "tenant"]),
    }),
  }),
});

export const userProfileValidationSchema = z.object({
  body: z.object({
    userProfile: z.object({
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

// export default userValidationSchema;

export const userValidations = {
  userValidationSchema,
  userProfileValidationSchema,
};

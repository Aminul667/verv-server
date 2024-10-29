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

export default userValidationSchema;

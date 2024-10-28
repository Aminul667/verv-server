import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string().nonempty("Name is required"),
      email: z.string().email("Invalid email format"),
    }),
  }),
});

export default userValidationSchema;

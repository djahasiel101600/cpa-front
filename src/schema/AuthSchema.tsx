import z from "zod";

export const AuthSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username should be atleast 3 characters" }),
  password: z
    .string()
    .min(4, { message: "password should be atleast 4 characters" }),
});

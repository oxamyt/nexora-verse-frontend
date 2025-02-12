import { z } from "zod";

const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(15, { message: "Username must not exceed 15 characters." }),
    password: z
      .string()
      .trim()
      .min(3, { message: "Password must be at least 3 characters long." })
      .max(30, { message: "Username must not exceed 30 characters." }),
    confirm: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(15, { message: "Username must not exceed 15 characters." })
    .optional(),
  password: z
    .string()
    .trim()
    .min(3, { message: "Password must be at least 3 characters long." })
    .max(30, { message: "Username must not exceed 30 characters." }),
});

const profileSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(15, { message: "Username must not exceed 15 characters." })
      .optional(),
    bio: z
      .string()
      .min(3, { message: "Bio must be at least 3 characters long." })
      .max(80, { message: "Bio must not exceed 80 characters." })
      .optional(),
  })
  .refine((data) => data.username || data.bio, {
    message: "At least one of 'username' or 'bio' must be provided.",
    path: ["username", "bio"],
  });

export { signUpSchema, loginSchema, profileSchema };

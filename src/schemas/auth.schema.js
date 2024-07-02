import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  emailOrUsername: z
    .string({
      required_error: "Email or username is required",
    })
    .refine((value) => {
      // Verificar si es un email válido o si es un username no vacío
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || value.trim().length > 0;
    }, {
      message: "Invalid email or username",
    }),

  password: z
    .string({
      required_error: "Password is required",
    }),
});

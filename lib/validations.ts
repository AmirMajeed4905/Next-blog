import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid email daalen"),
  password: z.string().min(6, "Password kam az kam 6 characters ka hona chahiye"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Naam kam az kam 2 characters ka hona chahiye"),
  email: z.string().email("Valid email daalen"),
  password: z.string().min(6, "Password kam az kam 6 characters ka hona chahiye"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords match nahi kar rahe",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
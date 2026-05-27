import { z } from "zod";

export const signupValidation = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	role: z.enum(["admin", "user"]).optional()
});

export const loginValidation = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long")
});

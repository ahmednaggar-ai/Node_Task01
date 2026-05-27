import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string({ error: "Name is required" })
        .trim()
        .min(2, "Name must be at least 2 characters"),
    email: z
        .string({ error: "Email is required" })
        .trim()
        .toLowerCase()
        .pipe(z.email("Please provide a valid email")),
    password: z
        .string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
    email: z
        .string({ error: "Email is required" })
        .trim()
        .toLowerCase()
        .pipe(z.email("Please provide a valid email")),
    password: z.string({ error: "Password is required" }),
});

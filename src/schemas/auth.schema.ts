import { z } from "zod";

export const loginSchema = z.object({
userName: z.string().min(1, { message: "Name is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})
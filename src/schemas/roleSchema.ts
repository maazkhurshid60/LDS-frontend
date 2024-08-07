import { z } from "zod";

export const roleSchema=z.object({
    name: z.string().min(1, { message: "name is required" }),
    description: z.string(),

    isActive: z.boolean().optional(),
})
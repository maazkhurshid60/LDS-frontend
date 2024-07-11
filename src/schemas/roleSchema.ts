import { z } from "zod";

export const roleSchema=z.object({
    name: z.string().min(1, { message: "name is required" }),
    description: z.string().min(1, { message: "description is required" }),

    isActive: z.boolean().optional().refine((value) => value === true, {
        
        message: "This Checked is required",
      }).optional(),
})
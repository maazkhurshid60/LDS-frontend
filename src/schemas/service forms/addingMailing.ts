import { z } from "zod";
export const addingMailingSchema = z.object({
    firstName: z.string().min(1, "first name is required."),
    address: z.string().min(1, "address is required."),
    city: z.string().optional(),
    state: z.string().optional(),
    apt: z.string().optional(),
    zip: z.string().regex(/^\d+$/, { message: "zip no must be number" }),
    rRR:z.boolean().optional(),
})
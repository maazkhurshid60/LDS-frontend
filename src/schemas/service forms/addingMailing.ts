import { z } from "zod";
export const addingMailingSchema = z.object({
    firstName: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    apt: z.string().optional(),
    zip: z.string().optional(),
    rRR: z.boolean().optional(),
})
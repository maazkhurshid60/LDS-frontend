import { z } from "zod";
export const addingMailingSchema = z.object({
    firstName: z.string().min(1, "first name is required."),
    address: z.string().min(1, "address is required."),
    city: z.string().min(1, "city is required."),
    state: z.string().min(1, "state is required."),
    apt: z.string().min(1, "apt is required."),
    zip: z.string().regex(/^\d+$/, { message: "zip no must be number" }),
    rRR:z.boolean().optional(),
})
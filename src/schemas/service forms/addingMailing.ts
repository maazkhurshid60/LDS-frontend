import { z } from "zod";
export const addingMailingSchema = z.object({
    label: z.string().min(1, "full name is required."),
    address: z.string().min(1, "address is required."),
    city: z.string().min(1, "city is required."),
    state: z.string().min(1, "state is required."),
    apt: z.string().min(1, "apt is required."),
    zip: z.string().min(1, "zip is required."),
    rrr:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
})
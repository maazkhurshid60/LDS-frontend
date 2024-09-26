

import { z } from "zod";
export const standardSchema = z.object({
    otherStdDescription: z.string().optional(),
    indexNumber: z.string().optional(),
    court: z.string().optional(),
    country: z.string().optional(),
    plaintiff: z.string().optional(),
    defendant: z.string().optional(),
    fullName: z.string().optional(),
    address: z.string().optional(),
    apt: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
})
import { z } from "zod";
export const clientSchema = z.object({
    code: z.string().min(1, { message: "Code is required" }),
    fullName: z.string().min(1, { message: "Full Name is required" }),
    mi: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    phone: z.string().min(7, { message: "Phone is required and must greater than 7 digits" }),
    zip: z.string().optional(),
    fax: z.string().optional(),
    apt: z.string().optional(),
    isActive: z.boolean().optional()

})
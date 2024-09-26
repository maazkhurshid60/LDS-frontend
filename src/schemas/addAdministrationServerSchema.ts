

import { z } from "zod";
export const userInputSectionSchema = z.object({
    serverCode: z.string().min(1, { message: "Server Code is required" }),
    deviceCode: z.string().min(1, { message: "Device Code is required" }),

    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),

    country: z.string().optional(),
    state: z.string().optional(),
    phone: z.string().min(7, { message: "Phone is required and must greater than 7 digits" }),
    zip: z.string().optional(),
    fax: z.string().optional(),
    licenseNo: z.string().optional(),
    apt: z.string().optional(),
    isActive: z.boolean().optional(),

})
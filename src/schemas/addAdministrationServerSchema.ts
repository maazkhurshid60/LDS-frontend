

import { z } from "zod";
export const userInputSectionSchema = z.object({
    serverCode: z.string().optional(),
    deviceCode: z.string().optional(),

    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),

    country: z.string().optional(),
    state: z.string().optional(),
    phone: z.string().optional(),
    zip: z.string().optional(),
    fax: z.string().optional(),
    licenseNo: z.string().optional(),
    apt: z.string().optional(),
    isActive: z.boolean().optional(),

})
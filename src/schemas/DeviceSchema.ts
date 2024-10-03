import { z } from "zod";

export const deviceSchema = z.object({
    deviceCode: z.string().optional(),
    isActive: z.boolean().optional(),
    deviceName: z.string().optional(),
    productType: z.string().optional()
})
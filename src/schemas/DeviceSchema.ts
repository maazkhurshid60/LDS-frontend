import { z } from "zod";

export const deviceSchema = z.object({
    deviceCode: z.string().min(3, { message: "Device Code not less than 3letters" }),
    isActive: z.boolean().optional(),
    deviceName: z.string().min(1, { message: "Device Name is required" }),
    productType: z.string().optional()
})
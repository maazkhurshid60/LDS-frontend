import { z } from "zod";

export const serviceTypeSchema = z.object({
    
    serviceTypeCode: z.string().min(1, { message: "service Type Code is required" }),
    serviceTypeDescription: z.string().min(1, { message: "service Type Description is required" }),

})
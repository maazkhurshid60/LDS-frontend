import { z } from "zod";

export const serviceResultSchema = z.object({
    
    serviceResultCode: z.string().min(1, { message: "service Result Code is required" }),
    serviceResultDescription: z.string().min(1, { message: "service Result Description is required" }),

})
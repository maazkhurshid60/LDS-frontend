import { z } from "zod";

export const serviceResultSchema = z.object({
    
descriptionServiceResult: z.string().min(1, { message: "Description is required" }),
})
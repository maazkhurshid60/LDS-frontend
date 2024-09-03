import { z } from "zod";

export const ltServiceTypeSchema=z.object({
    name: z.string().min(1, { message: "name is required" }),
   
})
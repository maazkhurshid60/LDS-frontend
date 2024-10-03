import { z } from "zod";

export const serviceTypeSchema = z.object({

    serviceTypeCode: z.string().optional(),
    serviceTypeDescription: z.string().optional(),

})
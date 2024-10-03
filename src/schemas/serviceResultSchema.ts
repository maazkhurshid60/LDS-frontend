import { z } from "zod";

export const serviceResultSchema = z.object({

    serviceResultCode: z.string().optional(),
    serviceResultDescription: z.string().optional(),

})
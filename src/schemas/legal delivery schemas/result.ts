import { z } from "zod";
export const resultSchema = z.object({
    dateEntered: z.string().optional(),
    dateService: z.string().optional(),
    date1Attepmt: z.string().optional(),
    date2Attepmt: z.string().optional(),
    date3Attepmt: z.string().optional(),
    dateMailing: z.string().optional(),
    resultOptions: z.string().optional(),
    serviceTypeOptions: z.string().optional(),
    corpRecipient: z.string().optional(),
    corpRecipientTitle: z.string().optional(),
    substituteDeliveredTo: z.string().optional(),
})
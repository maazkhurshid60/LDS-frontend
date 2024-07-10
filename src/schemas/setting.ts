import { z } from "zod";
export const settingSchema = z.object({  
    saturdayDelivery: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
    anyTimeDelivery: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),

})
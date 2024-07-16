  import { z } from "zod";
export const settingSchema = z.object({  
    label:z.string().min(1,{message:"label is required"}),
value: z.boolean().refine((value) => value === true, {
    message: "This Checked is required",
  }),

})
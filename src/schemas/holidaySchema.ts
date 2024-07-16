import { z } from "zod";

export const holidaySchema = z.object({
    
     holidayDescription: z.string().min(1, { message: "Description is required" }),
     holidayYear: z.string().regex(/^\d+$/,{message:"Years must be number"}).min(4, { message: "Years not less than 4number" }).max(4, { message: "Years not more than 4number" }),
holidayDate: z.string().min(1, { message: "Date is required" }),


})
import { z } from "zod";

export const holidaySchema = z.object({
    
descriptionHoliday: z.string().min(1, { message: "Description is required" }),
})
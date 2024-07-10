import { z } from "zod";
export const standardSchema = z.object({
    otherStdDescription: z.string().min(1, "Description is required."),
    indexNumber: z.string().regex(/^\d+$/,{message:"index no must be number"}) ,
    court: z.string().min(1, "Court is required."),
    country: z.string().min(1, "country is required."),
    plaintiff: z.string().min(1, "Plaintiff is required."),
    defendant: z.string().min(1, "Defendant is required."),
    fullName: z.string().min(1, "Full Name is required."),
    address: z.string().min(1, "Address is required."),
    apt: z.string().min(1, "Apt is required."),
    city: z.string().min(1, "City is required."),
    zip: z.string().min(1, "Zip is required."),    
})
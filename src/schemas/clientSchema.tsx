import { z } from "zod";
export const clientSchema = z.object({
    code: z.string().min(1, { message: "Code is required" }),
    fullName: z.string().min(1, { message: "Full Name is required" }),
    mi: z.string().min(1, { message: "MI is required" }),
    address1: z.string().min(1, { message: "Address1 is required" }),
    address2: z.string().min(1, { message: "Address2 is required" }),
    // country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
    city: z.string().min(1, { message: "City is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    zip:z.string().min(1,{message:"Zip is required"}).regex(/^\d+$/,{message:"zip must be number"}) ,
    fax:z.string().min(1,{message:"Fax is required"}).regex(/^\d+$/,{message:"License must be Number"}),
    apt:z.string().min(1,{message:"Apt is required"}).regex(/^\d+$/,{message:"License must be Number"}),
    isActive: z.boolean().optional()

})
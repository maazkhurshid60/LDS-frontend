import { z } from "zod";
export const userInputSectionSchema = z.object({
    code: z.string().min(1, { message: "Code is required" }),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    MI: z.string().min(1, { message: "MI is required" }),
    address1: z.string().min(1, { message: "Address is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
    city: z.string().min(1, { message: "City is required" }),
    phone: z.string().min(1, { message: "Phone is required" }).regex(/^\d+$/, { message: 'Phone must be a number' }),
    zip:z.string().min(1,{message:"Zip is required"}).regex(/^\d+$/,{message:"zip must be number"}) ,
    fax:z.string().min(1,{message:"Fax is required"}).regex(/^\d+$/,{message:"Fax must be number"}),
    licenseNo:z.string().min(1,{message:"License is required"}).regex(/^\d+$/,{message:"License must be Number"}),
    apt:z.string().min(1,{message:"Apt is required"}).regex(/^\d+$/,{message:"Apt must be Number"})
})
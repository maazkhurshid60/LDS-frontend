import { z } from "zod";
export const userInputSectionSchema = z.object({
    serverCode: z.string().min(1, { message: "Server Code is required" }),
    deviceCode: z.string().min(1, { message: "Device Code is required" }),
    // deviceCode: z.boolean().refine((value) => value === true, {
    //     message: "This Checked is required",
    //   }),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    address1: z.string().min(1, { message: "Address is required" }),
    address2: z.string().min(1, { message: "Address is required" }),

    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
    // city: z.string().min(1, { message: "City is required" }),
    phone: z.string().min(7, { message: "Phone is required and must greater than 7 digits" }),
    zip:z.string().min(1,{message:"Zip is required"}) ,
    fax:z.string().min(1,{message:"Fax is required"}),
    licenseNo:z.string().min(1,{message:"License is required"}),
    apt:z.string().min(1,{message:"Apt is required"}),
    isActive: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),

})
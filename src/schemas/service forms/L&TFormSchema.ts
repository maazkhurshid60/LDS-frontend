// import { optional, z } from "zod"

// export const LTFormSchema = z.object({
//     jobNo: z.string().regex(/^\d+$/, { message: "job no must be number" }),
//     // jobNo: z.string().min(1,{message:"Job No is required"}),
//     caseNo: z.string().regex(/^\d+$/, { message: "case no must be number" }),
//     // caseNo: z.string().min(1,{message:"case No is required"}),

//     name: z.string().min(1, { message: "Name is require" }).optional(),
//     isActive: z.boolean().refine((value) => value === true, {
//         message: "This Checked is required",
//     }).optional(),
//     inputDate: z.string().refine(
//         (value) => {
//             const date = new Date(value)
//             return !isNaN(date.getTime())
//         },
//         { message: "Required Input Date" }
//     ),
//     clientId: z.string().min(1, "Please select client."),
//     serviceType: z.string().min(1, "Please select service type."),
//     caption: z.string().min(1, "Caption is required."),
//     lTServiceType:z.boolean().refine((value) => value === true, {
//         message: "This Checked is required",
//       }).optional(),
//       fullName: z.string().min(1, "Full name is required."),
//       businessName: z.string().min(1, "bussiness name is required."),
//       address: z.string().min(1, "address is required."),
//       apt: z.string().min(1, "apt is required."),
//       city: z.string().min(1, "city is required."),
//       state: z.string().min(1, "state is required."),
//       zip: z.string().min(1, "zip is required."),
//       description: z.string().min(1, "description is required."),
//     //   mailingAddress: z.string().min(1, "Please select service type."),
// })

import { optional, z } from "zod"

export const LTFormSchema = z.object({
    // jobNo: z.string().regex(/^\d+$/, { message: "job no must be number" }),
    // jobNo: z.string().min(1,{message:"Job No is required"}),
    caseNo: z.string().regex(/^\d+$/, { message: "case no must be number" }),
    // caseNo: z.string().min(1,{message:"case No is required"}),

    name: z.string().min(1, { message: "Name is require" }).optional(),
    oLTIndexNo: z.string().optional(),
    oLTDescription: z.string().optional(),

    isActive: z.boolean().optional(),
    inputDate: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required Input Date" }
    ),
    clientId: z.string().min(1, "Please select client."),
    serviceType: z.string().min(1, "Please select service type."),
    caption: z.string().optional(),
    lTServiceType: z.boolean().optional(),
    lTSFirstName: z.string().optional(),
    lTSBusinessName: z.string().optional(),
    lTSAddress: z.string().optional(),
    lTSApt: z.string().optional(),
    lTSCity: z.string().optional(),
    lTSState: z.string().optional(),
    lTSZip: z.string().optional(),
    lTSDescription: z.string().optional(),
    noOfAddLMailings: z.string().optional(),
    mailingAddresses: z.string().optional(),
    lTSCityLongitude: z.string().optional(),
    lTSCityLatitude: z.string().optional()

    //   mailingAddress: z.string().min(1, "Please select service type."),
})
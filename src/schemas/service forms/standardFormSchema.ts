// import { z } from "zod";

// export const standardFormSchema = z.object({
//     // STANDARD SERVICE TYPE VALIDATION STARTS
//     standardServiceType:z.boolean().refine((value) => value === true, {
//         message: "This Checked is required",
//       }).optional(),
//     // indexNo: z.string().regex(/^\d+$/, { message: "index no must be number" }),
//     // otherStandardDescription: z.string().min(1, { message: "Standard Description is required" }),
//     // STANDARD SERVICE TYPE VALIDATION ENDS
//     // STANDARD SERVICE DETAIL VALIDATION STARTS
//     court: z.string().min(1, { message: "Court is required" }),
//     defendants: z.string().min(1, { message: "Defedant is required" }),
//     plaintiff: z.string().min(1, { message: "Plaintiff is required" }),
//     country: z.string().min(1, { message: "country is required" }),
//     // SERVE TO VALIDATION ENDS
//     firstName: z.string().min(1, { message: "First name is required" }),
//     address: z.string().min(1, { message: "address is required" }),
//     city: z.string().min(1, { message: "city is required" }),
//     zip: z.string().min(1, { message: "zip is required" }),
//     state: z.string().min(1, { message: "state is required" }),
//     apt: z.string().min(1, { message: "apt is required" }),
//     // SERVE TO VALIDATION ENDS
// })

import { z } from "zod";

export const standardFormSchema = z.object({
    // STANDARD SERVICE TYPE VALIDATION STARTS
    standardServiceType:z.boolean().optional(),
    // indexNo: z.string().regex(/^\d+$/, { message: "index no must be number" }),
    // otherStandardDescription: z.string().min(1, { message: "Standard Description is required" }),
    // STANDARD SERVICE TYPE VALIDATION ENDS
    // STANDARD SERVICE DETAIL VALIDATION STARTS
    court: z.string().optional(),
    defendants: z.string().optional(),
    plaintiff: z.string().optional(),
    country: z.string().optional(),
    // SERVE TO VALIDATION ENDS
    firstName: z.string().min(1, { message: "First name is required" }),
    address: z.string().min(1, { message: "address is required" }),
    city: z.string().optional(),
    zip: z.string().optional(),
    state: z.string().optional(),
    apt: z.string().optional(),
    // SERVE TO VALIDATION ENDS


})
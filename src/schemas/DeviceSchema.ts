// import { z } from "zod";

// export const deviceSchema=z.object({
//     deviceCode:z.string().min(3,{message:"Device Code not less than 3letters"}),
//     isActive: z.boolean().refine((value) => value === true, {
//         message: "This Checked is required",
//       }),
//     deviceName:z.string().min(1,{message:"Device Name is required"}),
//     // deviceId:z.string().min(1,{message:"Device Id is required"}),

//     productType:z.string().min(1,{message:"Product Type is required"})
// })

import { z } from "zod";

export const deviceSchema=z.object({
    deviceCode:z.string().min(3,{message:"Device Code not less than 3letters"}),
    isActive: z.boolean().optional(),
    deviceName:z.string().min(1,{message:"Device Name is required"}),
    // deviceId:z.string().min(1,{message:"Device Id is required"}),

    productType:z.string().optional()
})
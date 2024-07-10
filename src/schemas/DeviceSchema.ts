import { z } from "zod";

export const deviceSchema=z.object({
    deviceId:z.string().min(1,{message:"Device Id is required"}),
    deviceCode:z.string().min(1,{message:"Device Code is required"}),
    deviceName:z.string().min(1,{message:"Device Name is required"}),
    productType:z.string().min(1,{message:"Product Type is required"})
})
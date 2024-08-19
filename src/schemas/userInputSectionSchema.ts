import { z } from "zod";

export const userInputSectionSchema=z.object({
    email:z.string().email({message:"Email is not valid"}).min(1,{message:"Email is required"}),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    userName:z.string().min(1,{message:"User Name is required"}),
    roles:z.string().min(1,{message:"Role is required"}),
    password:z.string().min(1,{message:"User Name is required"}),
})

export const userUpdateInputSectionSchema=z.object({
    email:z.string().email({message:"Email is not valid"}).min(1,{message:"Email is required"}),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    userName:z.string().min(1,{message:"User Name is required"}),
    roles:z.string().optional(),
    password:z.string().optional(),
})

export const userInputSectionRolesSchema=z.object({    roles: z.string().min(1, "Please select role.").optional(),
})
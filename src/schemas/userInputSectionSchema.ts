import { z } from "zod";

export const userInputSectionSchema=z.object({
    email:z.string().email({message:"Email is not valid"}).min(1,{message:"Email is required"}),
    firstName:z.string().min(1,{message:"First Name is required"}),
    lastName:z.string().min(1,{message:"Last Name is required"}),
    userName:z.string().min(1,{message:"User Name is required"}),
    roles:z.string().min(1,{message:"Role is required"}),
    password:z.string().min(1,{message:"Password is required"}),
})

export const userInputSectionRolesSchema=z.object({    roles: z.string().min(1, "Please select role.").optional(),
})
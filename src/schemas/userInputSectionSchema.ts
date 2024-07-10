import { z } from "zod";

export const userInputSectionSchema=z.object({
    email:z.string().email({message:"Email is not valid"}).min(1,{message:"Email is required"}),
    firstName:z.string().min(1,{message:"First Name is required"}),
    lastName:z.string().min(1,{message:"Last Name is required"}),
    userName:z.string().min(1,{message:"User Name is required"})
})
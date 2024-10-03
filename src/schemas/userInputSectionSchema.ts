import { z } from "zod";

export const userInputSectionSchema = z.object({
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userName: z.string().optional(),
    roles: z.string().optional(),
    password: z.string().optional(),
})

export const userUpdateInputSectionSchema = z.object({
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userName: z.string().optional(),
    roles: z.string().optional(),
    password: z.string().optional(),
})

export const userInputSectionRolesSchema = z.object({
    roles: z.string().optional(),
})
import { z } from "zod";

export const serviceSchema = z.object({
    dateEntered: z.string().refine(
        (value) => {
          const date = new Date(value)
          return !isNaN(date.getTime())
        },
        { message: "Required DOB" }
      ),
      indexNo:z.string().regex(/^\d+$/,{message:"index no must be number"}) ,
      clientOptions:z.string().min(1, "Please select client."),
      serviceTypeOptions:z.string().min(1, "Please select service."),
      case:z.string().min(1, "Case is required"),
      fullName:z.string().min(1, "Full Name is required"),
      address:z.string().min(1, "Address is required"),
      bussiness:z.string().min(1, "Bussiness is required"),
      city:z.string().min(1, "City is required"),
      apt:z.string().min(1, "Apt is required"),
      zip:z.string().min(1, "Zip is required"),
      commercialDescription:z.string().min(1, "Commercial Description is required"),
      otherDescription:z.string().min(1, "Other L&T Description is required"),
      addressNotEntered:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }), 
      gpsCodeNotGenerated:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      gpsCodeGenerated:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      serviceTypeLT:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      day3Notice:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      day5Notice:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      day10Notice:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      day15Notice:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      day3Notice30DayDeptor:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      day30Termination:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      noticePetition:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      noticePetitionHoldOver:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
      otherLT:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }),
})
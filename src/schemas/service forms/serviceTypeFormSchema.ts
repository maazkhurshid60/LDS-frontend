import { z } from "zod";
export const serviceTypeFormSchema = z.object({
    job: z.string().regex(/^\d+$/, { message: "job no must be number" }),
    dateEntered: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required Input Date" }
    ),
    clientId: z.string().min(1, "Please select client."),
    serviceType: z.string().min(1, "Please select service type."),
    caseNo: z.string().regex(/^\d+$/, { message: "case no must be number" }),
    caption: z.string().min(1, "Caption is required."),
    // L&T SERVICE TYPE VALIDATION STARTS
    day3:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      day15:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      noticeOfPetition:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      day5:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      day3AndDay30Deptor:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      petitionHoldover:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      day10:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      noticeOfTermination:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      otherLAndT:z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
      }).optional(),
      otherLAndTDescription: z.string().min(1, "Description is required."),
      indexNo: z.string().regex(/^\d+$/, { message: "index no must be number" }),
    // L&T SERVICE TYPE VALIDATION ENDS
    // L&T SERVICE DETAIL VALIDATION STARTS
    fullName: z.string().min(1, "Full name is required."),
    bussinessName: z.string().min(1, "bussiness name is required."),
    address: z.string().min(1, "address is required."),
    apt: z.string().min(1, "apt is required."),
    city: z.string().min(1, "city is required."),
    state: z.string().min(1, "state is required."),
    zip: z.string().min(1, "zip is required."),
    description: z.string().min(1, "description is required."),
    // L&T SERVICE DETAIL VALIDATION ENDS
    mailingAddress: z.string().min(1, "Please select service type."),
})
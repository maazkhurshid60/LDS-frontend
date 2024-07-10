import { z } from "zod";

export const standardFormSchema = z.object({
    // STANDARD SERVICE TYPE VALIDATION STARTS
    summons: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    judicialSubpoena: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    summonsnotice: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    judicialSubpoenaDecestecum: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    summonsVerifiedComplaint: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    judicialSubpoenaAndDecestecum: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    verifiedComplaint: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    noticeOfPetition: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    endorsedComplaint: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    orderToShowCause: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    citation: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    otherStandard: z.boolean().refine((value) => value === true, {
        message: "This Checked is required",
    }),
    indexNo: z.string().regex(/^\d+$/, { message: "index no must be number" }),
    otherStandardDescription: z.string().min(1, { message: "Standard Description is required" }),
    // STANDARD SERVICE TYPE VALIDATION ENDS
    // STANDARD SERVICE DETAIL VALIDATION STARTS
    court: z.string().min(1, { message: "Court is required" }),
    defendants: z.string().min(1, { message: "Defedant is required" }),
    plaintiff: z.string().min(1, { message: "Plaintiff is required" }),
    country: z.string().min(1, { message: "country is required" }),
    // SERVE TO VALIDATION ENDS
    firstName: z.string().min(1, { message: "First name is required" }),
    address: z.string().min(1, { message: "address is required" }),
    city: z.string().min(1, { message: "city is required" }),
    zip: z.string().min(1, { message: "zip is required" }),
    state: z.string().min(1, { message: "state is required" }),
    apt: z.string().min(1, { message: "apt is required" }),
    // SERVE TO VALIDATION ENDS
    // END FORM VALIDATION STARTS
    createdByName:z.string().min(1, "Please select creator name."),
    updatedByName:z.string().min(1, "Please select updator name."),
    // END FORM VALIDATION ENDS

})
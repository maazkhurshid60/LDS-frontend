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
    caseNo: z.string().optional(),
    inputDate: z.string().optional(),
    clientId: z.string().optional(),
    serviceType: z.string().optional(),
    caption: z.string().optional(),
    standardServiceType: z.boolean().optional(),
    // indexNo: z.string().regex(/^\d+$/, { message: "index no must be number" }),
    // otherStandardDescription: z.string().min(1, { message: "Standard Description is required" }),
    // STANDARD SERVICE TYPE VALIDATION ENDS
    // STANDARD SERVICE DETAIL VALIDATION STARTS
    oSSTIndexNo: z.string().optional(),
    oSSTDescription: z.string().optional(),
    sSDCourt: z.string().optional(),
    sSDDefendants: z.string().optional(),
    sSDPlaintiff: z.string().optional(),
    sSDCountry: z.string().optional(),
    timeTrip: z.string().optional(),
    // SERVE TO VALIDATION ENDS
    // firstNameServe:z.string().min(1, { message: "First name is required" }),
    // addressServe:z.string().min(1, { message: "address is required" }),
    // cityServe:z.string().optional(),
    // stateServe:z.string().optional(),
    // aptServe:z.string().optional(),
    // zipServe:z.string().optional(),

    // SERVE TO VALIDATION ENDS

    // RESULT FORM SCHEMA
    queryInformationLTFullName: z.string().optional(),
    queryInformationLTIndexNo: z.string().optional(),
    queryInformationLTAddress: z.string().optional(),
    queryInformationLTBusinessName: z.string().optional(),
    queryInformationLTInputDate: z.string().optional(),
    queryInformationStandardServeTo: z.string().optional(),
    queryInformationStandardDefendants: z.string().optional(),
    queryInformationStandardPlaintiff: z.string().optional(),
    serviceResultInputDate: z.string().optional(),
    serviceResultScvType: z.string().optional(),
    serviceResultClientId: z.string().optional(),
    // serviceResultJobNo: z.string().regex(/^\d+$/, { message: "Job  must be number" }),
    serviceResultJobNo: z.string().optional(),
    serviceResultServerId: z.string().optional(),
    serviceResultResults: z.string().optional(),
    serviceResultDateOfService: z.string().optional(),
    serviceResultTimeService: z.string().optional(),
    serviceResultFirstTimeOfService: z.string().optional(),
    serviceResultFirstAttemptDate: z.string().optional(),
    serviceResultSecondTimeOfService: z.string().optional(),
    serviceResultSecondAttemptDate: z.string().optional(),
    serviceResultThirdTimeOfService: z.string().optional(),
    serviceResultThirdAttemptDate: z.string().optional(),
    serviceResultlTServed: z.string().optional(),
    serviceResultlTNotServed: z.string().optional(),
    serviceResultRecipientTitle: z.string().optional(),
    serviceResultDoor: z.string().optional(),
    serviceResultRecipient: z.string().optional(),
    serviceResultDoorLocks: z.string().optional(),
    serviceResultEntry: z.string().optional(),
    serviceResultWall: z.string().optional(),
    serviceResultFloor: z.string().optional(),
    serviceResultLock: z.string().optional(),
    serviceResultOtherDescription: z.boolean().optional(),
    serviceResultSex: z.string().optional(),
    serviceResultSkinColor: z.string().optional(),
    serviceResultHair: z.string().optional(),
    serviceResultAge: z.string().optional(),
    serviceResultHeight: z.string().optional(),
    serviceResultWeight: z.string().optional(),
    serviceResultOtherFeatures: z.string().optional(),
    serviceResultDateOfMailing: z.string().optional(),
    serviceResultDateOfNotary: z.string().optional(),
})
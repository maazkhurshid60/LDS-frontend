import {  z } from "zod";

export const resultFormSchema = z.object({
    queryInformationLTFullName:z.string().optional(),
    queryInformationLTIndexNo:z.string().optional(),
    queryInformationLTAddress:z.string().optional(),
    queryInformationLTBusinessName: z.string().optional(),
    queryInformationLTInputDate: z.string().optional(),
    queryInformationStandardServeTo: z.string().optional(),
    queryInformationStandardDefendants: z.string().optional(),
    queryInformationStandardPlaintiff: z.string().optional(),
    serviceResultInputDate: z.string().optional(),
    serviceResultScvType: z.string().optional(),
    serviceResultClientId: z.string().optional(),
    serviceResultJobNo: z.string().regex(/^\d+$/, { message: "Index No  must be number" }),
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
}
)




// export const resultFormSchema = z.object({
//     _id:z.string().optional(),
//     // QUERY INFORMATION (L&T) VALIDATION STARTS
//     fullName: z.string().optional(),
//     indexNo: z.string().optional(),
//     address: z.string().optional(),
//     businessName: z.string().optional(),
//     inputDate: z.string().optional(),
//     // QUERY INFORMATION (L&T) VALIDATION ENDS
//     // QUERY INFORMATION (STANDARD) VALIDATION STARTS
//     serveTo: z.string().optional(),
//     plaintiff: z.string().optional(),
//     defendants: z.string().optional(),
//     // QUERY INFORMATION (STANDARD) VALIDATION ENDS
//     // SHOW RESULT VALIDATION STARTS
//     resultInputDate: z.string().refine(
//         (value) => {
//             const date = new Date(value)
//             return !isNaN(date.getTime())
//         },
//         { message: "Required Input Date" }
//     ),
//     scvType: z.string().min(1, "Svc required."),
//     clientId: z.string().min(1, "Please select client id."),
//     jobNo: z.string().regex(/^\d+$/, { message: "job No  must be number" }),
//     serverId: z.string().min(1, "Please select server id."),
//     results: z.string().min(1, "Please select results."),
//     dateOfService: z.string().optional(),
//     timeService: z.string().optional(),
//     firstAttemptDate: z.string().optional(),
//     firstTimeOfService: z.string().optional(),
//     secondAttemptDate: z.string().optional(),
//     secondTimeOfService: z.string().optional(),
//     thirdAttemptDate: z.string().optional(),
//     thirdTimeOfService: z.string().optional(),
//     lTServed: z.string().optional(),
//     lTNotServed: z.string().optional(),
//     substituteDeliveredTo: z.string().optional(),
//     corporateRecipient: z.string().optional(),
//     recipientTitle: z.string().optional(),

//     // SHOW RESULT VALIDATION ENDS
//     // DESCRIPTION VALIDATION STARTS
//     door: z.string().regex(/^\d+$/, { message: "door  must be number" }),
//     doorLocks: z.string().regex(/^\d+$/, { message: "door Locks  must be number" }),
//     entry: z.string().regex(/^\d+$/, { message: "entry  must be number" }),
//     wall: z.string().regex(/^\d+$/, { message: "wall  must be number" }),
//     floor: z.string().regex(/^\d+$/, { message: "floor  must be number" }),
//     lock: z.string().regex(/^\d+$/, { message: "lock  must be number" }),
//     otherDescription: z.boolean().optional(),
//     // DESCRIPTION VALIDATION ENDS
//     // SUBSTITUTE OPTIONS INFO VALIDATION STARTS
//     sex: z.string().optional(),
//     skinColor: z.string().optional(),
//     hair: z.string().optional(),
//     age: z.string().optional(),
//     height: z.string().optional(),
//     weight: z.string().optional(),
//     // SUBSTITUTE OPTIONS INFO VALIDATION ENDS
//     // OTHER VALIDATION STARTS
//     otherIdentifyingFeatures: z.string().optional(),
//     dateOfMailing: z.string().optional(),
//     notaryDate: z.string().optional(),
//     // OTHER VALIDATION ENDS


// })

// // export const resultFormSchema = z.object({
// //     // QUERY INFORMATION (L&T) VALIDATION STARTS
// //     fullName: z.string().min(1, "full Name is required."),
// //     indexNo: z.string().regex(/^\d+$/, { message: "index No  must be number" }),
// //     address: z.string().min(1, "address is required."),
// //     bussinessName: z.string().min(1, "bussiness Name is required."),
// //     dateEntered: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     // QUERY INFORMATION (L&T) VALIDATION ENDS
// //     // QUERY INFORMATION (STANDARD) VALIDATION STARTS
// //     saveTo: z.string().min(1, "save To is required."),
// //     plainTiff: z.string().min(1, "plain tiff To is required."),
// //     defedants: z.string().min(1, "defedants To is required."),
// //     // QUERY INFORMATION (STANDARD) VALIDATION ENDS
// //     // SHOW RESULT VALIDATION STARTS
// //     inputResultDateEntered: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     svcType: z.string().min(1, "Please select svc type."),
// //     clientId: z.string().min(1, "Please select client id."),
// //     jobNo: z.string().regex(/^\d+$/, { message: "job No  must be number" }),
// //     serverId: z.string().min(1, "Please select server id."),
// //     results: z.string().min(1, "Please select results."),
// //     dateService: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     timeService: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     date1stAttempt: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     time1stAttempt: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     date2ndAttempt: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     time2ndAttempt: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     date3rdAttempt: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     time3rdAttempt: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     served: z.string().min(1, "served To is required."),
// //     notServed: z.string().min(1, "not Served To is required."),
// //     deliveredTo: z.string().min(1, "Please select delivered."),
// //     corporateRecipient: z.string().min(1, "Please select delivered."),

// //     recipientTitle: z.string().min(1, "Recipient Title To is required."),

// //     // SHOW RESULT VALIDATION ENDS
// //     // DESCRIPTION VALIDATION STARTS
// //     door: z.string().regex(/^\d+$/, { message: "door  must be number" }),
// //     doorLocks: z.string().regex(/^\d+$/, { message: "door Locks  must be number" }),
// //     entry: z.string().regex(/^\d+$/, { message: "entry  must be number" }),
// //     wall: z.string().regex(/^\d+$/, { message: "wall  must be number" }),
// //     floor: z.string().regex(/^\d+$/, { message: "floor  must be number" }),
// //     lock: z.string().regex(/^\d+$/, { message: "lock  must be number" }),
// //     otherDescription: z.boolean().refine((value) => value === true, {
// //         message: "This Checked is required",
// //     }).optional(),
// //     // DESCRIPTION VALIDATION ENDS
// //     // OTHER VALIDATION STARTS
// //     features: z.string().min(1, "Features To is required."),
// //     dateMailing: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     dateNatory: z.string().refine(
// //         (value) => {
// //             const date = new Date(value)
// //             return !isNaN(date.getTime())
// //         },
// //         { message: "Required Input Date" }
// //     ),
// //     // OTHER VALIDATION ENDS


// // })
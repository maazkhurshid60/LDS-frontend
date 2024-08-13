import { z } from "zod";


export const serviceSchema=z.object({
  dateCreated: z.string().optional(),
jobNo: z.string().optional(),
clientId: z.string().optional(),
serviceType: z.string().optional(),
caseNo:z.string().optional(),
fullName: z.string().optional(),
businessName: z.string().optional(),
address: z.string().optional(),
apt: z.string().optional(),
city: z.string().optional(),
state: z.string().optional(),
zip: z.string().optional(),
commercialDescription: z.string().optional(),
otherLTDescription: z.string().optional(),
// otherOptions: any[] | undefined | null,
// lTServiceTypes: any[] | undefined | null
})

// export const serviceSchema = z.object({
//     dateEntered: z.string().optional(),
//       indexNo:z.string().optional() ,
//       clientOptions:z.string().optional(),
//       serviceTypeOptions:z.string().optional(),
//       case:z.string().optional(),
//       fullName:z.string().optional(),
//       address:z.string().optional(),
//       bussiness:z.string().optional(),
//       city:z.string().optional(),
//       apt:z.string().optional(),
//       zip:z.string().optional(),
//       commercialDescription:z.string().optional(),
//       otherDescription:z.string().optional(),
//       addressNotEntered:z.boolean().optional(), 
//       gpsCodeNotGenerated:z.boolean().optional(),
//       gpsCodeGenerated:z.boolean().optional(),
//       serviceTypeLT:z.boolean().optional(),
//       day3Notice:z.boolean().optional(),
//       day5Notice:z.boolean().optional(),
//       day10Notice:z.boolean().optional(),
//       day15Notice:z.boolean().optional(),
//       day3Notice30DayDeptor:z.boolean().optional(),
//       day30Termination:z.boolean().optional(),
//       noticePetition:z.boolean().optional(),
//       noticePetitionHoldOver:z.boolean().optional(),
//       otherLT:z.boolean().optional(),
// })




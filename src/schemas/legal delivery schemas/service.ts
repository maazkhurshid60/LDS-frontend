import { z } from "zod";


export const serviceSchema = z.object({
  dateCreated: z.string().optional(),
  jobNo: z.string().optional(),
  clientId: z.string().optional(),
  serviceType: z.string().optional(),
  caseNo: z.string().optional(),
  fullName: z.string().optional(),
  businessName: z.string().optional(),
  address: z.string().optional(),
  apt: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  commercialDescription: z.string().optional(),
  otherLTDescription: z.string().optional(),
})

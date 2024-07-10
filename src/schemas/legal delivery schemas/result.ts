import { z } from "zod";
export const resultSchema = z.object({
    dateEntered: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required DOB" }
    ),
    dateService: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required DOB" }
    ),
    date1Attepmt: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required Date" }
    ),
    date2Attepmt: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required Date" }
    ),
    date3Attepmt: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required Date" }
    ),
    dateMailing: z.string().refine(
        (value) => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        },
        { message: "Required Date" }
    ), 
    resultOptions: z.string().min(1, "Please select result result."),
    serviceTypeOptions: z.string().min(1, "Please select result result."),
    corpRecipient: z.string().min(1, "Corp Recipient isrequired."),
    corpRecipientTitle: z.string().min(1, "Title is required."),
    substituteDeliveredTo: z.string().min(1, "This is required."),
})
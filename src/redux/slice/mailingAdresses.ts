import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    mailingAddressData: [],
    getSelectMail: []
};

const mailingAdresses = createSlice({
    name: "mailingAddresses",
    initialState: initialState,
    reducers: {
        addMailAddress: (state, action) => {
            // console.log("new mailing address",action.payload)
            state.mailingAddressData.push(action.payload)
        },
        getMailAddress: (state, action) => {
            const allMailingData = JSON.stringify(state.mailingAddressData)
            const allMailDataArray = JSON.parse(allMailingData)
            const onemail = allMailDataArray?.find((mail, id) => mail.value === action.payload)           
            state.getSelectMail.push(onemail)
        },
        getMailAddressAfterDeletion: (state, action) => {
            const allMailingData = JSON.stringify(state.getSelectMail)
            const allMailDataArray = JSON.parse(allMailingData)
            const mailAddressAfterDeletion = allMailDataArray?.filter((mail, id) => id !== action.payload)
            state.getSelectMail = mailAddressAfterDeletion
        }
    }
})

export const { addMailAddress, getMailAddress, getMailAddressAfterDeletion } = mailingAdresses.actions
export default mailingAdresses.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import { maillingType } from "../../type/maillingAddressType/maillingAddressType";
import { toast } from "react-toastify";
const accessToken = localStorage.getItem("accessToken");
export interface MailingAddress {
    address: String
    apt: String
    city: String
    createdAt: String
    firstName: String
    rRR: Boolean
    state: String
    updatedAt: String
    zip: Number
    __v: Number
    _id: String
}

const initialState = {
    mailingAddressData: [],
    getSelectMail: [],
    isAddingMailAddress: false,
    isUpdatingMailAddress: false,
    serviceFormMailingAdress: {
        userId: null,
        mailingAdresses: []
    },
    status: "idle"
};

const mailingAdresses = createSlice({
    name: "mailingAddresses",
    initialState: initialState,
    reducers: {
        addMailAddress: (state, action) => {
            // console.log("new mailing address",action.payload)
            state.mailingAddressData.push(action.payload)
        },
        isAddingMailAddressReducer: (state, action) => {
            state.isAddingMailAddress = action.payload
        },
        emptyMailingAddressOnNewFormAddReducer: (state) => {
            state.serviceFormMailingAdress.mailingAdresses = []

        },
        isUpdaitngMailAddressReducer: (state, action) => {
            state.isUpdatingMailAddress = action.payload
        },
        getMailAddress: (state, action) => {
            const allMailingData = JSON.stringify(state.mailingAddressData)
            const allMailDataArray = JSON.parse(allMailingData)
            const onemail = allMailDataArray?.find((mail, id) => mail._id === action.payload)
            state.getSelectMail.push(onemail)
        },
        getMailAddressAfterDeletion: (state, action) => {
            const allMailingData = JSON.stringify(state.getSelectMail)
            const allMailDataArray = JSON.parse(allMailingData)
            const mailAddressAfterDeletion = allMailDataArray?.filter((mail, id) => id !== action.payload)
            state.getSelectMail = mailAddressAfterDeletion
        },
        // THIS STORE MAIL ADRESS INSIDE FORM COMMING FROM SERVICE FORM API
        getFormMailAddress: (state, action) => {
            const { data, id } = action.payload;


            state.serviceFormMailingAdress = { userId: id, mailingAdresses: data };
        },
        // THIS WILL ADD NEW MAIL ADDRESS INTO EXISTING FORM MAIL ADDRESS ARRAY
        addMailAddressIntoFormL: (state, action) => {
            const allMailingData = JSON.stringify(state.mailingAddressData)
            const allMailDataArray = JSON.parse(allMailingData)
            const onemail = allMailDataArray?.find((mail, id) => mail._id === action.payload)
            console.log(onemail)
            state?.serviceFormMailingAdress?.mailingAdresses?.push(onemail)
        },
        // THIS WILL UPDATE DATA OF EXISTING MAIL ADDRESS ARRAY ON THE BASIS OF INDEX
        //  updateMailAddressIntoForm: (state, action) => {
        //      const {updatedData,id}=action.payload
        //      const allMailingData = JSON.stringify(state.mailingAddressData)
        //      const allMailDataArray = JSON.parse(allMailingData)
        //      const onemail = allMailDataArray?.find((mail, index) => index === id && updatedData)
        //      console.log("updated data",updatedData,id,allMailDataArray)
        //     //  state.serviceFormMailingAdress.mailingAdresses.push(onemail)
        // },
        getFormMailAddressAfterDeletion: (state, action) => {
            const allMailingData = JSON.stringify(state.serviceFormMailingAdress.mailingAdresses)
            const allMailDataArray = JSON.parse(allMailingData)
            const mailAddressAfterDeletion = allMailDataArray?.filter((mail, id) => id !== action.payload)
            console.log("<><><>", mailAddressAfterDeletion)
            state.serviceFormMailingAdress.mailingAdresses = mailAddressAfterDeletion
        },
    },
    extraReducers: (builder) => {
        // EXTRA REDUCER FOR GET ALL MAILING ADDRESS STARTS
        builder.addCase(getAllMailingAddressThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getAllMailingAddressThunk.fulfilled, (state, action) => {
            // console.log(">>>>>>>allmailing address data", action.payload)
            state.mailingAddressData = action.payload
            state.status = "success"
        })
        builder.addCase(getAllMailingAddressThunk.rejected, (state, action) => {
            console.error("Error fetching all maillingaddress:", action.error);
            state.status = "error"
        })
        // EXTRA REDUCER FOR GET ALL MAILING ADDRESS ENDS
        // EXTRA REDUCER FOR CREATE MAILING ADDRESS STARTS
        builder.addCase(createMailingAddressThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(createMailingAddressThunk.fulfilled, (state) => {
            state.status = "success"
        })
        builder.addCase(createMailingAddressThunk.rejected, (state) => {

            state.status = "error"
        })
        // EXTRA REDUCER FOR CREATE MAILING ADDRESS ENDS
        // EXTRA REDUCER FOR UPDATE MAILING ADDRESS STARTS
        builder.addCase(updateMailingAddressThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(updateMailingAddressThunk.fulfilled, (state) => {
            state.status = "success"
        })
        builder.addCase(updateMailingAddressThunk.rejected, (state) => {

            state.status = "error"
        })
        // EXTRA REDUCER FOR UPDATE MAILING ADDRESS ENDS
        // EXTRA REDUCER FOR DELETE MAILING ADDRESS STARTS
        builder.addCase(deleteMailingAddressThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(deleteMailingAddressThunk.fulfilled, (state) => {
            state.status = "success"
        })
        builder.addCase(deleteMailingAddressThunk.rejected, (state) => {

            state.status = "error"
        })
        // EXTRA REDUCER FOR DELETE MAILING ADDRESS ENDS
    }
})

export const { addMailAddress, getMailAddress, getMailAddressAfterDeletion, getFormMailAddress, emptyMailingAddressOnNewFormAddReducer,
    addMailAddressIntoFormL, getFormMailAddressAfterDeletion, isAddingMailAddressReducer, isUpdaitngMailAddressReducer } = mailingAdresses.actions
export default mailingAdresses.reducer


// ASYNC THUNKS STARTS HERE
// API FOR GET ALL MAILING ADDRESS STARTS
export const getAllMailingAddressThunk = createAsyncThunk("getAllMailingAddress", async () => {
    try {
        // console.log(data)
        const response = await axios.get(`${baseUrl}/mailing-address/all-mailing-address`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response?.data?.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})
// API FOR GET ALL MAILING ADDRESS ENDS
// API FOR CREATE MAILING ADDRESS STARTS
export const createMailingAddressThunk = createAsyncThunk("createAllMailingAddress", async (data: maillingType[], { dispatch }) => {
    try {
        // console.log(data)
        const response = await axios.post(`${baseUrl}/mailing-address/create`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        toast.success(`${response?.data?.message}`)
        dispatch(getAllMailingAddressThunk())

        return response?.data?.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})
// API FOR CREATE MAILING ADDRESS ENDS
// API FOR UPDATE MAILING ADDRESS STARTS
export const updateMailingAddressThunk = createAsyncThunk("updateAllMailingAddress", async (data: maillingType[], { dispatch }) => {
    try {
        // console.log(data)
        const response = await axios.patch(`${baseUrl}/mailing-address/update`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        toast.success(`${response?.data?.message}`)

        dispatch(getAllMailingAddressThunk())

        return response?.data?.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})
// API FOR UPDATE MAILING ADDRESS ENDS
// API FOR DELETE MAILING ADDRESS STARTS
export const deleteMailingAddressThunk = createAsyncThunk("deleteAllMailingAddress", async (id: string, { dispatch }) => {
    try {
        const response = await axios.delete(`${baseUrl}/mailing-address/delete`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            data: {
                mailingAddressId: id
            }
        });
        dispatch(getAllMailingAddressThunk())
        toast.success(`${response?.data?.message}`)
        return response?.data?.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})
// API FOR DELETE MAILING ADDRESS ENDS

// ASYNC THUNKS ENDS HERE

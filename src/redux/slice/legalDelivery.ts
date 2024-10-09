import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import axios from "axios";
import { showSpinnerReducer } from "./spinner";
import { toast } from "react-toastify";
import api from "../../apiservices/axiosInstance";
const accessToken = localStorage.getItem("accessToken");

interface ISelectedLegalDelivery {
    searchResult: string,
    data: any
}

interface IInitialState {
    legalDeliveryData: any[],
    filteredLegalData: any[],
    selectedLegalDeliveryData: ISelectedLegalDelivery,
    status: string
}

const initialState: IInitialState = {
    legalDeliveryData: [],
    filteredLegalData: [],
    selectedLegalDeliveryData: {
        searchResult: "",
        data: null
    },
    status: "idle"
}

const legalDelivery = createSlice({
    name: "legalDelivery",
    initialState: initialState,
    reducers: {
        getSingleLegalDeliveryReducer: (state, action) => {
            state.selectedLegalDeliveryData.data = action?.payload
        },
        getSearchNameReducer: (state, action) => {
            state.selectedLegalDeliveryData.searchResult = action?.payload

        },
        emptyLegalDeliveryReducer: (state) => {
            state.selectedLegalDeliveryData.data = null
            state.selectedLegalDeliveryData.searchResult = ""
            state.filteredLegalData = []
        }
    },
    extraReducers: (builders) => {
        builders.addCase(getAllFilteredDataThunk.pending, (state) => {

            state.status = "loading"
        })
        builders.addCase(getAllFilteredDataThunk.fulfilled, (state, action) => {
            state.filteredLegalData = action.payload;
            toast.success(",,")
            state.status = "success"
        })
        builders.addCase(getAllFilteredDataThunk.rejected, (state) => {
            state.status = "failed"

        })
        builders.addCase(getAllServiceFormThunk.pending, (state) => {

            state.status = "loading"
        })
        builders.addCase(getAllServiceFormThunk.fulfilled, (state, action) => {
            state.legalDeliveryData = action.payload;
            state.status = "success"
        })
        builders.addCase(getAllServiceFormThunk.rejected, (state) => {
            state.status = "failed"

        })
    }
})

export const { getSingleLegalDeliveryReducer, getSearchNameReducer, emptyLegalDeliveryReducer } = legalDelivery.actions
export default legalDelivery.reducer

// ASYNC THUNK STARTS
// GET ALL FILTERED DATA 
export const getAllFilteredDataThunk = createAsyncThunk("getAllFilterData", async (searchdata: any, { dispatch }) => {
    const se = {
        searchIn: searchdata?.searchIn,
        data: searchdata?.data,
    }

    try {
        const response = await axios.post(`${baseUrl}/service-form/all-service-forms-range`, searchdata, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, },
        })
        toast.success(`${response?.data?.message}`)
        return response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(`${error?.response?.data?.message}`)
        throw new Error(error)
    }
})
// GET ALL FILTERED DATA 
export const getAllServiceFormThunk = createAsyncThunk("getAllServiceData", async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(showSpinnerReducer(true));

    if (!accessToken) {
        localStorage.getItem("accessToken")
    }
    try {
        const response = await api.get(`/service-form/all-service-forms`

        )
        return response?.data?.data
    } catch (error) {
        throw new Error(error)
    }
    finally {
        dispatch(showSpinnerReducer(false));
    }
})
// ASYNC THUNK ENDS

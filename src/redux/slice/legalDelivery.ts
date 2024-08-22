import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import axios from "axios";
import { showSpinnerReducer } from "./spinner";
import { toast } from "react-toastify";
const accessToken = localStorage.getItem("accessToken");

interface ISelectedLegalDelivery {
    searchResult: string,
    data: any
}

interface IInitialState {
    legalDeliveryData: any[],
    selectedLegalDeliveryData: ISelectedLegalDelivery,
    status: string   
}

const initialState: IInitialState = {
    legalDeliveryData: [],
    selectedLegalDeliveryData: {
        searchResult:"",
        data:null
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
        getSearchNameReducer:(state,action)=>{
            state.selectedLegalDeliveryData.searchResult = action?.payload

        },
        emptyLegalDeliveryReducer:(state)=>{
            state.selectedLegalDeliveryData.data=null
            state.selectedLegalDeliveryData.searchResult=""
            state.legalDeliveryData=[]
                }
    },
    extraReducers: (builders) => {
        builders.addCase(getAllFilteredDataThunk.pending, (state) => {
            console.log(">>>>>>>>>>>>>>>>>>>>>", state.status)

            state.status = "loading"
        })
        builders.addCase(getAllFilteredDataThunk.fulfilled, (state, action) => {
            console.log(">>>>>>>>>>>>>>>>>>>>>", action.payload)
            state.legalDeliveryData = action.payload;
            state.status = "success"
        })
        builders.addCase(getAllFilteredDataThunk.rejected, (state) => {
            console.log(">>>>>>>>>>>>>>>>>>>>>", state.status)
            
            state.status = "failed"

        })
    }
})

export const { getSingleLegalDeliveryReducer ,getSearchNameReducer,emptyLegalDeliveryReducer} = legalDelivery.actions
export default legalDelivery.reducer

// ASYNC THUNK STARTS
// GET ALL FILTERED DATA 
export const getAllFilteredDataThunk = createAsyncThunk("getAllFilterData", async (searchdata: any, { dispatch }) => {
    const se = {
        searchIn: searchdata?.searchIn,
        data: searchdata?.data,
    }
    
    
    // dispatch(showSpinnerReducer(true))
    
    try {
        const response = await axios.post(`${baseUrl}/legal-delivery/search`, se, {
            headers: { "Authorization": `Bearer ${accessToken}`, },
        })
        console.log("sending data", se)
        return response?.data?.data
    } catch (error) {
        toast.error(`${error?.response?.data?.message}`)
        throw new Error(error)
    }
})
// ASYNC THUNK ENDS

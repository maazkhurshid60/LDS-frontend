import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import { resultFormType } from "../../type/resultFormType/resultFormType";
const accessToken = localStorage.getItem("accessToken");

// STATES OF RESULT FORM
const initialState = {
    // STORE ALL DATA COMMING FROM GET ALL RESULT API
    allResultFormData:[]  as resultFormType[],
    status: "idle",
    resultFormIndex: 0,
}

const resultForm = createSlice({
    name: "resultForm",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
         // BUILDER FOR GET ALL RESULT FORM
         builder.addCase(getAllResultFormThunk.pending, state => {
            state.status = "loading"
        }).
        addCase(getAllResultFormThunk.fulfilled,(state,action)=>{
            state.status = "success"
            state.allResultFormData=action.payload
        }).
        addCase(getAllResultFormThunk.rejected,(state)=>{
            state.status = "failed"
            
        })
        // BUILDER FOR ADD RESULT FORM
        builder.addCase(addResultFormThunk.pending, state => {
            state.status = "loading"
        }).
        addCase(addResultFormThunk.fulfilled,(state)=>{
            state.status = "success"
        }).
        addCase(addResultFormThunk.rejected,(state)=>{
            state.status = "failed"
        }).
        // BUILDER FOR UPDATE RESULT FORM
        addCase(updateResultFormThunk.pending,state=>{
            state.status="loading"
        }).
        addCase(updateResultFormThunk.fulfilled,state=>{
            state.status="success"
        }).
        addCase(updateResultFormThunk.rejected,state=>{
            state.status="failed"
        }). 
        // BUILDER FOR DELETE RESULT FORM
        addCase(deleteResultFormThunk.pending,state=>{
            state.status="loading"
        }). 
        addCase(deleteResultFormThunk.fulfilled,(state,action)=>{
            state.status="success"
            state.allResultFormData=action.payload

        }). 
        addCase(deleteResultFormThunk.rejected,state=>{
            state.status="failed"
        })
    }
})
export default resultForm.reducer

// ASYNC STARTS
// GET ALL RESULT FORM STARTS
export const getAllResultFormThunk = createAsyncThunk("getAllResultForm", async () => {
    try {
        const response = await axios.get(`${baseUrl}/result-form/all-result-forms`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        console.log(response)
        return response?.data?.data
    } catch (error) {
        // alert(`${error?.response?.data?.message}`)
        console.log(error)
    }
})
// GET ALL RESULT FORM ENDS
// ADD RESULT FORM STARTS
export const addResultFormThunk = createAsyncThunk("addResultForm", async (data: resultFormType,{dispatch}) => {
    try {
        const response = await axios.post(`${baseUrl}/result-form/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        alert(`${response?.data?.message}`)
        dispatch(getAllResultFormThunk())
    } catch (error) {
        alert(`${error?.response?.data?.message}`)
    }
})
// ADD RESULT FORM ENDS
// UPDATE RESULT FORM STARTS
export const updateResultFormThunk = createAsyncThunk("updateResultForm", async (data: resultFormType,{dispatch}) => {
    try {
        const response = await axios.patch(`${baseUrl}/result-form/update`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        alert(`${response?.data?.message}`)
        dispatch(getAllResultFormThunk())
    } catch (error) {
        alert(`${error?.response?.data?.message}`)
    }
})
// UPDATE RESULT FORM ENDS
// DELETE RESULT FORM STARTS
export const deleteResultFormThunk = createAsyncThunk("deleteResultForm", async (id:string,{dispatch}) => {
    try {
        const response = await axios.delete(`${baseUrl}/result-form/update`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                serviceFormId: id
            }
        })
        alert(`${response?.data?.message}`)
        dispatch(getAllResultFormThunk())
    } catch (error) {
        alert(`${error?.response?.data?.message}`)
    }
})
// DELETE RESULT FORM ENDS

// ASYNC ENDS


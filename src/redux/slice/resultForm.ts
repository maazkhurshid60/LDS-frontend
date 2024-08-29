import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import { resultFormType } from "../../type/resultFormType/resultFormType";
import { toast } from "react-toastify";
import { showSpinnerReducer } from "./spinner";
const accessToken = localStorage.getItem("accessToken");

// STATES OF RESULT FORM
const initialState = {
    // STORE ALL DATA COMMING FROM GET ALL RESULT API
    allResultFormData: [] as resultFormType[],
    status: "idle",
    resultFormIndex: 0,
    isNewResultFormAdd: false,
    isSearchResultForm: false,
    searchResultFormData:[],
    selectedSearchResultData:[],


}

const resultForm = createSlice({
    name: "resultForm",
    initialState: initialState,
    reducers: {
        addNewResultFormAddReducer: ((state, action) => {
            state.isNewResultFormAdd = action.payload
        }),
        selectedSearchResultDataReducer: ((state, action) => {
            state.selectedSearchResultData = action.payload
        }),
        searchResultFormAddReducer: ((state, action) => {
            state.isSearchResultForm = action.payload
        }),
        emptySelectedSearchResultFormAddReducer: ((state) => {
            state.selectedSearchResultData = []
        }),
        emptySearchResultFormDataAddReducer: ((state) => {
            state.searchResultFormData = []
        }),
        getNextResultFormReducer: ((state) => {
            console.log(state.resultFormIndex)
            if (state.resultFormIndex < state.allResultFormData?.length - 1) {
                state.resultFormIndex++
            }
        }),
        getPreviousResultFormReducer: ((state) => {
            if (state.resultFormIndex > 0) {
                state.resultFormIndex--
            }
        }),
        getFirstResultFormReducer: ((state) => {

            state.resultFormIndex = 0

        }),
        getLastResultFormReducer: (state => {
            state.resultFormIndex = state.allResultFormData?.length - 1
        })
    },
    extraReducers: (builder) => {
        // BUILDER FOR GET ALL RESULT FORM
        builder.addCase(getAllResultFormThunk.pending, state => {
            state.status = "loading"
        }).
            addCase(getAllResultFormThunk.fulfilled, (state, action) => {
                state.status = "success"
                state.allResultFormData = action.payload
            }).
            addCase(getAllResultFormThunk.rejected, (state) => {
                state.status = "failed"

            })
        // BUILDER FOR ADD RESULT FORM
        builder.addCase(addResultFormThunk.pending, state => {
            state.status = "loading"
        }).
            addCase(addResultFormThunk.fulfilled, (state) => {
                state.status = "success"
            }).
            addCase(addResultFormThunk.rejected, (state) => {
                state.status = "failed"
            }).
            // BUILDER FOR UPDATE RESULT FORM
            addCase(updateResultFormThunk.pending, state => {
                state.status = "loading"
            }).
            addCase(updateResultFormThunk.fulfilled, state => {
                state.status = "success"
            }).
            addCase(updateResultFormThunk.rejected, state => {
                state.status = "failed"
            }).
            // BUILDER FOR DELETE RESULT FORM
            addCase(deleteResultFormThunk.pending, state => {
                state.status = "loading"
            }).
            addCase(deleteResultFormThunk.fulfilled, (state, action) => {
                state.status = "success"
                state.allResultFormData = action.payload
            }).
            addCase(deleteResultFormThunk.rejected, state => {
                state.status = "failed"
            }).
              // BUILDER FOR SEARCH RESULT FORM
            addCase(searchResultFormThunk.pending,(state)=>{
                state.status="loading"
            }).
            addCase(searchResultFormThunk.fulfilled,(state,action)=>{
                state.status="success"
                state.searchResultFormData=action.payload
            }).
            addCase(searchResultFormThunk.rejected,(state)=>{
                state.status="failed"
            })
            
    }
})
export const { addNewResultFormAddReducer, getNextResultFormReducer, getPreviousResultFormReducer, 
                getFirstResultFormReducer, getLastResultFormReducer, searchResultFormAddReducer , 
                emptySelectedSearchResultFormAddReducer,selectedSearchResultDataReducer,emptySearchResultFormDataAddReducer} = resultForm.actions
export default resultForm.reducer

// ASYNC STARTS
// GET ALL RESULT FORM STARTS
export const getAllResultFormThunk = createAsyncThunk("getAllResultForm", async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
        dispatch(showSpinnerReducer(true));
    try {
        const response = await axios.get(`${baseUrl}/result-form/all-result-forms`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response?.data?.data
    } catch (error) {
        // alert(`${error?.response?.data?.message}`)
        console.log(error)
    }finally{dispatch(showSpinnerReducer(false));}
})
// GET ALL RESULT FORM ENDS
// ADD RESULT FORM STARTS
export const addResultFormThunk = createAsyncThunk("addResultForm", async (data: resultFormType, { dispatch }) => {
    dispatch(showSpinnerReducer(true))

    try {
        const response = await axios.post(`${baseUrl}/result-form/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        toast.success(`${response?.data?.message}`)
        dispatch(getAllResultFormThunk())
    } catch (error) {
        console.log(error)
        toast.error(`${error?.response?.data?.message}`)
    } finally {
        dispatch(showSpinnerReducer(false))

    }
})
// ADD RESULT FORM ENDS
// UPDATE RESULT FORM STARTS
export const updateResultFormThunk = createAsyncThunk("updateResultForm", async (data: resultFormType, { dispatch }) => {
    dispatch(showSpinnerReducer(true))
    console.log("sending updating data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data?.resultFormId)
    try {
        const response = await axios.patch(`${baseUrl}/result-form/update`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        toast.success(`${response?.data?.message}`)
        dispatch(getAllResultFormThunk())
    } catch (error) {
        toast.error(`${error?.response?.data?.message}`)
    } finally { }
    dispatch(showSpinnerReducer(false))

})
// UPDATE RESULT FORM ENDS
// DELETE RESULT FORM STARTS
export const deleteResultFormThunk = createAsyncThunk("deleteResultForm", async (id: string, { dispatch }) => {
    dispatch(showSpinnerReducer(true))
    try {
        const response = await axios.delete(`${baseUrl}/result-form/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                resultFormId: id
            }
        })
        toast.success(`${response?.data?.message}`)
        dispatch(getAllResultFormThunk())
        dispatch(getPreviousResultFormReducer())
        return response?.data?.data

    } catch (error) {
        toast.error(`${error?.response?.data?.message}`)
    } finally {
        dispatch(showSpinnerReducer(false))

    }
})
// DELETE RESULT FORM ENDS

// SEARCH RESULT FORM STARTS
export const searchResultFormThunk = createAsyncThunk("searchResultForm", async (data: any) => {
    console.log(data)
    try {
        const response = await axios.post(`${baseUrl}/result-form/search-result-forms`,data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
    
        return response?.data
    } catch (error) {
        // alert(`${error?.response?.data?.message}`)
        toast.error(`${error?.response?.data?.message}`)
        

    }
})
// SEARCH RESULT FORM ENDS

// ASYNC THUNKS ENDS


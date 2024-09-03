import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import { toast } from "react-toastify";
import { showModalReducer } from "./showModal";
import { showSpinnerReducer } from "./spinner";
import { serviceFormType } from "../../type/serviceFormType/serviceFormType";
const accessToken = localStorage.getItem("accessToken");
console.log("access tokenin service form");

const initialState = {
    allServiceFormData: [] as serviceFormType[],
    isNewFormAdd: false,
    isDataSaved: false,
    savedLTFormData: null,
    serviceFormIndex: 0,
    singleServiceForm: null,
    isMoveToStandardForm:"",
    status: "idle"
}
const serviceForm = createSlice({
    name: "serviceForm",
    initialState: initialState,
    reducers: {
        addNewFormAddReducer: ((state, action) => {
            state.isNewFormAdd = action.payload
        }),
        isDataSaveReducer: ((state, action) => {
            state.isDataSaved = action.payload
        }),
        savedLTFormDataReducer: ((state, action) => {
            console.log("action.payload",action.payload)
            state.savedLTFormData = action.payload
        }),
        getNextServiceForm: (state) => {
            if (state.serviceFormIndex < state.allServiceFormData.length - 1) {
                state.serviceFormIndex++;
            }
        },
        getPreviousServiceForm: (state) => {
            if (state.serviceFormIndex > 0) {
                state.serviceFormIndex--;
                // state.singleUser = [state.allUser.tableData[state.serviceFormIndex]]; // Wrap in array if accessing a single user
            }
        },
        moveToStandardFormReducer:(state,action)=>{
            state.isMoveToStandardForm=action.payload
        },
        getFirstServiceForm: (state) => {
            state.serviceFormIndex = 0;
            // state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
        },
        getLastServiceForm: (state) => {
            state.serviceFormIndex = state.allServiceFormData.length - 1;
            // state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
        },

    },
    extraReducers: builder => {
        // BUILDERS FOR FETCHING ALL SERVICE FORMS
        builder.addCase(getAllServiceFormThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getAllServiceFormThunk.fulfilled, (state, action) => {
            state.status = "success"
            state.allServiceFormData = action.payload
        })
        builder.addCase(getAllServiceFormThunk.rejected, (state) => {
            state.status = "failed"
        })
        // BUILDERS FOR DELETE SERVICE FORMS
        builder.addCase(deleteServiceFormThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(deleteServiceFormThunk.fulfilled, (state, action) => {
            state.status = "success"
            state.allServiceFormData = action.payload
        })
        builder.addCase(deleteServiceFormThunk.rejected, (state) => {
            state.status = "failed"
        })
        // BUILDERS FOR UPDATE SERVICE FORMS
        builder.addCase(updateServiceFormThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(updateServiceFormThunk.fulfilled, (state) => {
            state.status = "success"
        })
        builder.addCase(updateServiceFormThunk.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export const { addNewFormAddReducer, isDataSaveReducer, savedLTFormDataReducer, getNextServiceForm, getPreviousServiceForm, getFirstServiceForm
    , getLastServiceForm ,moveToStandardFormReducer} = serviceForm.actions
export default serviceForm.reducer

// ASYNC THUNK STARTS
// GET ALL SERVICE FORM
export const getAllServiceFormThunk = createAsyncThunk("getAllServiceForm", async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
        dispatch(showSpinnerReducer(true));
        if (!accessToken) {
            localStorage.getItem("accessToken")
          }
        toast.success("called all service form data")
    try {
        console.log("accessToken<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>",accessToken)
        const response = await axios.get(`${baseUrl}/service-form/all-service-forms`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        console.log(response?.data?.data)
        return response?.data?.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
    finally {
        dispatch(showSpinnerReducer(false));
    }
})
// DELETE SERVICE FORM
export const deleteServiceFormThunk = createAsyncThunk("deleteServiceForm", async (id: string, { dispatch }) => {
    dispatch(showSpinnerReducer(true))

    try {
        // console.log(data)
        const response = await axios.delete(`${baseUrl}/service-form/delete`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                serviceFormId: id
            }
        })
        dispatch(getAllServiceFormThunk())
        toast.success(`${response?.data?.message}`)
        dispatch(showModalReducer(false))
        return response?.data?.data
    } catch (error) {
        // console.log(error)
        throw new Error(error)
    }
    finally {
        dispatch(showSpinnerReducer(false))

    }
})
// UPDATE SERVICE FORM
export const updateServiceFormThunk = createAsyncThunk("updateServiceForm", async (data: any, { dispatch }) => {
    console.log("sending data to update api", data)
    dispatch(showSpinnerReducer(true))
    try {
        // console.log(data)
        const response = await axios.patch(`${baseUrl}/service-form/update`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        })
        dispatch(getAllServiceFormThunk())
        toast.success(`${response?.data?.message}`)
        dispatch(showModalReducer(false))
        console.log(response)
    } catch (error) {
        console.log(">>>>>", error)
        toast.error("Something went wrong. Try Later")
    } finally {
        dispatch(showSpinnerReducer(false))

    }
})
// ADD SERVICE FORM
export const addServiceFormThunk = createAsyncThunk("addServiceForm", async (data: any, { dispatch }) => {
    console.log(data)
    dispatch(showSpinnerReducer(true))

    try {
        // console.log(data)
        const response = await axios.post(`${baseUrl}/service-form/create`, data, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        })
        dispatch(getAllServiceFormThunk())
        toast.success(`${response?.data?.message}`)
        dispatch(showModalReducer(false))
        console.log(response)
    } catch (error) {
        console.log(error)
        toast.error(`${error?.response?.data?.message}`)
    } finally {
        dispatch(showSpinnerReducer(false))
        window.location.reload();

    }
})

// ASYNC THUNK ENDS


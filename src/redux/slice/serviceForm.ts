import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../apiservices/baseUrl/baseUrl";
import { toast } from "react-toastify";
import { showModalReducer } from "./showModal";
import { showSpinnerReducer } from "./spinner";
import { serviceFormType } from "../../type/serviceFormType/serviceFormType";
import api from "../../apiservices/axiosInstance";
import { selectedSearchResultDataReducer } from "./resultForm";
const accessToken = localStorage.getItem("accessToken");
console.log("access tokenin service form");

const initialState = {
    allServiceFormData: [] as serviceFormType[],
    allSearchServiceFormData: [] as serviceFormType[],
    isSearchServiceForm: false,
    selectedSearchServicetData: "",
    isNewFormAdd: false,
    isDataSaved: false,
    savedLTFormData: null,
    serviceFormIndex: 0,
    singleServiceForm: null,
    isMoveToStandardForm: "",
    status: "idle",
    isDatePairModal: false,
    datepairs: {
        firstAttemptDate: null,
        secondAttemptDate: null
    }
}
const serviceForm = createSlice({
    name: "serviceForm",
    initialState: initialState,
    reducers: {
        isDatePairModalReducer: ((state, action) => {
            state.isDatePairModal = action.payload
        }),
        addDatePairModalReducer: ((state, action) => {
            const { firstAttepmtDate, secondAttepmtDate } = action.payload
            console.log(firstAttepmtDate,
                secondAttepmtDate)
            state.datepairs.firstAttemptDate = firstAttepmtDate;
            state.datepairs.secondAttemptDate = secondAttepmtDate;

        }),
        addNewFormAddReducer: ((state, action) => {
            state.isNewFormAdd = action.payload
        }),
        isDataSaveReducer: ((state, action) => {
            state.isDataSaved = action.payload
        }),
        savedLTFormDataReducer: ((state, action) => {
            console.log("action.payload", action.payload)
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
        moveToStandardFormReducer: (state, action) => {
            state.isMoveToStandardForm = action.payload
        },
        getFirstServiceForm: (state) => {
            state.serviceFormIndex = 0;
            // state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
        },
        getLastServiceForm: (state) => {
            state.serviceFormIndex = state.allServiceFormData.length - 1;
            // state.singleUser = [state.allUser.tableData[state.userId]]; // Wrap in array if accessing a single user
        },
        getSelectedSearchServicetData: (state, action) => {
            state.selectedSearchServicetData = action.payload
        },
        getIsSearchServiceForm: (state, action) => {
            state.isSearchServiceForm = action.payload
        },
        getCancelIsSearchServiceForm: (state) => {
            state.isSearchServiceForm = false
            state.selectedSearchServicetData = ""

        }

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
        builder.addCase(searchServiceFormThunk.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(searchServiceFormThunk.fulfilled, (state, action) => {
            state.status = "success"
            state.allSearchServiceFormData = action.payload

        })
        builder.addCase(searchServiceFormThunk.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export const { addNewFormAddReducer, isDataSaveReducer, savedLTFormDataReducer, getNextServiceForm, getPreviousServiceForm, getFirstServiceForm
    , getLastServiceForm, moveToStandardFormReducer, getSelectedSearchServicetData, getIsSearchServiceForm, getCancelIsSearchServiceForm, isDatePairModalReducer
    , addDatePairModalReducer } = serviceForm.actions
export default serviceForm.reducer

// ASYNC THUNK STARTS
// GET ALL SERVICE FORM
export const getAllServiceFormThunk = createAsyncThunk("getAllServiceForm", async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(showSpinnerReducer(true));

    if (!accessToken) {
        localStorage.getItem("accessToken")
    }
    // toast.success("called all service form data")
    try {
        // console.log("accessToken<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>", accessToken)
        const response = await api.get(`/service-form/all-service-forms`
            // , {
            //     headers: {
            //         "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            //     }
            // }
        )
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
        // const response = await axios.delete(`${baseUrl}/service-form/delete`, {
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //     },
        //     data: {
        //         serviceFormId: id
        //     }
        // })
        const response = await api.delete(`/service-form/delete`, {
            // headers: {
            //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            // },
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
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
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
        window.location.reload();

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
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },

        })
        dispatch(getAllServiceFormThunk())
        toast.success(`${response?.data?.message}`)
        dispatch(showModalReducer(false))

    } catch (error) {
        console.log("EOROR ADD FORM???????????????????", error)
        toast.error(`${error?.response?.data?.message}`)
    } finally {
        dispatch(showSpinnerReducer(false))
        window.location.reload();

    }
})

// SEARCH SERVICE FORM BY DATES
export const searchServiceFormThunk = createAsyncThunk("addServiceForm", async (data: any, { dispatch }) => {
    console.log("search form data from result form data", data)
    dispatch(showSpinnerReducer(true))

    try {
        console.log(data)
        const response = await axios.post(`${baseUrl}/service-form/all-service-forms-range`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },

        })
        toast.success(`${response?.data?.message}`)
        console.log("response?.data?.data", response?.data?.data)
        return response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(`${error?.response?.data?.message}`)
    }
    finally {
        dispatch(showSpinnerReducer(false))
        // window.location.reload();

    }
})

// ASYNC THUNK ENDS


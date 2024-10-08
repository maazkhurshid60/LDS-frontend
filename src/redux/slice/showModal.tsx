import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // showAddUserModal: false,
    // showAdministrationServerModal: false,
    // showServiceResultModal: false,
    // showServiceTypeModal: false,
    isShowModal:false,
    isUpdateShowModal:false,
    isShowRoleModal:false


}

const showModal = createSlice({
    name: "showModal",
    initialState: initialState,
    reducers: {
        // REDUCER FOR UPDATE MODAL
        showRoleModalReducer: (state, action) => {
            state.isShowRoleModal = action.payload

        },
        
        // // REDUCER FOR ADMINISTRATION SERVER MODAL
        // showAdministrationServerModalReducer: (state, action) => {
        //     state.showAdministrationServerModal = action.payload
        // },
        // // REDUCER FOR SERVER RESULT MODAL
        // showServiceResultReducer: (state, action) => {
        //     state.showServiceResultModal = action.payload
        // },
        //  // REDUCER FOR SERVER TYPE MODAL
        //  showServiceTypeReducer: (state, action) => {
        //     state.showServiceTypeModal = action.payload
        // },
        showModalReducer: (state, action) => {
            state.isShowModal = action.payload
        },
         // // REDUCER FOR UPDATE MODAL
         showUpdateModalReducer: (state, action) => {
            state.isUpdateShowModal = action.payload

        },
    }
})

export const {showModalReducer,showRoleModalReducer,showUpdateModalReducer} = showModal.actions
export default showModal.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // showAddUserModal: false,
    // showAdministrationServerModal: false,
    // showServiceResultModal: false,
    // showServiceTypeModal: false,
    isShowModal:false

}

const showModal = createSlice({
    name: "showModal",
    initialState: initialState,
    reducers: {
        // // REDUCER FOR ADD USER MODAL
        // showAddUserModalReducer: (state, action) => {
        //     state.showAddUserModal = action.payload

        // },
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
        }
    }
})

export const {showModalReducer} = showModal.actions
export default showModal.reducer
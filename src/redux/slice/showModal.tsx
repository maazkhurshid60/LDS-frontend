import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    isShowModal: false,
    isUpdateShowModal: false,
    isShowRoleModal: false


}

const showModal = createSlice({
    name: "showModal",
    initialState: initialState,
    reducers: {
        // REDUCER FOR UPDATE MODAL
        showRoleModalReducer: (state, action) => {
            state.isShowRoleModal = action.payload

        },

        showModalReducer: (state, action) => {
            state.isShowModal = action.payload
        },
        // REDUCER FOR UPDATE MODAL
        showUpdateModalReducer: (state, action) => {
            state.isUpdateShowModal = action.payload

        },
    }
})

export const { showModalReducer, showRoleModalReducer, showUpdateModalReducer } = showModal.actions
export default showModal.reducer
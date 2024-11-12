import { createSlice } from "@reduxjs/toolkit";

const notFoundSlice = createSlice({
    name: "notFoundSlice",
    initialState: { isShow: false },
    reducers: {
        showNotFoundPage: ((state, action) => {
            state.isShow = action.payload
        })
    }
})
export const { showNotFoundPage } = notFoundSlice.actions
export default notFoundSlice.reducer
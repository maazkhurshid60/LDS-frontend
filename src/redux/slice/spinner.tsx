import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowSpinner:false,
}

const showSpinner = createSlice({
    name: "showSpinner",
    initialState: initialState,
    reducers: {
        // REDUCER FOR UPDATE MODAL
        showSpinnerReducer: (state, action) => {
            state.isShowSpinner = action.payload

        },
        
    }
})

export const {showSpinnerReducer} = showSpinner.actions
export default showSpinner.reducer
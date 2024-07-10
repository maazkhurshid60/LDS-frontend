import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    role: null
};

const userDetailSlice = createSlice({
    name: "userDetail",
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            const { email, role } = action.payload;
            state.email = email;
            state.role = role;
        },
        logoutUser: (state) => {
           
            state.email = null;
            state.role = null;
        }
    }
});

export const { loginUser,logoutUser } = userDetailSlice.actions;
export default userDetailSlice.reducer;

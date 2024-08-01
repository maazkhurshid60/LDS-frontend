import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    userDetails:null,
    // isAdmin:userDetails?.roles?.some((data) => data?.name === "Admin")
};

const userDetailSlice = createSlice({
    name: "userDetail",
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userDetails = action.payload;
           
        },
        logoutUser: (state) => {
           
            state.userDetails =null;
        }
    }
});

export const { loginUser,logoutUser } = userDetailSlice.actions;
export default userDetailSlice.reducer;

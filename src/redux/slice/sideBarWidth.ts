import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sideBar:false
}

const sideBarWidth=createSlice({
    name:"sideBarWidth",
    initialState:initialState,
    reducers:{isSideBarWidth:(state,action)=>{
                state.sideBar=!action.payload
    }}
})

export const {isSideBarWidth}=sideBarWidth.actions
export default sideBarWidth.reducer
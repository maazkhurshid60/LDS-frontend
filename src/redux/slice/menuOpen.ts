import { createSlice } from "@reduxjs/toolkit";

const initialState={menuOpenStatus:true}

const menuOpen=createSlice({
    name:"openMenu",
    initialState:initialState,
    reducers:{
        openMenuFunction:(state,action)=>{
            state.menuOpenStatus=!action.payload
        }
    }
})

export const {openMenuFunction}=menuOpen.actions
export default menuOpen.reducer
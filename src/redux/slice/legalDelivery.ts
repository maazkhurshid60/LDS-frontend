import { createSlice } from "@reduxjs/toolkit";

const initialState={
    legalDeliveryData:""

}

const legalDelivery=createSlice({
name:"legalDelivery",
initialState:initialState,
reducers:{
    getSingleLegalDeliveryReducer:(state,action)=>{
        console.log(">>>>>>>>>>>>>>>>>>>>>",action.payload)
        state.legalDeliveryData=action.payload
    }
}
})

export const {getSingleLegalDeliveryReducer}=legalDelivery.actions
export default legalDelivery.reducer
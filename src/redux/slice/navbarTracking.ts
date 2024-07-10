import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainMenu: "Operations", // Initially main menu selected
    subMenu: "Service", // Initially submenu selected
}
const navbarTracking = createSlice({
    name: "navbarTracking",
    initialState: initialState,
    reducers: {
        setMainMenuName: (state, action) => {
            state.mainMenu = action.payload
            state.subMenu = ""
        },
        setSubMenuName: (state, action) => {
            state.subMenu = action.payload; // Update subMenu with selected value
        },
        emptyNavbarData:(state)=>{
            state.mainMenu = ""
            state.subMenu = ""
        }
    }
})

export const { setMainMenuName,setSubMenuName ,emptyNavbarData} = navbarTracking.actions;
export default navbarTracking.reducer
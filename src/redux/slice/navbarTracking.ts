import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainMenu: "Administeration", // Initially main menu selected
    subMenu: "User", // Initially submenu selected
    isShow: false
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
        emptyNavbarData: (state) => {
            state.mainMenu = ""
            state.subMenu = ""
        },
        showNotFoundPage: ((state, action) => {
            state.isShow = action.payload
        })
    }
})

export const { setMainMenuName, setSubMenuName, emptyNavbarData, showNotFoundPage } = navbarTracking.actions;
export default navbarTracking.reducer
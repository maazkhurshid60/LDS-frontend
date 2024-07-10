import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import navbarTrackingReducer from "./slice/navbarTracking";
import userDetailReducer from "./slice/userDetail";
import menuOpenReducer from "./slice/menuOpen";
import sideBarWidthReducer from "./slice/sideBarWidth";
import userIdReducer from "./slice/userId";
import showModalReducer from "./slice/showModal";
import mailingAdressesReducer from "./slice/mailingAdresses";


// Combine all reducers
const rootReducer = combineReducers({
    navbarTracking: navbarTrackingReducer,
    userDetail: userDetailReducer,
    menuOpen:menuOpenReducer,
    sidebar:sideBarWidthReducer,
    userId:userIdReducer,
    showModal:showModalReducer,
    mailingAdress:mailingAdressesReducer,
});

// Define RootState to encompass all slices
export type RootState = ReturnType<typeof rootReducer>;

// Configuration for redux-persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userDetail","navbarTracking",] // reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
    reducer: persistedReducer
});

// Create persistor object
const persistor = persistStore(store);

export { store, persistor };

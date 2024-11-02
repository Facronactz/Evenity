import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import customerSlice from "./slice/customerSlice";


const store = configureStore({
    reducer : {
        auth : authSlice,
        customer : customerSlice
    }
})

export default store
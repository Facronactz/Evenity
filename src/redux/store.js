import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import customerSlice from "./slice/customerSlice";
import vendorSlice from "./slice/vendorSlice";
import eventSlice from "./slice/eventSlice";


const store = configureStore({
    reducer : {
        auth : authSlice,
        customer : customerSlice,
        vendor: vendorSlice,
        event: eventSlice
    }
})

export default store
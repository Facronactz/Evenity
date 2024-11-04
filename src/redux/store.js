import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import customerSlice from "./slice/customerSlice";
import transactionSlice from "./slice/transactionSlice";
import withdrawSlice from "./slice/withdrawslice";
import vendorSlice from "./slice/vendorSlice";
import eventSlice from "./slice/eventSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        customer : customerSlice,
        transaction : transactionSlice,
        withdraw : withdrawSlice,
        vendor: vendorSlice,
        event: eventSlice
    }
})

export default store
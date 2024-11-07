import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getAllCustomers = createAsyncThunk(
    'customer/getAllCustomers',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('/customer')
            return response.data.data
        } catch (error) {
            rejectWithValue(error)
        }
    })

const customerSlice = createSlice({
    name: "user",
    initialState: {
        customers: [],
        selectedCustomer: null,
        status: "",
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.status = "success"
                state.customers = action.payload
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.status = "failed"
                state.customers = []
            })
    }
})

export const {setSelectedCustomer} = customerSlice.actions

export default customerSlice.reducer
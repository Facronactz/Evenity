import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

const itemsPerPage = 8

export const getAllCustomers = createAsyncThunk(
    'customer/getAllCustomers',
    async (_, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.get(`/customer`); // Fetch all customers without pagination
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const disableCustomer = createAsyncThunk(
    'customer/disableCustomer',
    async (id, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.put(`/customer/${id}/disable`)
            return response.data
        } catch (error) {
            rejectWithValue(error)
        }
    })

export const enableCustomer = createAsyncThunk(
    'customer/enableCustomer',
    async (id, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.put(`/customer/${id}/enable`)
            return response.data
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
        currentPage: 1,
        totalPages: 0,
        totalItems: 0
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.status = "success"
                state.customers = action.payload.data

                state.totalItems = action.payload.pagingResponse.count

                state.currentPage = action.payload.pagingResponse.page

                state.totalPages = Math.ceil(action.payload.pagingResponse.count / itemsPerPage)

            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.status = "failed"
                state.customers = []
            })
            .addCase(disableCustomer.fulfilled, (state, action) => {
                state.status = "success"
                state.customers = state.customers.filter((customer) => customer.id !== action.payload.id)
            })
            .addCase(enableCustomer.fulfilled, (state, action) => {
                state.status = "success"
                state.customers = state.customers.filter((customer) => customer.id !== action.payload.id)
            })
            .addCase(disableCustomer.rejected, (state) => {
                state.status = "failed"
            })
            .addCase(enableCustomer.rejected, (state) => {
                state.status = "failed"
            })
    }
})



export const {
    setCurrentPage,
    setSelectedCustomer
} = customerSlice.actions
export default customerSlice.reducer
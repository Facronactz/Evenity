import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const itemsPerPage = 4

export const getAllWithdraws = createAsyncThunk(
    'withdraw/getAllWithdraws', 
    async ({page = 1}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/transaction/withdraw/request?page=${page}&size=${itemsPerPage}`)
            console.log(response)
            return response.data
        } catch (error) {
            rejectWithValue(error)
        }
    })

const withdrawSlice = createSlice({
    name : "withdraw",
    initialState : {
        withdrawRequests : [],
        selectedWithdrawRequest : null,
        status : "",
        currentPage : 1,
        totalItems : 0,
        totalPages : 0   
    },
    reducers : {
        setSelectedWithdrawRequest : (state, action) => {
            state.selectedCustomer = action.payload
        },
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllWithdraws.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getAllWithdraws.fulfilled, (state, action) => {
                state.status = "success"
                state.customers = action.payload.data
                state.totalItems = action.payload.pagingResponse.count
                state.currentPage = action.payload.pagingResponse.page
                state.totalPages = Math.ceil(action.payload.pagingResponse.count / itemsPerPage)
            })
            .addCase(getAllWithdraws.rejected, (state, action) => {
                state.status = "failed"
                state.customers = []
            })
    }
})

export const { setSelectedWithdrawRequest, setCurrentPage } = withdrawSlice.actions

export default withdrawSlice.reducer
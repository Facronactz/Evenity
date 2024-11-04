import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllWithdraws = createAsyncThunk(
    'withdraw/getAllWithdraws', 
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('/transaction/withdraw/request')
            console.log(response)
            return response.data.data
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
    },
    reducers : {
        setSelectedWithdrawRequest : (state, action) => {
            state.selectedCustomer = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllWithdraws.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getAllWithdraws.fulfilled, (state, action) => {
                state.status = "success"
                state.customers = action.payload
            })
            .addCase(getAllWithdraws.rejected, (state, action) => {
                state.status = "failed"
                state.customers = []
            })
    }
})

export const { setSelectedWithdrawRequest } = withdrawSlice.actions

export default withdrawSlice.reducer
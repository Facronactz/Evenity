import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getAllTransactions = createAsyncThunk(
    'transaction/getAllTransactions', 
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get("/invoice")
            console.log("Response data", response.data)
            return response.data.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    })


const transactionSlice = createSlice({
    name : "transaction",
    initialState : {
        transaction : [],
        selectedTransaction : null,
        status : "",
        
    },
    reducers : {
        setSelectedTransaction : (state, action) => {
            state.selectedTransaction = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.status = "success"
                state.transaction = action.payload
            })
            .addCase(getAllTransactions.rejected, (state, action) => {
                state.status = "failed"
                state.transaction = []
            })
    }
})


export const {setSelectedTransaction} = transactionSlice.actions
export default transactionSlice.reducer
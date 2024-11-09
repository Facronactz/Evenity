import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"
import axios from "axios"

const itemsPerPage = 4

export const getAllTransactions = createAsyncThunk(
    'transaction/getAllTransactions',
    async ({
        page = 1
    }, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.get(`/invoice?page=${page}&size=${itemsPerPage}`)
            console.log("Response data", response.data)
            return response.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    })


export const forwardPaidVendor = createAsyncThunk(
    'transaction/forwardPaidVendor',
    async (id, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.put(`/invoice/detail/${id}`)
            return response.data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transaction: [],
        selectedTransaction: null,
        status: "",
        currentPage: 1,
        totalItems: 0,
        totalPages: 0

    },
    reducers: {
        setSelectedTransaction: (state, action) => {
            state.selectedTransaction = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        // Specific cases should be defined first
        builder
            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.status = "success";
                state.transaction = action.payload.data;
                state.totalItems = action.payload.pagingResponse.count;
                state.currentPage = action.payload.pagingResponse.page;
                state.totalPages = Math.ceil(action.payload.pagingResponse.count / itemsPerPage);
            })
            .addCase(getAllTransactions.rejected, (state, action) => {
                state.status = "failed";
                state.transaction = [];
            })
            .addCase(forwardPaidVendor.fulfilled, (state, action) => {
                state.status = "success";
                // Update the transaction list or selected transaction as needed
                const updatedTransaction = action.payload; // Assuming this returns the updated transaction
                const index = state.transaction.findIndex(t => t.invoiceId === updatedTransaction.invoiceId);
                if (index !== -1) {
                    state.transaction[index] = updatedTransaction; // Update the transaction in the list
                }
            })
            .addCase(forwardPaidVendor.rejected, (state, action) => {
                state.status = "failed";
            })
            // Now you can add matchers
            .addMatcher(getAllTransactions.pending, (state) => {
                state.status = "loading";
            })
            .addMatcher(forwardPaidVendor.pending, (state) => {
                state.status = "loading";
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "loading";
            });
    }
})


export const {
    setSelectedTransaction,
    setCurrentPage
} = transactionSlice.actions
export default transactionSlice.reducer
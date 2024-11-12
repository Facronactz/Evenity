import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

const itemsPerPage = 10; // Sesuaikan dengan kebutuhan

export const getAllWithdraws = createAsyncThunk(
    'withdraw/getAllWithdraws',
    async (_, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.get(`/transaction/withdraw/request`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || {
                message: "An error occurred"
            });
        }
    }
);

export const approveWithdraw = createAsyncThunk(
    'withdraw/approveWithdraw',
    async ({id, file}, {
        rejectWithValue,
        dispatch
    }) => {

        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(`/transaction/withdraw/${id}/approve`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Response data", response.data)
            // Refresh list setelah approve
            await dispatch(getAllWithdraws({
                page: 1,
                status: '' // Opsional: bisa tambahkan filter status jika diperlukan
            }));
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || {
                message: "Approval failed"
            });
        }
    }
);

export const rejectWithdraw = createAsyncThunk(
    'withdraw/rejectWithdraw',
    async (id, {
        rejectWithValue,
        dispatch
    }) => {
        try {
            const response = await axios.put(`/transaction/withdraw/${id}/reject`);
            // Refresh list setelah reject
            await dispatch(getAllWithdraws({
                page: 1,
                status: '' // Opsional: bisa tambahkan filter status jika diperlukan
            }));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || {
                message: "Rejection failed"
            });
        }
    }
);

const withdrawSlice = createSlice({
    name: "withdraw",
    initialState: {
        withdrawRequests: [],
        selectedWithdrawRequest: null,
        status: "idle", // Gunakan "idle" sebagai default
        error: null, // Tambahkan error state
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        filterStatus: '' // Tambahkan state untuk filter status
    },
    reducers: {
        setSelectedWithdrawRequest: (state, action) => {
            state.selectedWithdrawRequest = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL WITHDRAWS
            .addCase(getAllWithdraws.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllWithdraws.fulfilled, (state, action) => {
                state.status = "success";
                state.withdrawRequests = action.payload.data || [];
                state.totalItems = action.payload.pagingResponse?.count || 0;
                state.currentPage = action.payload.pagingResponse?.page || 1;
                state.totalPages = Math.ceil(
                    (action.payload.pagingResponse?.count || 0) / itemsPerPage
                );
            })
            .addCase(getAllWithdraws.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch withdraws";
                state.withdrawRequests = [];
            })

            // APPROVE WITHDRAW
            .addCase(approveWithdraw.pending, (state) => {
                state.status = "loading";
            })
            .addCase(approveWithdraw.fulfilled, (state) => {
                state.status = "success";
                state.selectedWithdrawRequest = null;
            })
            .addCase(approveWithdraw.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Approval failed";
            })

            // REJECT WITHDRAW
            .addCase(rejectWithdraw.pending, (state) => {
                state.status = "loading";
            })
            .addCase(rejectWithdraw.fulfilled, (state) => {
                state.status = "success";
                state.selectedWithdrawRequest = null;
            })
            .addCase(rejectWithdraw.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Rejection failed";
            });
    }
});

// Export actions
export const {
    setSelectedWithdrawRequest,
    setCurrentPage,
    setFilterStatus,
    resetError
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
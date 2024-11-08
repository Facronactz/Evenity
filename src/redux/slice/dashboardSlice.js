import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchDashboardSummary = createAsyncThunk(
    'dashboard/fetchSummary',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/admin/dashboard');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchEventDiagram = createAsyncThunk(
    'dashboard/fetchEventDiagram',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/admin/diagram/event');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserDiagram = createAsyncThunk(
    'dashboard/fetchUserDiagram',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/admin/diagram/user');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        summary: {
            totalEvent: 0,
            eventThisMonth: 0,
            vendorTotal: 0,
            customerTotal: 0,
            grossIncomeThisMonth: 0,
            revenueThisMonth: 0
        },
        eventDiagram: [],
        userDiagram: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Dashboard Summary
            .addCase(fetchDashboardSummary.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.summary = action.payload;
            })
            .addCase(fetchDashboardSummary.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Event Diagram
            .addCase(fetchEventDiagram.fulfilled, (state, action) => {
                state.eventDiagram = action.payload;
                state.status = 'succeeded';
            })
            // User Diagram
            .addCase(fetchUserDiagram.fulfilled, (state, action) => {
                state.userDiagram = action.payload;
                state.status = 'succeeded';
            })
            .addMatcher(fetchEventDiagram.pending, (state) => {
                state.status = 'loading';
            })
            .addMatcher(fetchUserDiagram.pending, (state) => {
                state.status = 'loading';
            })
            .addMatcher(fetchEventDiagram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addMatcher(fetchUserDiagram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default dashboardSlice.reducer;
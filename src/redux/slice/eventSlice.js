import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const itemsPerPage = 8;

export const getEventDetail = createAsyncThunk(
    "event/getEventDetail",
    async (_, {rejectWithValue}) => {
        const token = localStorage.getItem("token");
        const response = await axios
            .get(`/event/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                rejectWithValue(error.response.data.message);
            });
        // console.log("response",response);
        if (response.data) {
            return response.data.data;
        } else {
            return rejectWithValue("Invalid email or password");
        }
    }
);


const eventSlice = createSlice({
    name: "event",
    initialState: {
        event: [],
        status: "",
        error: null,
        selectedEvent: null,
        currentPage: 1,
        totalPages: 0,
        totalItems: 0
    },
    reducers: {
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEventDetail.fulfilled, (state, action) => {
                state.status = "success";

                state.event = action.payload.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
                // state.event = action.payload.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            })
            .addCase(getEventDetail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "An error occurred";
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                }
            );
    },
});

export const {setSelectedEvent, setCurrentPage} = eventSlice.actions;
export default eventSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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
        console.log(response);
        if (response.data.data) {
            return response.data.data;
        } else {
            return rejectWithValue("Invalid email or password");
        }
    }
);


const eventSlice = createSlice({
    name: "event",
    initialState: {
        event: null,
        status: "",
        error: null,
        selectedEvent: null
    },
    reducers: {
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEventDetail.fulfilled, (state, action) => {
                state.status = "success";
                state.event = action.payload;
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

export const {setSelectedEvent} = eventSlice.actions;
export default eventSlice.reducer;
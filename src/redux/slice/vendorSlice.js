import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllVendors = createAsyncThunk(
    "vendor/getAllVendors",
    async (_, {
        rejectWithValue
    }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`/vendor`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getProductByVendorId = createAsyncThunk(
    "vendor/getProductByVendorId",
    async (id, {
        rejectWithValue
    }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`/vendor/${id}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response product", response);
            return response.data.data.productList;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getVendorByVendorId = createAsyncThunk(
    "vendor/getVendorByVendorId",
    async (id, {
        rejectWithValue
    }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`/vendor/${id}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response product", response);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const approveVendor = createAsyncThunk(
    "vendor/approveVendor",
    async (id, {
        rejectWithValue
    }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `/vendor/${id}/approve`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const disableVendor = createAsyncThunk(
    "vendor/disableVendor",
    async (id, {
        rejectWithValue
    }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `/vendor/${id}/reject`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const vendorSlice = createSlice({
    name: "vendor",
    initialState: {
        vendors: [],
        selectedVendor: null,
        selectedProduct: null,
        status: "",
    },
    reducers: {
        setSelectedVendor: (state, action) => {
            state.selectedVendor = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllVendors.fulfilled, (state, action) => {
                state.status = "success";
                state.vendors = action.payload.sort((a, b) => {
                    return new Date(a.modifiedDate) - new Date(b.modifiedDate);
                });
            })
            .addCase(getProductByVendorId.fulfilled, (state, action) => {
                console.log("product selected", action)
                state.selectedProduct = action.payload;
            })
            .addCase(getVendorByVendorId.fulfilled, (state, action) => {
                state.selectedVendor = action.payload;
            })
            .addCase(approveVendor.fulfilled, (state, action) => {
                const index = state.vendors.findIndex(v => v.id === action.payload.id);
                if (index !== -1) {
                    state.vendors[index] = action.payload;
                }
            })
            .addCase(disableVendor.fulfilled, (state, action) => {
                const index = state.vendors.findIndex(v => v.id === action.payload.id);
                if (index !== -1) {
                    state.vendors[index] = action.payload;
                }
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state) => {
                    state.status = "failed";
                }
            );
    },
});

export const {
    setSelectedVendor
} = vendorSlice.actions;
export default vendorSlice.reducer;
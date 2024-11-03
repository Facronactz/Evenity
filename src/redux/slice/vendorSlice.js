import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllVendors = createAsyncThunk(
  "vendor/getAllVendors",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const response = await axios
      .get("/vendor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        rejectWithValue(error.response.data.message);
      });
    // console.log(response);
    if (response.data.data) {
      return response.data.data;
    } else {
      return rejectWithValue("Invalid email or password");
    }
  }
);

export const getProductByVendorId = createAsyncThunk(
  "vendor/getProductByVendorId",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const response = await axios
      .get(`/vendor/${id}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        rejectWithValue(error.response.data.message);
      });
    console.log("response uhuy" ,response);
    if (response.data.data) {
      return response.data.data;
    } else {
      return rejectWithValue("Invalid email or password");
    }
  }
);


export const approveVendor = createAsyncThunk(
  "vendor/approvedVendor",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `/vendor/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data) {
        return response.data.data;
      } else {
        return rejectWithValue("Invalid data response");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendors_pending: [],
    vendors_active: [],
    selectedVendor: null,
    productSelected: null,
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
        if (action.payload) {
          state.vendors_pending = action.payload.filter(
            (vendor) => vendor.status === "PENDING"
          );
          state.vendors_active = action.payload.filter(
            (vendor) => vendor.status === "ACTIVE"
          );
        }
      })
      .addCase(getProductByVendorId.fulfilled, (state, action) => {
        state.status = "success";
        state.productSelected = action.payload;
      })
      .addCase(approveVendor.fulfilled, (state, action) => {
        const approvedVendor = action.payload;
        state.vendors_pending = state.vendors_pending.filter(
          (vendor) => vendor.id !== approvedVendor.id
        );
        state.vendors_active.push(approvedVendor);
        if (state.selectedVendor?.id === approvedVendor.id) {
          state.selectedVendor = approvedVendor;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      );
  },
});

export const { setSelectedVendor } = vendorSlice.actions;
export default vendorSlice.reducer;

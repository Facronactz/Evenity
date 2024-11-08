import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

const itemsPerPage = 6;

export const getAllVendors = createAsyncThunk(
  "vendor/getAllVendors",
  async ({
    page = 1,
    type = null
  }, {
    rejectWithValue
  }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`/vendor?page=${page}&size=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response uhuy", response.data.data);
      console.log("page", response);
      return {
        ...response.data,
        type
      }; // Mengembalikan seluruh response untuk mendapatkan total item
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
    const response = await axios
      .get(`/vendor/${id}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        rejectWithValue(error.response.data.message);
      });

    if (response.data.data) {
      return response.data.data;
    } else {
      return rejectWithValue("Invalid email or password");
    }
  }
);


export const approveVendor = createAsyncThunk(
  "vendor/approvedVendor",
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
      if (response.data.data) {
        return response.data.data;
      } else {
        return rejectWithValue("Invalid data response");
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "An error occurred"
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
    currentPage: 1,
    totalPages: 0,
    totalItems: 0
  },
  reducers: {
    setSelectedVendor: (state, action) => {
      state.selectedVendor = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVendors.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          console.log("action.payload.data", action.payload.data);
          state.totalItems = action.payload.pagingResponse.count;
          console.log("totalItems", state.totalItems);


          state.currentPage = action.payload.pagingResponse.page;
          // console.log("vendors", vendors)
          state.vendors_pending = action.payload.data.filter(
            (vendor) => vendor.status === "PENDING"
          );
          state.vendors_active = action.payload.data.filter(
            (vendor) => vendor.status === "ACTIVE"
          );
          state.totalPages = Math.ceil(action.payload.pagingResponse.count / itemsPerPage);


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

export const {
  setSelectedVendor,
  setCurrentPage
} = vendorSlice.actions;
export default vendorSlice.reducer;
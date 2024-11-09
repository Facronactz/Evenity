import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {setupAxios} from "@/config/axiosConfig";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
       try{ email = email.toLowerCase()
        const response = await axios.post("auth/login", {email, password}).catch(e => e.response)
        // console.log(response.status)
        if (response.status !== 200) return rejectWithValue("Invalid email or password");
        // console.log(response.data)
        const {token} = response.data.data
        if (response.data.data) {
            localStorage.setItem("token", token);
            setupAxios(token);
            const {role, sub: userId} = jwtDecode(token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("email", email);
            localStorage.setItem("role", role);
            return {userId, email, role};
        } else {
            return rejectWithValue("Invalid email or password");
        }} catch (e) {
            console.log(e)
            return rejectWithValue(e)
        }
    }
);


const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: !!localStorage.getItem("token"),
        error: null,
        status: "idle",
        user: null,
        registerData: null,
        registerAs: null,
    },
    reducers: {

        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
            state.status = "idle";
            state.registerData = null;
            state.registerAs = null;
            toast.success("Logout Success");
            delete axios.defaults.headers.common["Authorization"];
        },
        resetError: (state) => {
            state.error = null;
        },
        resetStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(login.fulfilled, (state, action) => {
                toast.success("Login Success");
                state.status = "logged in";
                action.payload.role === "ROLE_ADMIN" ? state.isLoggedIn = true : state.isLoggedIn = false;
                state.user = action.payload;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
          .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                toast.error(action.payload);
                state.status = "failed";
                state.isLoggedIn = false;
                state.user = null;
                state.registerData = null;
                state.registerAs = null;
                state.error = action?.payload ? action.payload : "Something went wrong";
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "loading";
            })
    },
});

export const {logout, resetError, register, resetStatus, setRegisterAs} = AuthSlice.actions;
export default AuthSlice.reducer;
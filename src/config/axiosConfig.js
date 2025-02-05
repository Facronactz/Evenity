import axios from 'axios';

export const setupAxios = (token = null) => {
    axios.defaults.baseURL = "https://evenity-eo-app-production.up.railway.app/api/v1";
    if (!token) token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("email");
                localStorage.removeItem("role");
            }
            return Promise.reject(error);
        }
    );
};
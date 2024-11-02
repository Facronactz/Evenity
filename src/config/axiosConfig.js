import axios from 'axios';

export const setupAxios = (token = null) => {
    axios.defaults.baseURL = "/api/v1";
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
};
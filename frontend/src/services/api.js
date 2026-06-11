import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8086/api",
});

api.interceptors.request.use(
    (config) => {
        // Look closely at this key: "token"
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

// Automatically attach Bearer token
api.interceptors.request.use((config) => {

    if (typeof window !== "undefined") {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

    }

    return config;
});

// Automatically logout if token becomes invalid
api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (
            typeof window !== "undefined" &&
            error.response?.status === 401
        ) {

            localStorage.removeItem("token");

        }

        return Promise.reject(error);

    }

);
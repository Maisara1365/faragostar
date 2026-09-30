import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default api;

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000/api";

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(options?.headers ?? {}),
            },
            ...options,
            cache: "no-store",
        }
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch data."
        );

    }

    return response.json();
}
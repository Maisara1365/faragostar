import { api } from "./api";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export async function register(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    password_confirmation: string;
    language: "fa" | "en";
}) {
    const response = await api.post("/register", data);
    return response.data;
}

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/
export async function login(data: {
    email: string;
    password: string;
    remember: boolean;
    language: "fa" | "en";
}) {
    const response = await api.post("/login", data);

    const responseData = response.data;

    const user = responseData?.data?.user;
    const token = responseData?.data?.token;

    if (user) {
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
    }

    if (token) {
        localStorage.setItem(
            "token",
            token
        );
    }

    return responseData;
}

/*
|--------------------------------------------------------------------------
| Email Verification
|--------------------------------------------------------------------------
*/

export async function verifyEmailOtp(
    email: string,
    otp: string
) {
    const response = await api.post("/email/verify", {
        email,
        otp,
    });
    return response.data;
}

export async function resendEmailOtp(
    email: string
) {
    const response = await api.post("/email/resend-otp", {
        email,
    });
    return response.data;
}

/*
|--------------------------------------------------------------------------
| Password Reset
|--------------------------------------------------------------------------
*/

export async function forgotPassword(data: {
    email: string;
    language: "fa" | "en";
}) {
    const response = await api.post("/forgot-password", data);
    return response.data;
}

export async function resetPassword(data: {
    email: string;
    otp: string;
    password: string;
    password_confirmation: string;
    language: "fa" | "en";
}) {
    const response = await api.post("/reset-password", data);
    return response.data;
}

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

export async function getCurrentUser() {
    try {
        const response = await api.get("/me");
        return response.data.data;
    } catch {
        return null;
    }
}

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export async function logout() {
    try {
        await api.post("/logout");
    } catch (error) {
        console.error(error);
    } finally {
        localStorage.removeItem("token");
    }
}
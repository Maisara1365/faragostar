"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    getCurrentUser,
    logout,
} from "@/services/auth";

/*
|--------------------------------------------------------------------------
| Auth User Type
|--------------------------------------------------------------------------
*/

export interface AuthUser {
    id: number;

    name: string;

    email: string;

    phone: string | null;

    role:
        | "admin"
        | "content_manager"
        | "customer";

    status:
        | "active"
        | "blocked";

    language:
        | "fa"
        | "en";

    profile_photo_path: string | null;

    profile_photo_url: string | null;

    email_verified: boolean;

    email_verified_at: string | null;

    must_change_password: boolean;

    created_at: string;

    updated_at: string;
}

interface AuthContextType {
    user: AuthUser | null;

    loading: boolean;

    isAuthenticated: boolean;

    refreshUser: () => Promise<void>;

    logoutUser: () => Promise<void>;
}

const AuthContext =
    createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [loading, setLoading] =
        useState(true);

    /*
    |--------------------------------------------------------------------------
    | Prevent stale authentication requests from overwriting newer state
    |--------------------------------------------------------------------------
    */

    const refreshRequestRef = useRef(0);

    /*
    |--------------------------------------------------------------------------
    | Refresh authenticated user
    |--------------------------------------------------------------------------
    */

    async function refreshUser() {
        const requestId =
            ++refreshRequestRef.current;

        try {
            setLoading(true);

            const currentUser =
                await getCurrentUser();

            /*
            |--------------------------------------------------------------------------
            | Only the newest request is allowed to update the state
            |--------------------------------------------------------------------------
            */

            if (
                requestId !==
                refreshRequestRef.current
            ) {
                return;
            }

            setUser(currentUser);
        } catch (error) {
            console.error(
                "Failed to load authenticated user:",
                error
            );

            if (
                requestId ===
                refreshRequestRef.current
            ) {
                setUser(null);
            }
        } finally {
            if (
                requestId ===
                refreshRequestRef.current
            ) {
                setLoading(false);
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    async function logoutUser() {
        /*
        |--------------------------------------------------------------------------
        | Invalidate any request that may still be running
        |--------------------------------------------------------------------------
        */

        ++refreshRequestRef.current;

        try {
            await logout();
        } finally {
            setUser(null);
            setLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Initial authentication check
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                refreshUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}
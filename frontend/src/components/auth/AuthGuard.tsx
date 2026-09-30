"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import type { DashboardRole } from "@/config/dashboard";

interface AuthGuardProps {

    children: React.ReactNode;

    /*
    |--------------------------------------------------------------------------
    | Optional Role Protection
    |--------------------------------------------------------------------------
    */

    allowedRoles?: DashboardRole[];

}

export default function AuthGuard({

    children,

    allowedRoles,

}: AuthGuardProps) {

    const router = useRouter();

    const {

        user,

        loading,

    } = useAuth();

    useEffect(() => {

        if (loading) return;

        /*
        |--------------------------------------------------------------------------
        | Not Logged In
        |--------------------------------------------------------------------------
        */

        if (!user) {

            router.replace("/auth/login");

            return;

        }

        /*
        |--------------------------------------------------------------------------
        | Forbidden
        |--------------------------------------------------------------------------
        */

        if (

            allowedRoles &&

            !allowedRoles.includes(user.role)

        ) {

            router.replace("/403");

        }

    }, [

        loading,

        user,

        allowedRoles,

        router,

    ]);

    /*
    |--------------------------------------------------------------------------
    | Loading Screen
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-slate-950">

                <div className="h-14 w-14 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />

            </div>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Prevent Flash
    |--------------------------------------------------------------------------
    */

    if (!user) {

        return null;

    }

    /*
    |--------------------------------------------------------------------------
    | Prevent Unauthorized Flash
    |--------------------------------------------------------------------------
    */

    if (

        allowedRoles &&

        !allowedRoles.includes(user.role)

    ) {

        return null;

    }

    return children;

}
"use client";

import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/language-context";

import {
    getAdminDashboard,
    getContentManagerDashboard,
    getCustomerDashboard,
} from "@/services/dashboard";

import AdminDashboard from "@/components/dashboard/home/AdminDashboard";
import ContentManagerDashboard from "@/components/dashboard/home/ContentManagerDashboard";
import CustomerDashboard from "@/components/dashboard/home/CustomerDashboard";

function DashboardContent() {
    const { user, loading } = useAuth();
    const { t, language } = useLanguage();

    const [dashboard, setDashboard] = useState<any>(null);
    const [pageLoading, setPageLoading] = useState(true);

    const isPersian = language === "fa";
    const direction = isPersian ? "rtl" : "ltr";

    /*
    |--------------------------------------------------------------------------
    | Load Dashboard
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        async function loadDashboard() {
            if (!user) {
                setPageLoading(false);
                return;
            }

            try {
                setPageLoading(true);

                let response: any = null;

                switch (user.role) {
                    case "admin":
                        response = await getAdminDashboard();
                        break;

                    case "content_manager":
                        response =
                            await getContentManagerDashboard();
                        break;

                    case "customer":
                        response =
                            await getCustomerDashboard();
                        break;

                    default:
                        response = null;
                        break;
                }

                /*
                |--------------------------------------------------------------------------
                | IMPORTANT
                |--------------------------------------------------------------------------
                | Backend returns:
                |
                | {
                |     success: true,
                |     message: "...",
                |     data: {
                |         customers: 1,
                |         admins: 1,
                |         services: 7,
                |         ...
                |     }
                | }
                |
                | The dashboard components need the CONTENT of data,
                | not the complete API response.
                |--------------------------------------------------------------------------
                */

                if (response?.data) {
                    setDashboard(response.data);
                } else {
                    setDashboard(response);
                }
            } catch (error) {
                console.error(
                    "Failed to load dashboard:",
                    error
                );

                setDashboard(null);
            } finally {
                setPageLoading(false);
            }
        }

        loadDashboard();
    }, [user]);

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading || pageLoading) {
        return (
            <div
                dir={direction}
                className="min-h-screen bg-slate-50"
            >
                <Header />

                <main className="flex min-h-[70vh] items-center justify-center px-5 py-16">
                    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">

                        <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-[#46A6D9]" />

                        <h3 className="text-xl font-bold text-[#183B73]">
                            {t.common.loading}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-500">
                            {isPersian
                                ? "لطفاً چند لحظه صبر کنید..."
                                : "Please wait while we prepare your dashboard..."}
                        </p>

                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (!dashboard || !user) {
        return (
            <div
                dir={direction}
                className="min-h-screen bg-slate-50"
            >
                <Header />

                <main className="flex min-h-[70vh] items-center justify-center px-5 py-16">
                    <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-10 text-center shadow-lg">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl font-bold text-red-600">
                            !
                        </div>

                        <h3 className="text-xl font-bold text-slate-800">
                            {t.dashboard.error}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-500">
                            {isPersian
                                ? "در بارگذاری داشبورد مشکلی به وجود آمد."
                                : "Something went wrong while loading your dashboard."}
                        </p>

                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Role-based Dashboard
    |--------------------------------------------------------------------------
    */

    let dashboardComponent: React.ReactNode;

    switch (user.role) {
        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */

        case "admin": {
            dashboardComponent = (
                <AdminDashboard
                    name={user.name}
                    stats={dashboard.stats}
                    orders={
                        Array.isArray(dashboard.orders)
                            ? dashboard.orders
                            : []
                    }
                    conversations={
                        Array.isArray(
                            dashboard.conversations
                        )
                            ? dashboard.conversations
                            : []
                    }
                />
            );

            break;
        }

        /*
        |--------------------------------------------------------------------------
        | CONTENT MANAGER
        |--------------------------------------------------------------------------
        */

        case "content_manager": {
            dashboardComponent = (
                <ContentManagerDashboard
                    name={user.name}
                    stats={dashboard.stats}
                    orders={
                        Array.isArray(dashboard.orders)
                            ? dashboard.orders
                            : []
                    }
                    conversations={
                        Array.isArray(dashboard.conversations)
                            ? dashboard.conversations
                            : []
                    }
                />
            );

            break;
        }

        /*
        |--------------------------------------------------------------------------
        | CUSTOMER
        |--------------------------------------------------------------------------
        */

        case "customer": {
            dashboardComponent = (
                <CustomerDashboard
                    name={user.name}
                    stats={dashboard.stats}
                    orders={
                        Array.isArray(dashboard.orders)
                            ? dashboard.orders
                            : []
                    }
                    conversations={
                        Array.isArray(
                            dashboard.conversations
                        )
                            ? dashboard.conversations
                            : []
                    }
                />
            );

            break;
        }

        /*
        |--------------------------------------------------------------------------
        | INVALID ROLE
        |--------------------------------------------------------------------------
        */

        default:
            dashboardComponent = (
                <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
                    <p className="font-semibold text-red-600">
                        {t.dashboard.invalidRole}
                    </p>
                </div>
            );

            break;
    }

    /*
    |--------------------------------------------------------------------------
    | Dashboard Shell
    |--------------------------------------------------------------------------
    */

    return (
        <div
            dir={direction}
            className="min-h-screen bg-slate-50"
        >
            <Header />

            <main>
                <DashboardShell
                    title={t.dashboard.home.title}
                    description={t.dashboard.home.subtitle}
                >
                    {dashboardComponent}
                </DashboardShell>
            </main>

            <Footer />
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Dashboard Page
|--------------------------------------------------------------------------
*/

export default function DashboardPage() {
    return (
        <AuthGuard>
            <DashboardContent />
        </AuthGuard>
    );
}
"use client";

import Link from "next/link";

import {
    Users,
    UserCog,
    FileText,
    MessageSquare,
    Settings,
    Package,
    Briefcase,
    Image,
    Bell,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

type DashboardRole =
    | "admin"
    | "content_manager"
    | "customer";

interface DashboardQuickActionsProps {
    role: DashboardRole;
}

export default function DashboardQuickActions({
    role,
}: DashboardQuickActionsProps) {

    const { t, language } =
        useLanguage();

    const isPersian = language === "fa";
       
    function getActions() {

        switch (role) {

            /*
            |--------------------------------------------------------------------------
            | ADMIN
            |--------------------------------------------------------------------------
            */

            case "admin":

                return [

                    {
                        title:
                            t.dashboard.home.actions.orders,

                        href:
                            "/dashboard/orders",

                        icon:
                            Package,
                    },

                    {
                        title:
                            t.dashboard.home.actions.messages,

                        href:
                            "/dashboard/messages",

                        icon:
                            MessageSquare,
                    },

                    {
                        title:
                            t.dashboard.home.actions.administrators,

                        href:
                            "/dashboard/admins",

                        icon:
                            UserCog,
                    },

                    {
                        title:
                            t.dashboard.home.actions.contentManagers,

                        href:
                            "/dashboard/content-managers",

                        icon:
                            Briefcase,
                    },

                    {
                        title:
                            t.dashboard.home.actions.customers,

                        href:
                            "/dashboard/customers",

                        icon:
                            Users,
                    },

                    {
                        title:
                            t.dashboard.home.actions.settings,

                        href:
                            "/dashboard/settings",

                        icon:
                            Settings,
                    },

                ];

            /*
            |--------------------------------------------------------------------------
            | CONTENT MANAGER
            |--------------------------------------------------------------------------
            */

            case "content_manager":

                return [

                    {
                        title:
                            t.dashboard.home.actions.orders,

                        href:
                            "/dashboard/orders",

                        icon:
                            Package,
                    },

                    {
                        title:
                            t.dashboard.home.actions.messages,

                        href:
                            "/dashboard/messages",

                        icon:
                            MessageSquare,
                    },

                    {
                        title:
                            t.dashboard.home.actions.services,

                        href:
                            "/dashboard/services",

                        icon:
                            Briefcase,
                    },

                    {
                        title:
                            t.dashboard.home.actions.portfolio,

                        href:
                            "/dashboard/portfolio",

                        icon:
                            Image,
                    },

                    {
                        title:
                            t.dashboard.home.actions.testimonials,

                        href:
                            "/dashboard/testimonials",

                        icon:
                            FileText,
                    },

                    {
                        title:
                            t.dashboard.home.actions.profile,

                        href:
                            "/dashboard/profile",

                        icon:
                            Settings,
                    },

                ];

            /*
            |--------------------------------------------------------------------------
            | CUSTOMER
            |--------------------------------------------------------------------------
            */

            case "customer":

                return [

                    {
                        title:
                            t.dashboard.home.actions.orders,

                        href:
                            "/dashboard/orders",

                        icon:
                            Package,
                    },

                    {
                        title:
                            t.dashboard.home.actions.messages,

                        href:
                            "/dashboard/messages",

                        icon:
                            MessageSquare,
                    },

                    {
                        title:
                            t.dashboard.home.actions.notifications,

                        href:
                            "/dashboard/notifications",

                        icon:
                            Bell,
                    },

                    {
                        title:
                            t.dashboard.home.actions.profile,

                        href:
                            "/dashboard/profile",

                        icon:
                            Settings,
                    },

                ];

            default:

                return [];

        }
    }

    const actions =
        getActions();

    return (

        <div
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm"
            dir={
                isPersian
                    ? "rtl"
                    : "ltr"
            }
        >

            {/* Header */}

            <div
                className="
                mb-6
                flex
                items-center
                justify-between"
            >

                <div>

                    <h2
                        className="
                        text-xl
                        font-bold
                        text-slate-900"
                    >
                        {
                            t.dashboard.home.quickActions
                        }
                    </h2>

                    <p
                        className="
                        mt-1
                        text-sm
                        text-slate-500"
                    >
                        {
                            t.dashboard.home.quickActionsDescription
                        }
                    </p>

                </div>

            </div>

            {/* Actions */}

            <div
                className="
                grid
                gap-4
                sm:grid-cols-2
                xl:grid-cols-3"
            >

                {actions.map(
                    (action) => {

                        const Icon =
                            action.icon;

                        return (

                            <Link
                                key={
                                    action.href
                                }
                                href={
                                    action.href
                                }
                                className="
                                group
                                rounded-2xl
                                border
                                border-slate-200
                                p-5
                                transition-all
                                duration-200
                                hover:-translate-y-1
                                hover:border-indigo-300
                                hover:bg-indigo-50
                                hover:shadow-md"
                            >

                                <div
                                    className="
                                    flex
                                    items-center
                                    justify-between"
                                >

                                    {/* Icon */}

                                    <div
                                        className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-indigo-100
                                        text-indigo-600
                                        transition-colors
                                        group-hover:bg-indigo-600
                                        group-hover:text-white"
                                    >

                                        <Icon
                                            className="
                                            h-6
                                            w-6"
                                        />

                                    </div>

                                    {/* Direction-aware Arrow */}

                                    {isPersian ? (

                                        <ArrowLeft
                                            className="
                                            h-5
                                            w-5
                                            text-slate-400
                                            transition-transform
                                            group-hover:-translate-x-1"
                                        />

                                    ) : (

                                        <ArrowRight
                                            className="
                                            h-5
                                            w-5
                                            text-slate-400
                                            transition-transform
                                            group-hover:translate-x-1"
                                        />

                                    )}

                                </div>

                                <h3
                                    className="
                                    mt-5
                                    text-lg
                                    font-semibold
                                    text-slate-900"
                                >
                                    {
                                        action.title
                                    }
                                </h3>

                            </Link>

                        );
                    }
                )}

            </div>

        </div>
    );
}
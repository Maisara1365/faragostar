"use client";

import {
    ShoppingCart,
    Users,
    MessageSquare,
    Bell,
    FolderOpen,
    Briefcase,
    Star,
    ClipboardList,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

export interface DashboardStat {

    label: string;

    value: number;

    icon: React.ElementType;

}

interface DashboardQuickStatsProps {

    role:
        | "admin"
        | "content_manager"
        | "customer";

    stats: {

        /*
        |--------------------------------------------------------------------------
        | Existing Frontend / Customer / Content Manager Statistics
        |--------------------------------------------------------------------------
        */

        totalOrders?: number;

        totalCustomers?: number;

        totalMessages?: number;

        totalNotifications?: number;

        totalPortfolio?: number;

        totalServices?: number;

        totalTestimonials?: number;

        activeOrders?: number;

        /*
        |--------------------------------------------------------------------------
        | Admin Backend Statistics
        |--------------------------------------------------------------------------
        */

        customers?: number;

        admins?: number;

        content_managers?: number;

        orders?: number;

        pending_orders?: number;

        in_progress_orders?: number;

        completed_orders?: number;

        delivered_orders?: number;

        cancelled_orders?: number;

        paid_orders?: number;

        total_revenue?: number;

        services?: number;

        packages?: number;

        portfolio?: number;

        team_members?: number;

        testimonials?: number;

        contact_messages?: number;

        unread_contact_messages?: number;

        open_conversations?: number;

        closed_conversations?: number;

    };

}

export default function DashboardQuickStats({

    role,

    stats,

}: DashboardQuickStatsProps) {

    const { t } =
        useLanguage();

    let cards: DashboardStat[] = [];

    /*
    |--------------------------------------------------------------------------
    | Administrator Dashboard
    |--------------------------------------------------------------------------
    */

    if (role === "admin") {

        cards = [

            {

                label:
                    t.dashboard.home.totalOrders,

                /*
                 * Backend:
                 * orders
                 */

                value:
                    stats.orders ?? 0,

                icon:
                    ShoppingCart,

            },

            {

                label:
                    t.dashboard.home.totalCustomers,

                /*
                 * Backend:
                 * customers
                 */

                value:
                    stats.customers ?? 0,

                icon:
                    Users,

            },

            {

                label:
                    t.dashboard.home.totalMessages,

                /*
                 * Backend:
                 * contact_messages
                 */

                value:
                    stats.contact_messages ?? 0,

                icon:
                    MessageSquare,

            },

            {

                label:
                    t.dashboard.home.notifications,

                /*
                 * Backend:
                 * unread_contact_messages
                 */

                value:
                    stats.unread_contact_messages ?? 0,

                icon:
                    Bell,

            },

        ];

    }

    /*
    |--------------------------------------------------------------------------
    | Content Manager Dashboard
    |--------------------------------------------------------------------------
    */

    else if (

        role ===
        "content_manager"

    ) {

        cards = [

            {

                label:
                    t.dashboard.home.activeOrders,

                value:
                    stats.activeOrders ?? 0,

                icon:
                    ClipboardList,

            },

            {

                label:
                    t.dashboard.home.portfolio,

                value:
                    stats.totalPortfolio ?? 0,

                icon:
                    FolderOpen,

            },

            {

                label:
                    t.dashboard.home.services,

                value:
                    stats.totalServices ?? 0,

                icon:
                    Briefcase,

            },

            {

                label:
                    t.dashboard.home.testimonials,

                value:
                    stats.totalTestimonials ?? 0,

                icon:
                    Star,

            },

        ];

    }

    /*
    |--------------------------------------------------------------------------
    | Customer Dashboard
    |--------------------------------------------------------------------------
    */

    else {

        cards = [

            {

                label:
                    t.dashboard.home.totalOrders,

                value:
                    stats.totalOrders ?? 0,

                icon:
                    ShoppingCart,

            },

            {

                label:
                    t.dashboard.home.activeOrders,

                value:
                    stats.activeOrders ?? 0,

                icon:
                    ClipboardList,

            },

            {

                label:
                    t.dashboard.home.totalMessages,

                value:
                    stats.totalMessages ?? 0,

                icon:
                    MessageSquare,

            },

            {

                label:
                    t.dashboard.home.notifications,

                value:
                    stats.totalNotifications ?? 0,

                icon:
                    Bell,

            },

        ];

    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-4"
        >

            {

                cards.map(

                    (

                        card

                    ) => {

                        const Icon =
                            card.icon;

                        return (

                            <div

                                key={
                                    card.label
                                }

                                className="
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                transition-all
                                hover:-translate-y-1
                                hover:shadow-lg"

                            >

                                <div
                                    className="
                                    flex
                                    items-center
                                    justify-between"
                                >

                                    <div>

                                        <p
                                            className="
                                            text-sm
                                            text-slate-500"
                                        >

                                            {

                                                card.label

                                            }

                                        </p>

                                        <h2
                                            className="
                                            mt-3
                                            text-3xl
                                            font-bold
                                            text-slate-900"
                                        >

                                            {

                                                card.value

                                            }

                                        </h2>

                                    </div>

                                    <div
                                        className="
                                        rounded-2xl
                                        bg-indigo-100
                                        p-4"
                                    >

                                        <Icon
                                            className="
                                            h-7
                                            w-7
                                            text-indigo-600"
                                        />

                                    </div>

                                </div>

                            </div>

                        );

                    }

                )

            }

        </div>

    );

}
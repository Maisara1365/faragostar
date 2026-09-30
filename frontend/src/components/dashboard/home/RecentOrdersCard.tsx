"use client";

import Link from "next/link";

import {
    ArrowRight,
    Package,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

export interface DashboardOrder {

    id: number;

    order_number: string;

    customer_name: string;

    service: string;

    status: string;

    created_at: string;

}

interface RecentOrdersCardProps {

    orders: DashboardOrder[];

}

export default function RecentOrdersCard({

    orders,

}: RecentOrdersCardProps) {

    const {

        t,

        language,

    } = useLanguage();

    return (

        <div
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm"
        >

            <div
                className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                p-6"
            >

                <div
                    className="
                    flex
                    items-center
                    gap-3"
                >

                    <div
                        className="
                        rounded-xl
                        bg-indigo-100
                        p-3"
                    >

                        <Package
                            className="
                            h-5
                            w-5
                            text-indigo-600"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                            text-lg
                            font-semibold
                            text-slate-900"
                        >

                            {t.dashboard.home.recentOrders}

                        </h2>

                        <p
                            className="
                            text-sm
                            text-slate-500"
                        >

                            {t.dashboard.home.recentOrdersDescription}

                        </p>

                    </div>

                </div>

                <Link
                    href="/dashboard/orders"
                    className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-indigo-600
                    hover:text-indigo-700"
                >

                    {t.dashboard.home.viewAll}

                    <ArrowRight
                        className={`
                            h-4
                            w-4
                            ${
                                language === "fa"

                                    ? "rotate-180"

                                    : ""

                            }
                        `}
                    />

                </Link>

            </div>

            {

                orders.length === 0

                    ? (

                        <div
                            className="
                            p-10
                            text-center
                            text-slate-500"
                        >

                            {t.dashboard.home.noRecentOrders}

                        </div>

                    )

                    : (

                        <div>

                            {

                                orders
                                    .slice(0, 5)
                                    .map(

                                        (

                                            order

                                        ) => (

                                            <div

                                                key={
                                                    order.id
                                                }

                                                className="
                                                flex
                                                items-center
                                                justify-between
                                                border-b
                                                border-slate-100
                                                p-5
                                                last:border-b-0"

                                            >

                                                <div>

                                                    <p
                                                        className="
                                                        font-semibold
                                                        text-slate-900"
                                                    >

                                                        #

                                                        {

                                                            order.order_number

                                                        }

                                                    </p>

                                                    <p
                                                        className="
                                                        text-sm
                                                        text-slate-500"
                                                    >

                                                        {

                                                            order.customer_name

                                                        }

                                                    </p>

                                                </div>

                                                <div
                                                    className="
                                                    text-center"
                                                >

                                                    <p
                                                        className="
                                                        text-sm
                                                        font-medium"
                                                    >

                                                        {

                                                            order.service

                                                        }

                                                    </p>

                                                    <p
                                                        className="
                                                        text-xs
                                                        text-slate-500"
                                                    >

                                                        {

                                                            order.created_at

                                                        }

                                                    </p>

                                                </div>

                                                <span
                                                    className="
                                                    rounded-full
                                                    bg-slate-100
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-medium"
                                                >

                                                    {

                                                        order.status

                                                    }

                                                </span>

                                            </div>

                                        )

                                    )

                            }

                        </div>

                    )

            }

        </div>

    );

}
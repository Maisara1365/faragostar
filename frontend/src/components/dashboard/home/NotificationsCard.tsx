"use client";

import Link from "next/link";

import {
    ArrowRight,
    Bell,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

export interface DashboardNotification {

    id: number;

    title: string;

    description: string;

    created_at: string;

    unread: boolean;

}

interface NotificationsCardProps {

    notifications:
        DashboardNotification[];

}

export default function NotificationsCard({

    notifications,

}: NotificationsCardProps) {

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
                        bg-amber-100
                        p-3"
                    >

                        <Bell
                            className="
                            h-5
                            w-5
                            text-amber-600"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                            text-lg
                            font-semibold
                            text-slate-900"
                        >

                            {t.dashboard.home.notifications}

                        </h2>

                        <p
                            className="
                            text-sm
                            text-slate-500"
                        >

                            {t.dashboard.home.notificationsDescription}

                        </p>

                    </div>

                </div>

                <Link
                    href="/dashboard/notifications"
                    className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-amber-600
                    hover:text-amber-700"
                >

                    {t.dashboard.home.viewAll}

                    <ArrowRight
                        className={`
                            h-4
                            w-4
                            ${language === "fa"
                                ? "rotate-180"
                                : ""}
                        `}
                    />

                </Link>

            </div>

            {

                notifications.length === 0

                    ? (

                        <div
                            className="
                            p-10
                            text-center
                            text-slate-500"
                        >

                            {t.dashboard.home.noNotifications}

                        </div>

                    )

                    : (

                        <div>

                            {

                                notifications
                                    .slice(0, 5)
                                    .map((notification) => (

                                        <div
                                            key={
                                                notification.id
                                            }
                                            className="
                                            flex
                                            items-start
                                            justify-between
                                            border-b
                                            border-slate-100
                                            p-5
                                            last:border-b-0"
                                        >

                                            <div
                                                className="
                                                flex-1"
                                            >

                                                <div
                                                    className="
                                                    flex
                                                    items-center
                                                    gap-2"
                                                >

                                                    <h3
                                                        className="
                                                        font-semibold
                                                        text-slate-900"
                                                    >

                                                        {
                                                            notification.title
                                                        }

                                                    </h3>

                                                    {

                                                        notification.unread && (

                                                            <span
                                                                className="
                                                                rounded-full
                                                                bg-red-500
                                                                px-2
                                                                py-0.5
                                                                text-[10px]
                                                                font-semibold
                                                                uppercase
                                                                text-white"
                                                            >

                                                                {t.dashboard.home.new}

                                                            </span>

                                                        )

                                                    }

                                                </div>

                                                <p
                                                    className="
                                                    mt-2
                                                    text-sm
                                                    text-slate-600"
                                                >

                                                    {
                                                        notification.description
                                                    }

                                                </p>

                                            </div>

                                            <span
                                                className="
                                                ml-4
                                                whitespace-nowrap
                                                text-xs
                                                text-slate-400"
                                            >

                                                {
                                                    notification.created_at
                                                }

                                            </span>

                                        </div>

                                    ))

                            }

                        </div>

                    )

            }

        </div>

    );

}
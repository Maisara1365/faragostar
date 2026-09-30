"use client";

import Link from "next/link";

import {
    ArrowRight,
    MessageSquare,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

export interface DashboardMessage {

    id: number;

    subject: string;

    sender: string;

    preview: string;

    created_at: string;

    unread: boolean;

}

interface RecentMessagesCardProps {

    messages: DashboardMessage[];

}

export default function RecentMessagesCard({

    messages,

}: RecentMessagesCardProps) {

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
                        bg-emerald-100
                        p-3"
                    >

                        <MessageSquare
                            className="
                            h-5
                            w-5
                            text-emerald-600"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                            text-lg
                            font-semibold
                            text-slate-900"
                        >

                            {t.dashboard.home.recentMessages}

                        </h2>

                        <p
                            className="
                            text-sm
                            text-slate-500"
                        >

                            {t.dashboard.home.recentMessagesDescription}

                        </p>

                    </div>

                </div>

                <Link
                    href="/dashboard/messages"
                    className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-emerald-600
                    hover:text-emerald-700"
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

                messages.length === 0

                    ? (

                        <div
                            className="
                            p-10
                            text-center
                            text-slate-500"
                        >

                            {t.dashboard.home.noRecentMessages}

                        </div>

                    )

                    : (

                        <div>

                            {

                                messages
                                    .slice(0, 5)
                                    .map((message) => (

                                        <div
                                            key={message.id}
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

                                                        {message.subject}

                                                    </h3>

                                                    {

                                                        message.unread && (

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
                                                    mt-1
                                                    text-sm
                                                    text-slate-500"
                                                >

                                                    {message.sender}

                                                </p>

                                                <p
                                                    className="
                                                    mt-2
                                                    line-clamp-2
                                                    text-sm
                                                    text-slate-600"
                                                >

                                                    {message.preview}

                                                </p>

                                            </div>

                                            <span
                                                className="
                                                ml-4
                                                whitespace-nowrap
                                                text-xs
                                                text-slate-400"
                                            >

                                                {message.created_at}

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
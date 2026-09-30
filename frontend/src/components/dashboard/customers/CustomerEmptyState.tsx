"use client";

import {
    Users,
    RefreshCw,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

interface CustomerEmptyStateProps {

    onRefresh: () => void;

}

export default function CustomerEmptyState({

    onRefresh,

}: CustomerEmptyStateProps) {

    const { t } =
        useLanguage();

    return (

        <div
            className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-8
            py-20
            text-center"
        >

            <div
                className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-indigo-100"
            >

                <Users
                    className="
                    h-10
                    w-10
                    text-indigo-600"
                />

            </div>

            <h2
                className="
                mt-6
                text-2xl
                font-bold
                text-slate-900"
            >
                {
                    t.dashboard
                        .customers
                        .empty_title
                }
            </h2>

            <p
                className="
                mt-3
                max-w-md
                text-slate-500"
            >
                {
                    t.dashboard
                        .customers
                        .empty_description
                }
            </p>

            <button
                type="button"
                onClick={onRefresh}
                className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-colors
                hover:bg-indigo-700"
            >

                <RefreshCw
                    className="
                    h-4
                    w-4"
                />

                {
                    t.dashboard
                        .customers
                        .refresh
                }

            </button>

        </div>

    );

}
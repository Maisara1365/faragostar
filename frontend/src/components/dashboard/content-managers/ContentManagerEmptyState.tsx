"use client";

import {
    Plus,
    Users,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

interface ContentManagerEmptyStateProps {

    onCreate: () => void;

}

export default function ContentManagerEmptyState({

    onCreate,

}: ContentManagerEmptyStateProps) {

    const { t } =
        useLanguage();

    return (

        <div
            className="
            rounded-3xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-8
            py-16
            text-center
            shadow-sm"
        >

            <div
                className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-indigo-50"
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
                {t.dashboard.contentManagers.empty_title}
            </h2>

            <p
                className="
                mx-auto
                mt-3
                max-w-xl
                text-slate-500"
            >
                {t.dashboard.contentManagers.empty_description}
            </p>

            <button
                type="button"
                onClick={onCreate}
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
                transition
                hover:bg-indigo-700"
            >

                <Plus
                    className="
                    h-5
                    w-5"
                />

                {t.dashboard.contentManagers.create}

            </button>

        </div>

    );

}
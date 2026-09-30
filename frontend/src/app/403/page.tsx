"use client";

import Link from "next/link";

import { ShieldX, ArrowLeft } from "lucide-react";

import { useLanguage } from "@/context/language-context";

export default function ForbiddenPage() {

    const {

        language,

    } = useLanguage();

    const isPersian =
        language === "fa";

    return (

        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-50
                via-white
                to-sky-50
                px-6
            "
        >

            <div
                className="
                    w-full
                    max-w-xl
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-10
                    text-center
                    shadow-2xl
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        bg-red-100
                    "
                >

                    <ShieldX
                        className="
                            h-12
                            w-12
                            text-red-600
                        "
                    />

                </div>

                <h1
                    className="
                        mt-8
                        text-5xl
                        font-extrabold
                        text-[#183B73]
                    "
                >

                    403

                </h1>

                <h2
                    className="
                        mt-4
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >

                    {

                        isPersian

                            ? "دسترسی غیرمجاز"

                            : "Access Forbidden"

                    }

                </h2>

                <p
                    className="
                        mt-5
                        text-slate-500
                        leading-8
                    "
                >

                    {

                        isPersian

                            ? "شما اجازه دسترسی به این صفحه را ندارید."

                            : "You do not have permission to access this page."

                    }

                </p>

                <Link

                    href="/dashboard"

                    className="
                        mt-10
                        inline-flex
                        items-center
                        gap-3
                        rounded-2xl
                        bg-[#183B73]
                        px-6
                        py-4
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#46A6D9]
                    "

                >

                    <ArrowLeft
                        className="h-5 w-5"
                    />

                    {

                        isPersian

                            ? "بازگشت به داشبورد"

                            : "Back to Dashboard"

                    }

                </Link>

            </div>

        </main>

    );

}
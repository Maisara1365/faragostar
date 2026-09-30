"use client";

import {
    CalendarDays,
    Sparkles,
    Crown,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

interface DashboardWelcomeProps {

    name: string;

    role:
        | "admin"
        | "content_manager"
        | "customer";

}

export default function DashboardWelcome({

    name,

    role,

}: DashboardWelcomeProps) {

    const { t } =
        useLanguage();

    const today =
        new Intl.DateTimeFormat(

            "en-US",

            {

                weekday: "long",

                year: "numeric",

                month: "long",

                day: "numeric",

            }

        ).format(new Date());

    return (

        <div
            className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-[#183B73]
            via-[#24579D]
            to-[#46A6D9]
            p-10
            pt-12
            pb-12
            text-white
            shadow-[0_20px_60px_rgba(24,59,115,0.3)]
            transition-all
            duration-300
            hover:shadow-[0_25px_80px_rgba(24,59,115,0.4)]
            hover:scale-[1.01]
            group
            mb-8"
        >

            {/* Background decorative elements */}
            <div
                className="
                absolute
                -top-32
                -right-32
                h-96
                w-96
                rounded-full
                bg-white/10
                blur-3xl
                transition-transform
                duration-700
                group-hover:scale-110"
            />

            <div
                className="
                absolute
                -bottom-32
                -left-32
                h-96
                w-96
                rounded-full
                bg-[#FFD700]/10
                blur-3xl
                transition-transform
                duration-700
                group-hover:scale-110"
            />

            {/* Decorative grid pattern */}
            <div
                className="
                absolute
                inset-0
                opacity-[0.06]
                bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
                bg-[size:55px_55px]
                pointer-events-none"
            />

            {/* Floating sparkle decorations */}
            <Sparkles
                className="
                absolute
                top-6
                right-6
                h-5
                w-5
                text-white/20
                transition-all
                duration-500
                group-hover:rotate-180
                group-hover:text-white/40"
            />

            <div
                className="
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-center
                lg:justify-between
                relative
                z-10"
            >

                <div>

                    <div
                        className="
                        flex
                        items-center
                        gap-3"
                    >

                        <div
                            className="
                            flex
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-[#FFD700]
                            animate-pulse"
                        />

                        <p
                            className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-white/80"
                        >

                            {

                                t.dashboard.home.welcomeBack

                            }

                        </p>

                        <div
                            className="
                            flex
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-[#FFD700]
                            animate-pulse"
                        />

                    </div>

                    <h1
                        className="
                        mt-4
                        text-4xl
                        font-extrabold
                        tracking-tight
                        bg-gradient-to-r
                        from-white
                        via-[#FFD700]
                        to-white
                        bg-clip-text
                        text-transparent
                        bg-[length:200%_100%]
                        animate-[gradientShift_4s_ease-in-out_infinite]"
                    >

                        {name}

                        <span
                            className="
                            inline-block
                            ml-3
                            text-3xl
                            text-[#FFD700]"
                        >
                            {role === "admin" && "👋"}
                            {role === "content_manager" && "✨"}
                            {role === "customer" && "🌟"}
                        </span>

                    </h1>

                    <div
                        className="
                        mt-2
                        flex
                        items-center
                        gap-2.5"
                    >

                        {role === "admin" && (
                            <Crown
                                className="
                                h-4
                                w-4
                                text-[#FFD700]
                                animate-pulse"
                            />
                        )}

                        <p
                            className="
                            text-sm
                            font-medium
                            text-white/80
                            max-w-xl
                            leading-relaxed"
                        >

                            {

                                role === "admin"

                                    ? t.dashboard.home.adminGreeting

                                    : role ===
                                        "content_manager"

                                        ? t.dashboard.home.contentManagerGreeting

                                        : t.dashboard.home.customerGreeting

                            }

                        </p>

                    </div>

                </div>

                <div
                    className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    bg-white/10
                    backdrop-blur-lg
                    border
                    border-white/20
                    px-6
                    py-5
                    shadow-lg
                    transition-all
                    duration-300
                    hover:bg-white/20
                    hover:scale-105
                    hover:border-white/30
                    min-w-[200px]"
                >

                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/20
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:bg-white/30
                        shrink-0"
                    >

                        <CalendarDays
                            className="
                            h-5
                            w-5
                            text-white"
                        />

                    </div>

                    <div>

                        <p
                            className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-white/60
                            mb-1"
                        >

                            {

                                t.dashboard.home.today

                            }

                        </p>

                        <p
                            className="
                            text-sm
                            font-semibold
                            text-white
                            tracking-wide
                            leading-tight"
                        >

                            {today}

                        </p>

                    </div>

                </div>

            </div>

            {/* Bottom accent bar */}
            <div
                className="
                absolute
                bottom-0
                left-0
                right-0
                h-1
                bg-gradient-to-r
                from-[#FFD700]
                via-white
                to-[#FFD700]
                opacity-70
                scale-x-0
                group-hover:scale-x-100
                transition-transform
                duration-700
                origin-left"
            />

        </div>

    );

}
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardStatCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    color?: string;
    subtitle?: string;
}

export default function DashboardStatCard({
    title,
    value,
    icon,
    color = "#183B73",
    subtitle,
}: DashboardStatCardProps) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02,
            }}
            transition={{
                duration: 0.25,
            }}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                hover:shadow-xl
            "
        >
            <div
                className="
                    absolute
                    -right-10
                    -top-10
                    h-32
                    w-32
                    rounded-full
                    opacity-10
                    blur-2xl
                "
                style={{
                    background: color,
                }}
            />

            <div
                className="
                    relative
                    flex
                    items-start
                    justify-between
                "
            >
                <div>
                    <p
                        className="
                            text-sm
                            font-medium
                            text-slate-500
                        "
                    >
                        {title}
                    </p>
                    <h2
                        className="
                            mt-3
                            text-4xl
                            font-bold
                            text-slate-900
                        "
                    >
                        {value}
                    </h2>
                    {subtitle && (
                        <p
                            className="
                                mt-3
                                text-sm
                                text-slate-400
                            "
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        text-white
                        shadow-lg
                    "
                    style={{
                        background: color,
                    }}
                >
                    {icon}
                </div>
            </div>
        </motion.div>
    );
}
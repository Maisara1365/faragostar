"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

interface DashboardEmptyStateProps {
    icon: ReactNode;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
}

export default function DashboardEmptyState({
    icon,
    title,
    description,
    buttonText,
    buttonHref,
}: DashboardEmptyStateProps) {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                px-8
                py-14
                text-center
                shadow-sm
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
                    bg-[#183B73]/10
                    text-[#183B73]
                "
            >
                {icon}
            </div>

            <h2
                className="
                    mt-8
                    text-2xl
                    font-bold
                    text-slate-900
                "
            >
                {title ?? t.dashboard.emptyState.title}
            </h2>

            <p
                className="
                    mx-auto
                    mt-4
                    max-w-lg
                    leading-8
                    text-slate-500
                "
            >
                {description ?? t.dashboard.emptyState.description}
            </p>

            {buttonHref && (
                <div className="mt-10">
                    <Button href={buttonHref}>
                        {buttonText ?? t.dashboard.emptyState.button}
                    </Button>
                </div>
            )}
        </motion.div>
    );
}
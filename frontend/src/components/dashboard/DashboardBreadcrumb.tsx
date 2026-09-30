"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface DashboardBreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function DashboardBreadcrumb({
    items,
}: DashboardBreadcrumbProps) {
    const { t, language } = useLanguage();
    
    const isRTL = language === "fa";

    return (
        <nav
            aria-label="breadcrumb"
            className="mb-6"
        >
            <ol
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    text-sm
                    text-slate-500
                "
            >
                <li>
                    <Link
                        href="/dashboard"
                        className="
                            font-medium
                            text-[#183B73]
                            transition
                            hover:text-[#46A6D9]
                        "
                    >
                        {t.dashboard.breadcrumb.home}
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2"
                    >
                        <ChevronRight
                            className={`
                                h-4
                                w-4
                                text-slate-400
                                ${isRTL ? "rotate-180" : ""}
                            `}
                        />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="transition hover:text-[#183B73]"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="font-semibold text-slate-900"
                            >
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
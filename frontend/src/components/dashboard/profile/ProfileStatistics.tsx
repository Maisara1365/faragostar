"use client";

import StatisticsCard from "./StatisticsCard";

import type {
    ProfileStatistics as ProfileStatisticsType,
} from "@/types/profile";

import { useLanguage } from "@/context/language-context";

interface ProfileStatisticsProps {
    statistics: ProfileStatisticsType;
}

export default function ProfileStatistics({
    statistics,
}: ProfileStatisticsProps) {

    const { t } = useLanguage();

    /*
    |--------------------------------------------------------------------------
    | Format Numbers According To Current Language
    |--------------------------------------------------------------------------
    */

    function formatNumber(
        value: number
    ): string {

        const language =
            document.documentElement.lang ||
            "en";

        return new Intl.NumberFormat(
            language === "fa"
                ? "fa-IR"
                : "en-US"
        ).format(value);
    }

    return (

        <section
            className="
                space-y-6
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                sm:p-8
            "
        >

            {/* Header */}

            <div>

                <h2
                    className="
                        text-xl
                        font-bold
                        text-slate-900
                        sm:text-2xl
                    "
                >
                    {t.dashboard.profile.statistics}
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    {
                        t.dashboard.profile
                            .statistics_description
                    }
                </p>

            </div>

            {/* Statistics */}

            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                <StatisticsCard
                    title={
                        t.dashboard.profile
                            .total_orders
                    }
                    value={
                        formatNumber(
                            statistics.total_orders
                        )
                    }
                />

                <StatisticsCard
                    title={
                        t.dashboard.profile
                            .completed_orders
                    }
                    value={
                        formatNumber(
                            statistics.completed_orders
                        )
                    }
                />

                <StatisticsCard
                    title={
                        t.dashboard.profile
                            .pending_orders
                    }
                    value={
                        formatNumber(
                            statistics.pending_orders
                        )
                    }
                />

                <StatisticsCard
                    title={
                        t.dashboard.profile
                            .open_conversations
                    }
                    value={
                        formatNumber(
                            statistics.open_conversations
                        )
                    }
                />

            </div>

        </section>

    );

}
import StatisticsCard from
    "@/components/dashboard/profile/StatisticsCard";

import type {
    AdminDashboardStatistics,
} from "@/types/admin";

import {
    useLanguage,
} from "@/context/language-context";

interface AdminStatisticsProps {

    statistics: AdminDashboardStatistics;

}

export default function AdminStatistics({

    statistics,

}: AdminStatisticsProps) {

    const { t } =
        useLanguage();

    return (

        <div
            className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4"
        >

            <StatisticsCard
                title={
                    t.dashboard.admins.total_admins
                }
                value={
                    statistics.total
                }
            />

            <StatisticsCard
                title={
                    t.dashboard.admins.active_admins
                }
                value={
                    statistics.active
                }
            />

            <StatisticsCard
                title={
                    t.dashboard.admins.blocked_admins
                }
                value={
                    statistics.blocked
                }
            />

            <StatisticsCard
                title={
                    t.dashboard.admins.verified_admins
                }
                value={
                    statistics.verified
                }
            />

        </div>

    );

}
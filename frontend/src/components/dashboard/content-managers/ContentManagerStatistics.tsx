import {
    Users,
    UserCheck,
    UserX,
    BadgeCheck,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

import type {
    ContentManagerDashboardStatistics,
} from "@/types/content-manager";

interface ContentManagerStatisticsProps {

    statistics:
        ContentManagerDashboardStatistics;

}

export default function ContentManagerStatistics({

    statistics,

}: ContentManagerStatisticsProps) {

    const { t } =
        useLanguage();

    const cards = [

        {

            title:
                t.dashboard.contentManagers.total,

            value:
                statistics.total,

            icon:
                Users,

            color:
                "bg-blue-100 text-blue-600",

        },

        {

            title:
                t.dashboard.contentManagers.active,

            value:
                statistics.active,

            icon:
                UserCheck,

            color:
                "bg-emerald-100 text-emerald-600",

        },

        {

            title:
                t.dashboard.contentManagers.blocked,

            value:
                statistics.blocked,

            icon:
                UserX,

            color:
                "bg-red-100 text-red-600",

        },

        {

            title:
                t.dashboard.contentManagers.verified,

            value:
                statistics.verified,

            icon:
                BadgeCheck,

            color:
                "bg-indigo-100 text-indigo-600",

        },

    ];

    return (

        <div
            className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4"
        >

            {

                cards.map((card) => {

                    const Icon =
                        card.icon;

                    return (

                        <div
                            key={card.title}
                            className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-sm"
                        >

                            <div
                                className="
                                flex
                                items-center
                                justify-between"
                            >

                                <div>

                                    <p
                                        className="
                                        text-sm
                                        text-slate-500"
                                    >
                                        {card.title}
                                    </p>

                                    <h3
                                        className="
                                        mt-2
                                        text-3xl
                                        font-bold"
                                    >
                                        {card.value}
                                    </h3>

                                </div>

                                <div
                                    className={`
                                    rounded-2xl
                                    p-3
                                    ${card.color}
                                    `}
                                >

                                    <Icon
                                        className="
                                        h-7
                                        w-7"
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}
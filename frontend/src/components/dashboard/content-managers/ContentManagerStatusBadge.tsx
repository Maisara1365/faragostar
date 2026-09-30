import {
    useLanguage,
} from "@/context/language-context";

interface ContentManagerStatusBadgeProps {

    status:
        "active"
        | "blocked";

}

export default function ContentManagerStatusBadge({

    status,

}: ContentManagerStatusBadgeProps) {

    const { t } =
        useLanguage();

    const active =
        status ===
        "active";

    return (

        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                    active

                        ? "bg-emerald-100 text-emerald-700"

                        : "bg-red-100 text-red-700"
                }
            `}
        >

            {

                active

                    ? t.dashboard.contentManagers.active

                    : t.dashboard.contentManagers.blocked

            }

        </span>

    );

}
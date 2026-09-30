import {
    useLanguage,
} from "@/context/language-context";

interface AdminStatusBadgeProps {

    status: string;

}

export default function AdminStatusBadge({

    status,

}: AdminStatusBadgeProps) {

    const { t } =
        useLanguage();

    const active =
        status === "active";

    return (

        <span
            className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold

                ${
                    active

                        ? `
                        bg-green-100
                        text-green-700`

                        : `
                        bg-red-100
                        text-red-700`
                }
            `}
        >

            {

                active

                    ? t.dashboard.admins.active

                    : t.dashboard.admins.blocked

            }

        </span>

    );

}
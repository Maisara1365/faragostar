import {
    useLanguage,
} from "@/context/language-context";

interface ContentManagerFiltersProps {

    search: string;

    status: string;

    language: string;

    verified: string;

    onSearchChange: (
        value: string
    ) => void;

    onStatusChange: (
        value: string
    ) => void;

    onLanguageChange: (
        value: string
    ) => void;

    onVerifiedChange: (
        value: string
    ) => void;

}

export default function ContentManagerFilters({

    search,

    status,

    language,

    verified,

    onSearchChange,

    onStatusChange,

    onLanguageChange,

    onVerifiedChange,

}: ContentManagerFiltersProps) {

    const { t } =
        useLanguage();

    return (

        <div
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
                grid
                gap-4
                lg:grid-cols-4"
            >

                <input
                    type="text"
                    value={search}
                    placeholder={
                        t.dashboard.contentManagers.search
                    }
                    onChange={(event) =>
                        onSearchChange(
                            event.target.value
                        )
                    }
                    className="
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500"
                />

                <select
                    value={status}
                    onChange={(event) =>
                        onStatusChange(
                            event.target.value
                        )
                    }
                    className="
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3"
                >

                    <option value="">
                        {t.dashboard.contentManagers.all}
                    </option>

                    <option value="active">
                        {t.dashboard.contentManagers.active}
                    </option>

                    <option value="blocked">
                        {t.dashboard.contentManagers.blocked}
                    </option>

                </select>

                <select
                    value={language}
                    onChange={(event) =>
                        onLanguageChange(
                            event.target.value
                        )
                    }
                    className="
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3"
                >

                    <option value="">
                        {t.dashboard.contentManagers.all}
                    </option>

                    <option value="fa">
                        فارسی
                    </option>

                    <option value="en">
                        English
                    </option>

                </select>

                <select
                    value={verified}
                    onChange={(event) =>
                        onVerifiedChange(
                            event.target.value
                        )
                    }
                    className="
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3"
                >

                    <option value="">
                        {t.dashboard.contentManagers.all}
                    </option>

                    <option value="true">
                        {t.dashboard.contentManagers.yes}
                    </option>

                    <option value="false">
                        {t.dashboard.contentManagers.no}
                    </option>

                </select>

            </div>

        </div>

    );

}
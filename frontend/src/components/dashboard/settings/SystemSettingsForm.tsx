import {
    useEffect,
    useState,
} from "react";

import {
    updateSettings,
} from "@/services/setting";

import type {
    SettingResponse,
} from "@/types/setting";

import {
    useLanguage,
} from "@/context/language-context";

interface SystemSettingsFormProps {

    settings: SettingResponse;

    onUpdated?: () => void;

}

export default function SystemSettingsForm({

    settings,

    onUpdated,

}: SystemSettingsFormProps) {

    const { t } = useLanguage();

    const [
        defaultLanguage,
        setDefaultLanguage,
    ] = useState<"fa" | "en">("fa");

    const [
        copyright,
        setCopyright,
    ] = useState("");

    const [
        saving,
        setSaving,
    ] = useState(false);

    useEffect(() => {

        setDefaultLanguage(
            settings.default_language
        );

        setCopyright(
            settings.copyright ?? ""
        );

    }, [settings]);

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateSettings({

                default_language:
                    defaultLanguage,

                copyright,

            });

            alert(
                t.dashboard.settings.update_success
            );

            onUpdated?.();

        } catch (error) {

            console.error(error);

            alert(
                t.dashboard.settings.update_failed
            );

        } finally {

            setSaving(false);

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
            space-y-6"
        >

            <div>

                <h2
                    className="
                    text-xl
                    font-semibold
                    text-slate-900"
                >
                    {t.dashboard.settings.system_title}
                </h2>

                <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500"
                >
                    {t.dashboard.settings.system_description}
                </p>

            </div>

            <div>

                <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-medium"
                >
                    {t.dashboard.settings.default_language}
                </label>

                <select
                    value={defaultLanguage}
                    onChange={(event) =>
                        setDefaultLanguage(
                            event.target.value as "fa" | "en"
                        )
                    }
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500"
                >

                    <option value="fa">

                        فارسی

                    </option>

                    <option value="en">

                        English

                    </option>

                </select>

            </div>

            <div>

                <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-medium"
                >
                    {t.dashboard.settings.copyright}
                </label>

                <input
                    type="text"
                    value={copyright}
                    onChange={(event) =>
                        setCopyright(
                            event.target.value
                        )
                    }
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500"
                />

            </div>

            <button
                type="submit"
                disabled={saving}
                className="
                rounded-xl
                bg-indigo-600
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-indigo-700
                disabled:cursor-not-allowed
                disabled:opacity-50"
            >

                {

                    saving

                        ? t.common.loading

                        : t.dashboard.settings.save_changes

                }

            </button>

        </form>

    );

}
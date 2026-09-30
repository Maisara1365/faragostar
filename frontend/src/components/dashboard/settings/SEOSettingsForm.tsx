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

interface SEOSettingsFormProps {

    settings: SettingResponse;

    onUpdated?: () => void;

}

export default function SEOSettingsForm({

    settings,

    onUpdated,

}: SEOSettingsFormProps) {

    const { t } = useLanguage();

    const [
        metaTitle,
        setMetaTitle,
    ] = useState("");

    const [
        metaDescription,
        setMetaDescription,
    ] = useState("");

    const [
        metaKeywords,
        setMetaKeywords,
    ] =useState("");

    const [
        saving,
        setSaving,
    ] = useState(false);

    useEffect(() => {

        setMetaTitle(
            settings.meta_title ?? ""
        );

        setMetaDescription(
            settings.meta_description ?? ""
        );

        setMetaKeywords(
            settings.meta_keywords ?? ""
        );

    }, [settings]);

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateSettings({

                meta_title:
                    metaTitle,

                meta_description:
                    metaDescription,

                meta_keywords:
                    metaKeywords,

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
                    {t.dashboard.settings.seo_title}
                </h2>

                <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500"
                >
                    {t.dashboard.settings.seo_description}
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
                    {t.dashboard.settings.meta_title}
                </label>

                <input
                    type="text"
                    value={metaTitle}
                    onChange={(event) =>
                        setMetaTitle(
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

            <div>

                <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-medium"
                >
                    {t.dashboard.settings.meta_description}
                </label>

                <textarea
                    rows={4}
                    value={metaDescription}
                    onChange={(event) =>
                        setMetaDescription(
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

            <div>

                <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-medium"
                >
                    {t.dashboard.settings.meta_keywords}
                </label>

                <textarea
                    rows={3}
                    value={metaKeywords}
                    onChange={(event) =>
                        setMetaKeywords(
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
import { useEffect, useState } from "react";

import { useLanguage } from "@/context/language-context";

import {
    updateSettings,
} from "@/services/setting";

import type {
    Setting,
} from "@/types/setting";

interface WebsiteSettingsFormProps {
    setting: Setting;
    onUpdated?: () => void;
}

export default function WebsiteSettingsForm({
    setting,
    onUpdated,
}: WebsiteSettingsFormProps) {
    const { t } = useLanguage();

    const [googleMap, setGoogleMap] =
        useState("");

    const [workingHours, setWorkingHours] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {

        setGoogleMap(
            setting.google_map ?? ""
        );

        setWorkingHours(
            setting.working_hours ?? ""
        );

    }, [setting]);

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateSettings({

                google_map: googleMap,

                working_hours: workingHours,

            });

            onUpdated?.();

            alert(
                t.dashboard.settings.updated_successfully
            );

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
                    {t.dashboard.settings.website}
                </h2>

                <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500"
                >
                    {t.dashboard.settings.website_description}
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
                    {t.dashboard.settings.google_map}
                </label>

                <input
                    type="url"
                    value={googleMap}
                    onChange={(e) =>
                        setGoogleMap(
                            e.target.value
                        )
                    }
                    placeholder="https://maps.google.com/..."
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
                    {t.dashboard.settings.working_hours}
                </label>

                <textarea
                    rows={5}
                    value={workingHours}
                    onChange={(e) =>
                        setWorkingHours(
                            e.target.value
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

                        ? t.dashboard.settings.saving

                        : t.dashboard.settings.save_changes

                }

            </button>

        </form>

    );

}
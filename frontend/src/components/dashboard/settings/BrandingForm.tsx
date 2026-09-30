import { useEffect, useState } from "react";

import {
    updateSettings,
    deleteLogo,
    deleteFavicon,
} from "@/services/setting";

import { useLanguage } from "@/context/language-context";

import type {
    Setting,
} from "@/types/setting";

interface BrandingFormProps {

    setting: Setting;

    onUpdated?: () => void;

}

export default function BrandingForm({

    setting,

    onUpdated,

}: BrandingFormProps) {

    const { t } = useLanguage();

    const [logo, setLogo] =
        useState<File | null>(null);

    const [favicon, setFavicon] =
        useState<File | null>(null);

    const [logoPreview, setLogoPreview] =
        useState<string | null>(null);

    const [faviconPreview, setFaviconPreview] =
        useState<string | null>(null);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {

        setLogoPreview(
            setting.logo ?? null
        );

        setFaviconPreview(
            setting.favicon ?? null
        );

    }, [setting]);

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateSettings({

                logo:
                    logo ?? undefined,

                favicon:
                    favicon ?? undefined,

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

    async function handleDeleteLogo() {

        if (
            !confirm(
                t.dashboard.settings.delete_logo
            )
        ) {
            return;
        }

        await deleteLogo();

        setLogoPreview(null);

    }

    async function handleDeleteFavicon() {

        if (
            !confirm(
                t.dashboard.settings.delete_favicon
            )
        ) {
            return;
        }

        await deleteFavicon();

        setFaviconPreview(null);

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
            space-y-8"
        >

            <div>

                <h2
                    className="
                    text-xl
                    font-semibold
                    text-slate-900"
                >
                    {t.dashboard.settings.branding}
                </h2>

            </div>

            <div
                className="
                grid
                gap-8
                md:grid-cols-2"
            >

                {/* Logo */}

                <div
                    className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-6"
                >

                    <h3
                        className="
                        mb-4
                        font-semibold"
                    >
                        {t.dashboard.settings.logo}
                    </h3>

                    {logoPreview && (

                        <img
                            src={logoPreview}
                            alt="Logo"
                            className="
                            mb-4
                            h-24
                            rounded-lg
                            object-contain"
                        />

                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {

                            const file =
                                e.target.files?.[0];

                            if (!file) return;

                            setLogo(file);

                            setLogoPreview(
                                URL.createObjectURL(file)
                            );

                        }}
                    />

                    {logoPreview && (

                        <button
                            type="button"
                            onClick={
                                handleDeleteLogo
                            }
                            className="
                            mt-4
                            text-red-600
                            hover:underline"
                        >
                            {t.dashboard.settings.delete_logo}
                        </button>

                    )}

                </div>

                {/* Favicon */}

                <div
                    className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-6"
                >

                    <h3
                        className="
                        mb-4
                        font-semibold"
                    >
                        {t.dashboard.settings.favicon}
                    </h3>

                    {faviconPreview && (

                        <img
                            src={faviconPreview}
                            alt="Favicon"
                            className="
                            mb-4
                            h-16
                            w-16
                            rounded-lg
                            object-contain"
                        />

                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {

                            const file =
                                e.target.files?.[0];

                            if (!file) return;

                            setFavicon(file);

                            setFaviconPreview(
                                URL.createObjectURL(file)
                            );

                        }}
                    />

                    {faviconPreview && (

                        <button
                            type="button"
                            onClick={
                                handleDeleteFavicon
                            }
                            className="
                            mt-4
                            text-red-600
                            hover:underline"
                        >
                            {t.dashboard.settings.delete_favicon}
                        </button>

                    )}

                </div>

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
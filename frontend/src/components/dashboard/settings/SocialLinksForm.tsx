import { useEffect, useState } from "react";

import { useLanguage } from "@/context/language-context";

import {
    updateSettings,
} from "@/services/setting";

import type {
    Setting,
} from "@/types/setting";

interface SocialLinksFormProps {
    setting: Setting;
    onUpdated?: () => void;
}

export default function SocialLinksForm({
    setting,
    onUpdated,
}: SocialLinksFormProps) {
    const { t } = useLanguage();

    const [facebook, setFacebook] =
        useState("");

    const [instagram, setInstagram] =
        useState("");

    const [linkedin, setLinkedin] =
        useState("");

    const [twitter, setTwitter] =
        useState("");

    const [whatsapp, setWhatsapp] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {
        setFacebook(
            setting.facebook ?? ""
        );

        setInstagram(
            setting.instagram ?? ""
        );

        setLinkedin(
            setting.linkedin ?? ""
        );

        setTwitter(
            setting.twitter ?? ""
        );

        setWhatsapp(
            setting.whatsapp ?? ""
        );
    }, [setting]);

    async function handleSubmit(
        event: React.FormEvent
    ) {
        event.preventDefault();

        try {
            setSaving(true);

            await updateSettings({
                facebook,
                instagram,
                linkedin,
                twitter,
                whatsapp,
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
                    {t.dashboard.settings.social_media}
                </h2>

                <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500"
                >
                    {t.dashboard.settings.social_media_description}
                </p>
            </div>

            <div
                className="
                grid
                gap-6
                md:grid-cols-2"
            >
                <div>
                    <label
                        className="
                        mb-2
                        block
                        text-sm
                        font-medium"
                    >
                        Facebook
                    </label>

                    <input
                        type="url"
                        value={facebook}
                        onChange={(e) =>
                            setFacebook(
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
                        focus:border-indigo-500
                        outline-none"
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
                        Instagram
                    </label>

                    <input
                        type="url"
                        value={instagram}
                        onChange={(e) =>
                            setInstagram(
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
                        focus:border-indigo-500
                        outline-none"
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
                        LinkedIn
                    </label>

                    <input
                        type="url"
                        value={linkedin}
                        onChange={(e) =>
                            setLinkedin(
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
                        focus:border-indigo-500
                        outline-none"
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
                        X (Twitter)
                    </label>

                    <input
                        type="url"
                        value={twitter}
                        onChange={(e) =>
                            setTwitter(
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
                        focus:border-indigo-500
                        outline-none"
                    />
                </div>
            </div>

            <div>
                <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-medium"
                >
                    WhatsApp
                </label>

                <input
                    value={whatsapp}
                    onChange={(e) =>
                        setWhatsapp(
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
                    focus:border-indigo-500
                    outline-none"
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
import { useEffect, useState } from "react";

import { useLanguage } from "@/context/language-context";

import {
    updateSettings,
} from "@/services/setting";

import type {
    Setting,
} from "@/types/setting";

interface CompanyInformationFormProps {
    setting: Setting;
    onUpdated?: () => void;
}

export default function CompanyInformationForm({
    setting,
    onUpdated,
}: CompanyInformationFormProps) {
    const { t } = useLanguage();

    const [companyName, setCompanyName] =
        useState("");

    const [companyEmail, setCompanyEmail] =
        useState("");

    const [companyPhone, setCompanyPhone] =
        useState("");

    const [companyAddress, setCompanyAddress] =
        useState("");

    const [aboutCompany, setAboutCompany] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {
        setCompanyName(
            setting.company_name
        );

        setCompanyEmail(
            setting.company_email
        );

        setCompanyPhone(
            setting.company_phone ?? ""
        );

        setCompanyAddress(
            setting.company_address ?? ""
        );

        setAboutCompany(
            setting.about_company ?? ""
        );

    }, [setting]);

    async function handleSubmit(
        event: React.FormEvent
    ) {
        event.preventDefault();

        try {
            setSaving(true);

            await updateSettings({
                company_name:
                    companyName,

                company_email:
                    companyEmail,

                company_phone:
                    companyPhone,

                company_address:
                    companyAddress,

                about_company:
                    aboutCompany,
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
                    {
                        t.dashboard.settings.company_information
                    }
                </h2>

                <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500"
                >
                    {
                        t.dashboard.settings.subtitle
                    }
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
                        {
                            t.dashboard.settings.company_name
                        }
                    </label>

                    <input
                        value={companyName}
                        onChange={(e) =>
                            setCompanyName(
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

                <div>
                    <label
                        className="
                        mb-2
                        block
                        text-sm
                        font-medium"
                    >
                        {
                            t.dashboard.settings.company_email
                        }
                    </label>

                    <input
                        type="email"
                        value={companyEmail}
                        onChange={(e) =>
                            setCompanyEmail(
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

                <div>
                    <label
                        className="
                        mb-2
                        block
                        text-sm
                        font-medium"
                    >
                        {
                            t.dashboard.settings.company_phone
                        }
                    </label>

                    <input
                        value={companyPhone}
                        onChange={(e) =>
                            setCompanyPhone(
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

                <div>
                    <label
                        className="
                        mb-2
                        block
                        text-sm
                        font-medium"
                    >
                        {
                            t.dashboard.settings.company_address
                        }
                    </label>

                    <input
                        value={companyAddress}
                        onChange={(e) =>
                            setCompanyAddress(
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
            </div>

            <div>
                <label
                    className="
                    mb-2
                    block
                    text-sm
                    font-medium"
                >
                    {
                        t.dashboard.settings.about_company
                    }
                </label>

                <textarea
                    rows={6}
                    value={aboutCompany}
                    onChange={(e) =>
                        setAboutCompany(
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
                    resize-none
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
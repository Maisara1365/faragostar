"use client";

import {
    useEffect,
    useState,
} from "react";

import { useLanguage } from "@/context/language-context";

import {
    updateProfile,
} from "@/services/profile";

import type {
    ProfileUser,
} from "@/types/profile";

interface EditProfileFormProps {

    user: ProfileUser;

    formRef?: React.RefObject<HTMLFormElement | null>;

    onUpdated?: () => void;

    /*
    |--------------------------------------------------------------------------
    | Optional callback
    |--------------------------------------------------------------------------
    |
    | The parent ProfilePage can use this to keep the latest values.
    | This will allow the final "Save All Changes" button to coordinate
    | all profile changes.
    |
    */

    onValuesChange?: (values: {
        name: string;
        phone: string | null;
        language: string;
    }) => void;

}

export default function EditProfileForm({

    user,

    formRef,

    onUpdated,

    onValuesChange,

}: EditProfileFormProps) {

    const { t } = useLanguage();

    const [name, setName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [language, setLanguage] =
        useState<"en" | "fa">("fa");

    const [saving, setSaving] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Detect current direction
    |--------------------------------------------------------------------------
    */

    const isPersian =
        language === "fa";

    /*
    |--------------------------------------------------------------------------
    | Initialize form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        setName(
            user.name ?? ""
        );

        setPhone(
            user.phone ?? ""
        );

        setLanguage(
            user.language === "en" ? "en" : "fa"
        );

    }, [user]);

    /*
    |--------------------------------------------------------------------------
    | Notify parent whenever values change
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!language) {
            return;
        }

        if (onValuesChange) {

            onValuesChange({

                name,

                phone:
                    phone.trim()
                        ? phone.trim()
                        : null,

                language,

            });

        }

    }, [
        name,
        phone,
        language,
        onValuesChange,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateProfile(
                user.role as
                    | "admin"
                    | "content_manager"
                    | "customer",
                {
                    name: name.trim(),

                    phone:
                        phone.trim()
                            ? phone.trim()
                            : null,

                    language,
                }
            );

            if (onUpdated) {

                onUpdated();

            }

        } catch (error) {

            console.error(
                "Failed to update profile:",
                error
            );

            throw error;

        } finally {

            setSaving(false);

        }

    }

    return (

        <form
            ref={formRef}
            onSubmit={handleSubmit}
            dir={
                isPersian
                    ? "rtl"
                    : "ltr"
            }
            className="profile-edit-form"
        >

            {/* ============================================================ */}
            {/* HEADER */}
            {/* ============================================================ */}

            <div className="profile-section-header">

                <div className="profile-section-icon">

                    <span>
                        ✦
                    </span>

                </div>

                <div>

                    <h2 className="profile-section-title">

                        {
                            t.dashboard.profile
                                .personal_information
                        }

                    </h2>

                    <p className="profile-section-description">

                        {
                            t.dashboard.profile
                                .subtitle
                        }

                    </p>

                </div>

            </div>

            {/* ============================================================ */}
            {/* FORM CONTENT */}
            {/* ============================================================ */}

            <div className="profile-fields">

                {/* ======================================================== */}
                {/* FULL NAME */}
                {/* ======================================================== */}

                <div className="profile-field">

                    <label
                        htmlFor="profile-name"
                        className="profile-label"
                    >

                        {t.auth.fullName}

                    </label>

                    <div className="profile-input-wrapper">

                        <span
                            className="profile-input-icon"
                            aria-hidden="true"
                        >
                            👤
                        </span>

                        <input
                            id="profile-name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            autoComplete="name"
                            className="profile-input"
                            placeholder={
                                t.auth.fullName
                            }
                        />

                    </div>

                </div>

                {/* ======================================================== */}
                {/* PHONE */}
                {/* ======================================================== */}

                <div className="profile-field">

                    <label
                        htmlFor="profile-phone"
                        className="profile-label"
                    >

                        {t.auth.phone}

                    </label>

                    <div className="profile-input-wrapper">

                        <span
                            className="profile-input-icon"
                            aria-hidden="true"
                        >
                            ☎
                        </span>

                        <input
                            id="profile-phone"
                            type="tel"
                            value={phone}
                            onChange={(event) =>
                                setPhone(
                                    event.target.value
                                )
                            }
                            autoComplete="tel"
                            className="profile-input"
                            placeholder={
                                t.auth.phone
                            }
                        />

                    </div>

                </div>

                {/* ======================================================== */}
                {/* LANGUAGE */}
                {/* ======================================================== */}

                <div className="profile-field profile-language-field">

                    <label
                        htmlFor="profile-language"
                        className="profile-label"
                    >

                        {
                            t.dashboard.profile
                                .language
                        }

                    </label>

                    <div className="profile-input-wrapper">

                        <span
                            className="profile-input-icon"
                            aria-hidden="true"
                        >
                            🌐
                        </span>

                        <select
                            id="profile-language"
                            value={language}
                            onChange={(event) =>
                                setLanguage(
                                    event.target.value as "en" | "fa"
                                )
                            }
                            className="profile-input profile-select"
                        >

                            <option value="fa">

                                {
                                    t.dashboard.profile
                                        .languages.fa
                                }

                            </option>

                            <option value="en">

                                {
                                    t.dashboard.profile
                                        .languages.en
                                }

                            </option>

                        </select>

                    </div>

                </div>

            </div>

            {/* ============================================================ */}
            {/* SAVING INDICATOR */}
            {/* ============================================================ */}

            {saving && (

                <div className="profile-saving-message">

                    <span className="profile-saving-dot" />

                    {t.auth.loading}

                </div>

            )}

            {/* ============================================================ */}
            {/* INTERNAL CSS */}
            {/* ============================================================ */}

            <style jsx>{`

                .profile-edit-form {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 28px;
                    border-radius: 24px;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    box-shadow:
                        0 8px 25px rgba(15, 23, 42, 0.06);
                    transition:
                        box-shadow 0.25s ease,
                        transform 0.25s ease;
                }

                .profile-edit-form:hover {
                    box-shadow:
                        0 14px 35px rgba(15, 23, 42, 0.09);
                }

                .profile-section-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                }

                .profile-section-icon {
                    width: 46px;
                    height: 46px;
                    min-width: 46px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background:
                        linear-gradient(
                            135deg,
                            #183B73,
                            #46A6D9
                        );
                    color: #ffffff;
                    font-size: 20px;
                    box-shadow:
                        0 7px 18px rgba(24, 59, 115, 0.20);
                }

                .profile-section-title {
                    margin: 0;
                    color: #0f172a;
                    font-size: 20px;
                    line-height: 1.4;
                    font-weight: 700;
                }

                .profile-section-description {
                    margin: 5px 0 0;
                    color: #64748b;
                    font-size: 13px;
                    line-height: 1.6;
                }

                .profile-fields {
                    display: grid;
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    gap: 20px;
                }

                .profile-language-field {
                    grid-column: 1 / -1;
                }

                .profile-field {
                    width: 100%;
                }

                .profile-label {
                    display: block;
                    margin-bottom: 8px;
                    color: #334155;
                    font-size: 13px;
                    font-weight: 600;
                }

                .profile-input-wrapper {
                    position: relative;
                    width: 100%;
                }

                .profile-input-icon {
                    position: absolute;
                    top: 50%;
                    left: 15px;
                    transform: translateY(-50%);
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 22px;
                    color: #64748b;
                    font-size: 15px;
                    pointer-events: none;
                }

                [dir="rtl"] .profile-input-icon {
                    left: auto;
                    right: 15px;
                }

                .profile-input {
                    width: 100%;
                    height: 48px;
                    box-sizing: border-box;
                    padding:
                        0 16px
                        0 46px;
                    border:
                        1px solid #cbd5e1;
                    border-radius: 13px;
                    outline: none;
                    background: #f8fafc;
                    color: #0f172a;
                    font-size: 14px;
                    transition:
                        border-color 0.2s ease,
                        background 0.2s ease,
                        box-shadow 0.2s ease;
                }

                [dir="rtl"] .profile-input {
                    padding:
                        0 46px
                        0 16px;
                }

                .profile-input:hover {
                    background: #ffffff;
                    border-color: #94a3b8;
                }

                .profile-input:focus {
                    background: #ffffff;
                    border-color: #46A6D9;
                    box-shadow:
                        0 0 0 4px
                        rgba(70, 166, 217, 0.12);
                }

                .profile-input::placeholder {
                    color: #94a3b8;
                }

                .profile-select {
                    appearance: auto;
                    cursor: pointer;
                }

                .profile-saving-message {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 20px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    background: #eff6ff;
                    color: #183B73;
                    font-size: 13px;
                    font-weight: 600;
                }

                .profile-saving-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #46A6D9;
                    animation:
                        profilePulse 1s infinite;
                }

                @keyframes profilePulse {

                    0% {
                        opacity: 0.35;
                        transform: scale(0.85);
                    }

                    50% {
                        opacity: 1;
                        transform: scale(1);
                    }

                    100% {
                        opacity: 0.35;
                        transform: scale(0.85);
                    }

                }

                @media (max-width: 700px) {

                    .profile-edit-form {
                        padding: 22px;
                        border-radius: 20px;
                    }

                    .profile-fields {
                        grid-template-columns: 1fr;
                    }

                    .profile-language-field {
                        grid-column: auto;
                    }

                }

            `}</style>

        </form>

    );

}
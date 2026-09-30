"use client";

import { useState } from "react";

import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/AuthContext";

import {
    changePassword,
} from "@/services/profile";

interface ChangePasswordFormProps {
    formRef?: React.RefObject<HTMLFormElement | null>;
}

export default function ChangePasswordForm({
    formRef,
}: ChangePasswordFormProps) {

    const { t } = useLanguage();
    const { user } = useAuth();

    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const [
        passwordConfirmation,
        setPasswordConfirmation,
    ] = useState("");

    const [
        saving,
        setSaving,
    ] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        /*
        |--------------------------------------------------------------------------
        | Nothing to update
        |--------------------------------------------------------------------------
        |
        | The profile page has one global Save Changes button.
        | If the user did not enter any password information,
        | we simply skip the password update.
        |
        */

        if (
            !currentPassword &&
            !password &&
            !passwordConfirmation
        ) {
            return;
        }

        if (!user) {
            throw new Error(
                "Authenticated user is not available."
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        if (!currentPassword) {
            throw new Error(
                "Current password is required."
            );
        }

        if (!password) {
            throw new Error(
                "New password is required."
            );
        }

        if (!passwordConfirmation) {
            throw new Error(
                "Password confirmation is required."
            );
        }

        if (
            password !==
            passwordConfirmation
        ) {
            throw new Error(
                "Password confirmation does not match."
            );
        }

        try {

            setSaving(true);

            await changePassword(
                user.role,
                {
                    current_password:
                        currentPassword,

                    password,

                    password_confirmation:
                        passwordConfirmation,
                }
            );

            /*
            |--------------------------------------------------------------------------
            | Clear password fields after success
            |--------------------------------------------------------------------------
            */

            setCurrentPassword("");
            setPassword("");
            setPasswordConfirmation("");

        } finally {

            setSaving(false);

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Styles
    |--------------------------------------------------------------------------
    */

    const styles = {

        card: {
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            padding: "32px",
            boxShadow:
                "0 10px 30px rgba(15, 23, 42, 0.06)",
        } as React.CSSProperties,

        header: {
            marginBottom: "28px",
        } as React.CSSProperties,

        title: {
            margin: 0,
            fontSize: "20px",
            fontWeight: 700,
            color: "#0f172a",
        } as React.CSSProperties,

        description: {
            marginTop: "8px",
            marginBottom: 0,
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#64748b",
        } as React.CSSProperties,

        grid: {
            display: "grid",
            gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
        } as React.CSSProperties,

        field: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        } as React.CSSProperties,

        label: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#334155",
        } as React.CSSProperties,

        input: {
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "14px",
            border: "1px solid #cbd5e1",
            backgroundColor: "#f8fafc",
            padding: "13px 16px",
            fontSize: "14px",
            color: "#0f172a",
            outline: "none",
            transition:
                "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
        } as React.CSSProperties,

        securityNote: {
            marginTop: "24px",
            borderRadius: "16px",
            border: "1px solid #dbeafe",
            backgroundColor: "#eff6ff",
            padding: "14px 16px",
            fontSize: "13px",
            lineHeight: 1.7,
            color: "#1e40af",
        } as React.CSSProperties,

    };

    return (

        <form
            ref={formRef}
            onSubmit={handleSubmit}
            style={styles.card}
        >

            {/* --------------------------------------------------------------
                Header
            -------------------------------------------------------------- */}

            <div style={styles.header}>

                <h2 style={styles.title}>

                    {
                        t.dashboard.profile
                            .change_password
                    }

                </h2>

                <p style={styles.description}>

                    {
                        t.dashboard.profile
                            .change_password_description
                    }

                </p>

            </div>

            {/* --------------------------------------------------------------
                Password fields
            -------------------------------------------------------------- */}

            <div style={styles.grid}>

                {/* Current password */}

                <div style={styles.field}>

                    <label style={styles.label}>

                        {
                            t.dashboard.profile
                                .current_password
                        }

                    </label>

                    <input
                        type="password"
                        value={currentPassword}
                        autoComplete="current-password"
                        disabled={saving}
                        onChange={(event) =>
                            setCurrentPassword(
                                event.target.value
                            )
                        }
                        style={styles.input}
                    />

                </div>

                {/* New password */}

                <div style={styles.field}>

                    <label style={styles.label}>

                        {t.auth.password}

                    </label>

                    <input
                        type="password"
                        value={password}
                        autoComplete="new-password"
                        disabled={saving}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        style={styles.input}
                    />

                </div>

                {/* Confirm password */}

                <div style={styles.field}>

                    <label style={styles.label}>

                        {t.auth.confirmPassword}

                    </label>

                    <input
                        type="password"
                        value={passwordConfirmation}
                        autoComplete="new-password"
                        disabled={saving}
                        onChange={(event) =>
                            setPasswordConfirmation(
                                event.target.value
                            )
                        }
                        style={styles.input}
                    />

                </div>

            </div>

            {/* --------------------------------------------------------------
                Security information
            -------------------------------------------------------------- */}

            <div style={styles.securityNote}>

                {t.dashboard.profile.change_password_description}

            </div>

        </form>

    );

}
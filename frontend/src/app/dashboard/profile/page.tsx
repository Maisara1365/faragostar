"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import ProfileStatistics from "@/components/dashboard/profile/ProfileStatistics";
import EditProfileForm from "@/components/dashboard/profile/EditProfileForm";
import ProfilePhotoUploader from "@/components/dashboard/profile/ProfilePhotoUploader";
import ChangePasswordForm from "@/components/dashboard/profile/ChangePasswordForm";

import { getProfile } from "@/services/profile";

import type {
    ProfileResponse,
} from "@/types/profile";

import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/AuthContext";

/*
|--------------------------------------------------------------------------
| Header / Footer
|--------------------------------------------------------------------------
|
| Keep these imports according to your existing project structure.
|
*/

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {

    const { t } = useLanguage();

    const {
        user,
        loading: authLoading,
    } = useAuth();

    const [profile, setProfile] =
        useState<ProfileResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [savingAll, setSavingAll] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Form References
    |--------------------------------------------------------------------------
    */

    const profileFormRef =
        useRef<HTMLFormElement | null>(null);

    const passwordFormRef =
        useRef<HTMLFormElement | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Load Profile
    |--------------------------------------------------------------------------
    */

    async function loadProfile() {

        if (!user) {
            return;
        }

        try {

            setLoading(true);

            const data =
                await getProfile(user.role);

            setProfile(data);

        } catch (error) {

            console.error(
                "Failed to load profile:",
                error
            );

        } finally {

            setLoading(false);

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            authLoading ||
            !user
        ) {
            return;
        }

        loadProfile();

    }, [
        authLoading,
        user,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Save All Changes
    |--------------------------------------------------------------------------
    */

    async function handleSaveAllChanges() {

        if (!profileFormRef.current) {
            return;
        }

        try {

            setSavingAll(true);

            /*
            |--------------------------------------------------------------------------
            | Submit Personal Information
            |--------------------------------------------------------------------------
            */

            profileFormRef.current.requestSubmit();

            /*
            |--------------------------------------------------------------------------
            | Submit Password
            |--------------------------------------------------------------------------
            |
            | ChangePasswordForm handles whether password fields
            | contain values.
            |
            */

            if (passwordFormRef.current) {

                passwordFormRef.current.requestSubmit();

            }

            /*
            |--------------------------------------------------------------------------
            | Give the child forms time to finish their API requests.
            |--------------------------------------------------------------------------
            |
            | The actual API operations are handled by the child forms.
            |
            */

            await new Promise(
                (resolve) =>
                    setTimeout(resolve, 700)
            );

            /*
            |--------------------------------------------------------------------------
            | Refresh profile
            |--------------------------------------------------------------------------
            */

            await loadProfile();

            alert(
                t.dashboard.profile.profile_updated
                ?? "Profile changes saved successfully."
            );

        } catch (error) {

            console.error(
                "Failed to save profile changes:",
                error
            );

            alert(
                t.dashboard.profile.profile_update_failed
                ?? "Unable to save profile changes."
            );

        } finally {

            setSavingAll(false);

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (
        authLoading ||
        loading
    ) {

        return (

            <>

                <Header />

                <AuthGuard
                    allowedRoles={[
                        "admin",
                        "content_manager",
                        "customer",
                    ]}
                >

                    <DashboardShell
                        title={
                            t.dashboard.profile.title
                        }
                        description={
                            t.dashboard.profile.subtitle
                        }
                    >

                        <div
                            style={{
                                width: "100%",
                                minHeight: "320px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "24px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #e2e8f0",
                                boxShadow:
                                    "0 8px 30px rgba(15,23,42,0.06)",
                            }}
                        >

                            <div
                                style={{
                                    textAlign: "center",
                                    color: "#64748b",
                                    fontSize: "15px",
                                }}
                            >

                                {t.common.loading}

                            </div>

                        </div>

                    </DashboardShell>

                </AuthGuard>

                <Footer />

            </>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | No Profile
    |--------------------------------------------------------------------------
    */

    if (!profile) {

        return (

            <>

                <Header />

                <AuthGuard
                    allowedRoles={[
                        "admin",
                        "content_manager",
                        "customer",
                    ]}
                >

                    <DashboardShell
                        title={
                            t.dashboard.profile.title
                        }
                        description={
                            t.dashboard.profile.subtitle
                        }
                    >

                        <div
                            style={{
                                padding: "40px",
                                textAlign: "center",
                                borderRadius: "24px",
                                backgroundColor: "#ffffff",
                                border:
                                    "1px solid #fecaca",
                                color: "#dc2626",
                                boxShadow:
                                    "0 8px 30px rgba(15,23,42,0.06)",
                            }}
                        >

                            Unable to load profile.

                        </div>

                    </DashboardShell>

                </AuthGuard>

                <Footer />

            </>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Profile Page
    |--------------------------------------------------------------------------
    */

    return (

        <>

            {/* ============================================================= */}
            {/* HEADER */}
            {/* ============================================================= */}

            <Header />

            <AuthGuard
                allowedRoles={[
                    "admin",
                    "content_manager",
                    "customer",
                ]}
            >

                <DashboardShell
                    title={
                        t.dashboard.profile.title
                    }
                    description={
                        t.dashboard.profile.subtitle
                    }
                >

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "28px",
                            paddingBottom: "130px",
                        }}
                    >

                        {/* ================================================= */}
                        {/* PROFILE HEADER */}
                        {/* ================================================= */}

                        <ProfileHeader
                            user={profile.user}
                        />

                        {/* ================================================= */}
                        {/* STATISTICS */}
                        {/* ================================================= */}

                        <ProfileStatistics
                            statistics={
                                profile.statistics
                            }
                        />

                        {/* ================================================= */}
                        {/* PERSONAL INFORMATION + PHOTO */}
                        {/* ================================================= */}

                        <div
                            style={{
                                width: "100%",
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "28px",
                                alignItems: "stretch",
                            }}
                        >

                            <EditProfileForm
                                user={
                                    profile.user
                                }
                                formRef={
                                    profileFormRef
                                }
                                onUpdated={
                                    loadProfile
                                }
                            />

                            <ProfilePhotoUploader
                                user={
                                    profile.user
                                }
                                onUpdated={
                                    loadProfile
                                }
                            />

                        </div>

                        {/* ================================================= */}
                        {/* PASSWORD */}
                        {/* ================================================= */}

                        <ChangePasswordForm
                            formRef={
                                passwordFormRef
                            }
                        />

                        {/* ================================================= */}
                        {/* GLOBAL SAVE BAR */}
                        {/* ================================================= */}

                        <div
                            style={{
                                position: "sticky",
                                bottom: "20px",
                                zIndex: 100,
                                width: "100%",
                                padding: "18px 22px",
                                borderRadius: "22px",
                                background:
                                    "rgba(255,255,255,0.97)",
                                border:
                                    "1px solid #dbe3ee",
                                boxShadow:
                                    "0 15px 45px rgba(15,23,42,0.16)",
                                backdropFilter:
                                    "blur(14px)",
                                WebkitBackdropFilter:
                                    "blur(14px)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent:
                                    "space-between",
                                gap: "20px",
                                flexWrap: "wrap",
                            }}
                        >

                            <div
                                style={{
                                    flex: "1 1 300px",
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: 800,
                                        color: "#183B73",
                                    }}
                                >

                                    {t.dashboard.profile
                                        .save_changes
                                        ?? "Save Changes"}

                                </div>

                                <div
                                    style={{
                                        marginTop: "5px",
                                        fontSize: "13px",
                                        lineHeight: "1.6",
                                        color: "#64748b",
                                    }}
                                >

                                    {t.dashboard.profile
                                        .save_changes_description
                                        ??
                                        "Save your personal information and password changes."}

                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    handleSaveAllChanges
                                }
                                disabled={
                                    savingAll
                                }
                                style={{
                                    flexShrink: 0,
                                    minWidth: "210px",
                                    minHeight: "52px",
                                    padding:
                                        "0 30px",
                                    border: "none",
                                    borderRadius: "14px",
                                    backgroundColor:
                                        savingAll
                                            ? "#94a3b8"
                                            : "#183B73",
                                    color: "#ffffff",
                                    fontSize: "15px",
                                    fontWeight: 700,
                                    cursor:
                                        savingAll
                                            ? "not-allowed"
                                            : "pointer",
                                    boxShadow:
                                        savingAll
                                            ? "none"
                                            : "0 8px 22px rgba(24,59,115,0.25)",
                                    transition:
                                        "all 0.25s ease",
                                }}
                            >

                                {savingAll

                                    ? (
                                        t.auth.loading
                                        ?? "Saving..."
                                    )

                                    : (
                                        t.dashboard.profile
                                            .save_changes
                                        ?? "Save Changes"
                                    )

                                }

                            </button>

                        </div>

                    </div>

                </DashboardShell>

            </AuthGuard>

            {/* ============================================================= */}
            {/* FOOTER */}
            {/* ============================================================= */}

            <Footer />

        </>

    );

}
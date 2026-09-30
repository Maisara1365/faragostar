"use client";

import Image from "next/image";

import type {
    ProfileUser,
} from "@/types/profile";

import { useLanguage } from "@/context/language-context";

interface ProfileHeaderProps {

    user: ProfileUser;

}

export default function ProfileHeader({

    user,

}: ProfileHeaderProps) {

    const { t } = useLanguage();

    /*
    |--------------------------------------------------------------------------
    | Role label
    |--------------------------------------------------------------------------
    */

    function getRoleLabel(role: string) {

        switch (role) {

            case "admin":
                return "Admin";

            case "content_manager":
                return "Content Manager";

            case "customer":
                return "Customer";

            default:
                return role;

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Status label
    |--------------------------------------------------------------------------
    */

    function getStatusLabel(status: string) {

        switch (status) {

            case "active":
                return "Active";

            case "blocked":
                return "Blocked";

            default:
                return status;

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Styles
    |--------------------------------------------------------------------------
    */

    const styles = {

        container: {
            position: "relative",
            overflow: "hidden",
            borderRadius: "28px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            padding: "32px",
            boxShadow:
                "0 12px 35px rgba(15, 23, 42, 0.07)",
        } as React.CSSProperties,

        background: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "110px",
            background:
                "linear-gradient(135deg, #183B73 0%, #46A6D9 100%)",
        } as React.CSSProperties,

        content: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            paddingTop: "45px",
            flexWrap: "wrap",
        } as React.CSSProperties,

        avatarWrapper: {
            position: "relative",
            width: "128px",
            height: "128px",
            flexShrink: 0,
        } as React.CSSProperties,

        avatar: {
            position: "relative",
            width: "128px",
            height: "128px",
            overflow: "hidden",
            borderRadius: "9999px",
            border: "5px solid #ffffff",
            backgroundColor: "#f1f5f9",
            boxShadow:
                "0 10px 25px rgba(15, 23, 42, 0.15)",
        } as React.CSSProperties,

        information: {
            flex: 1,
            minWidth: "240px",
        } as React.CSSProperties,

        name: {
            margin: 0,
            fontSize: "28px",
            lineHeight: 1.2,
            fontWeight: 800,
            color: "#0f172a",
        } as React.CSSProperties,

        email: {
            marginTop: "9px",
            marginBottom: 0,
            fontSize: "14px",
            color: "#64748b",
        } as React.CSSProperties,

        phone: {
            marginTop: "5px",
            marginBottom: 0,
            fontSize: "14px",
            color: "#64748b",
        } as React.CSSProperties,

        badges: {
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "16px",
        } as React.CSSProperties,

        roleBadge: {
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "9999px",
            backgroundColor: "#eff6ff",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#183B73",
        } as React.CSSProperties,

        activeBadge: {
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "9999px",
            backgroundColor: "#ecfdf5",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#047857",
        } as React.CSSProperties,

        blockedBadge: {
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "9999px",
            backgroundColor: "#fef2f2",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#dc2626",
        } as React.CSSProperties,

    };

    const isActive =
        user.status === "active";

    return (

        <section style={styles.container}>

            {/* --------------------------------------------------------------
                Decorative header
            -------------------------------------------------------------- */}

            <div style={styles.background} />

            {/* --------------------------------------------------------------
                Profile content
            -------------------------------------------------------------- */}

            <div style={styles.content}>

                {/* Profile image */}

                <div style={styles.avatarWrapper}>

                    <div style={styles.avatar}>

                        <img
   			 src={
       			 user.profile_photo_url ||
       			 "/images/default-avatar.png"
   			 }
   			 alt={user.name}
   			 style={{
        		width: "100%",
       			 height: "100%",
        		objectFit: "cover",
        		display: "block",
   			 }}
			/>

                    </div>

                </div>

                {/* Profile information */}

                <div style={styles.information}>

                    <h2 style={styles.name}>

                        {user.name}

                    </h2>

                    <p style={styles.email}>

                        {user.email}

                    </p>

                    {user.phone && (

                        <p style={styles.phone}>

                            {user.phone}

                        </p>

                    )}

                    {/* Badges */}

                    <div style={styles.badges}>

                        <span style={styles.roleBadge}>

                            {getRoleLabel(user.role)}

                        </span>

                        <span
                            style={
                                isActive
                                    ? styles.activeBadge
                                    : styles.blockedBadge
                            }
                        >

                            {getStatusLabel(user.status)}

                        </span>

                    </div>

                </div>

            </div>

        </section>

    );

}
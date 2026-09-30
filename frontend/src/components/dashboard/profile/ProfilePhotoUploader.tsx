"use client";

import Image from "next/image";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/AuthContext";
import { uploadProfilePhoto } from "@/services/profile";

import type { ProfileUser } from "@/types/profile";

interface ProfilePhotoUploaderProps {
    user: ProfileUser;

    onUpdated?: () => Promise<void> | void;

    onPhotoSelected?: (
        photo: File | null
    ) => void;

    onPhotoRemoved?: (
        removed: boolean
    ) => void;
}

export default function ProfilePhotoUploader({
    user,
    onUpdated,
    onPhotoSelected,
    onPhotoRemoved,
}: ProfilePhotoUploaderProps) {

    const { t } = useLanguage();
    const { user: authUser } = useAuth();

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [previewUrl, setPreviewUrl] =
        useState<string | null>(
            user.profile_photo_url
        );

    const [selectedPhoto, setSelectedPhoto] =
        useState<File | null>(null);

    const [photoRemoved, setPhotoRemoved] =
        useState(false);

    const [uploading, setUploading] =
        useState(false);

    useEffect(() => {

        if (!selectedPhoto) {
            setPreviewUrl(
                user.profile_photo_url
            );
        }

    }, [
        user.profile_photo_url,
        selectedPhoto,
    ]);

    async function handlePhotoSelect(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            alert(
                "Please select a valid image file."
            );

            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Local preview
        |--------------------------------------------------------------------------
        */

        const objectUrl =
            URL.createObjectURL(file);

        setPreviewUrl(objectUrl);
        setSelectedPhoto(file);
        setPhotoRemoved(false);

        onPhotoSelected?.(file);
        onPhotoRemoved?.(false);

        /*
        |--------------------------------------------------------------------------
        | Upload to backend
        |--------------------------------------------------------------------------
        */

        if (!authUser) {
            return;
        }

        try {

            setUploading(true);

            await uploadProfilePhoto(
                authUser.role,
                file
            );

            /*
            |--------------------------------------------------------------------------
            | Reload profile so the new database path/url is displayed
            |--------------------------------------------------------------------------
            */

            setSelectedPhoto(null);

            if (onUpdated) {
                await onUpdated();
            }

        } catch (error) {

            console.error(
                "Failed to upload profile photo:",
                error
            );

            alert(
                "Failed to upload profile photo."
            );

            setPreviewUrl(
                user.profile_photo_url
            );

            setSelectedPhoto(null);

        } finally {

            setUploading(false);

        }

    }

    function handleRemovePhoto() {

        if (selectedPhoto) {

            setSelectedPhoto(null);

            setPreviewUrl(
                user.profile_photo_url
            );

            onPhotoSelected?.(null);

            return;
        }

        setPhotoRemoved(true);
        setPreviewUrl(null);

        onPhotoRemoved?.(true);
    }

    function handleRestorePhoto() {

        setPhotoRemoved(false);

        setPreviewUrl(
            user.profile_photo_url
        );

        onPhotoRemoved?.(false);
    }

    function openFilePicker() {
        if (!uploading) {
            inputRef.current?.click();
        }
    }

    const styles = {

        container: {
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            padding: "32px",
            boxShadow:
                "0 10px 30px rgba(15, 23, 42, 0.06)",
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

        content: {
            display: "flex",
            alignItems: "center",
            gap: "28px",
            marginTop: "28px",
            flexWrap: "wrap",
        } as React.CSSProperties,

        avatarWrapper: {
            position: "relative",
            width: "120px",
            height: "120px",
            flexShrink: 0,
        } as React.CSSProperties,

        avatar: {
            width: "120px",
            height: "120px",
            borderRadius: "9999px",
            overflow: "hidden",
            border: "4px solid #f1f5f9",
            backgroundColor: "#f8fafc",
            position: "relative",
            boxShadow:
                "0 8px 20px rgba(15, 23, 42, 0.08)",
        } as React.CSSProperties,

        actions: {
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
            minWidth: "220px",
        } as React.CSSProperties,

        buttonRow: {
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
        } as React.CSSProperties,

        uploadButton: {
            border: "none",
            borderRadius: "12px",
            backgroundColor: "#183B73",
            color: "#ffffff",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: uploading
                ? "not-allowed"
                : "pointer",
            opacity: uploading ? 0.6 : 1,
            transition: "all 0.2s ease",
        } as React.CSSProperties,

        removeButton: {
            border: "1px solid #fecaca",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            color: "#dc2626",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
        } as React.CSSProperties,

        restoreButton: {
            border: "1px solid #bae6fd",
            borderRadius: "12px",
            backgroundColor: "#f0f9ff",
            color: "#0369a1",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
        } as React.CSSProperties,

        hint: {
            margin: 0,
            fontSize: "12px",
            lineHeight: 1.6,
            color: "#94a3b8",
        } as React.CSSProperties,

        selectedText: {
            margin: 0,
            fontSize: "13px",
            fontWeight: 500,
            color: "#183B73",
        } as React.CSSProperties,

        removedText: {
            margin: 0,
            fontSize: "13px",
            fontWeight: 500,
            color: "#dc2626",
        } as React.CSSProperties,

    };

    return (

        <section style={styles.container}>

            <div>

                <h2 style={styles.title}>
                    {t.dashboard.profile.photo}
                </h2>

                <p style={styles.description}>
                    {
                        t.dashboard.profile
                            .photo_description
                    }
                </p>

            </div>

            <div style={styles.content}>

                <div style={styles.avatarWrapper}>

                    <div style={styles.avatar}>

                        {previewUrl ? (

                            <Image
                                src={previewUrl}
                                alt={user.name}
                                fill
                                sizes="120px"
                                className="object-cover"
                            />

                        ) : (

                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "36px",
                                    fontWeight: 700,
                                    color: "#64748b",
                                    backgroundColor: "#f1f5f9",
                                }}
                            >
                                {user.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                        )}

                    </div>

                </div>

                <div style={styles.actions}>

                    <div style={styles.buttonRow}>

                        <button
                            type="button"
                            onClick={openFilePicker}
                            disabled={uploading}
                            style={styles.uploadButton}
                        >
                            {uploading
                                ? "Uploading..."
                                : t.dashboard.profile.upload_photo}
                        </button>

                        {!photoRemoved ? (

                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                disabled={uploading}
                                style={styles.removeButton}
                            >
                                {
                                    t.dashboard.profile
                                        .remove_photo
                                }
                            </button>

                        ) : (

                            <button
                                type="button"
                                onClick={handleRestorePhoto}
                                style={styles.restoreButton}
                            >
                                Restore Photo
                            </button>

                        )}

                    </div>

                    {selectedPhoto && (

                        <p style={styles.selectedText}>
                            {selectedPhoto.name}
                        </p>

                    )}

                    {photoRemoved && (

                        <p style={styles.removedText}>
                            Photo will be removed when you
                            click Save Changes.
                        </p>

                    )}

                    {!selectedPhoto &&
                    !photoRemoved &&
                    !uploading && (

                        <p style={styles.hint}>
                            Select a new image or remove
                            the existing photo.
                        </p>

                    )}

                    {uploading && (

                        <p style={styles.selectedText}>
                            Uploading profile photo...
                        </p>

                    )}

                </div>

            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={handlePhotoSelect}
            />

        </section>

    );
}
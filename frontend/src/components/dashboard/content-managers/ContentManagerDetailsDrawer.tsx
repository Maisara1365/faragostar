"use client";

import Image from "next/image";

import {
    X,
    Mail,
    Phone,
    Globe,
    Shield,
    Calendar,
    User,
} from "lucide-react";

import {
    useLanguage,
} from "@/context/language-context";

import type {
    ContentManager,
} from "@/types/content-manager";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ContentManagerDetailsDrawerProps {
    open: boolean;
    manager: ContentManager | null;
    onClose: () => void;
}

export default function ContentManagerDetailsDrawer({
    open,
    manager,
    onClose,
}: ContentManagerDetailsDrawerProps) {
    const { t } = useLanguage();

    if (!open || !manager) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="max-w-5xl"
                style={{
                    width: "90vw",
                    maxWidth: "1000px",
                    maxHeight: "90vh",
                    padding: "32px",
                    boxSizing: "border-box",
                    overflowY: "auto",
                }}
            >
                <DialogHeader
                    style={{
                        padding: "4px 8px 12px 8px",
                    }}
                >
                    <DialogTitle
                        style={{
                            padding: "4px",
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#000000",
                        }}
                    >
                        {t.dashboard.contentManagers.details}
                    </DialogTitle>
                </DialogHeader>

                <div
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                        marginTop: "24px",
                    }}
                >
                    {/* Profile Section */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        {/* Image Frame */}
                        <div
                            style={{
                                borderRadius: "9999px",
                                border: "4px solid #e2e8f0",
                                overflow: "hidden",
                                width: "120px",
                                height: "120px",
                                boxSizing: "border-box",
                                position: "relative",
                            }}
                        >
                            {manager.profile_photo_url ? (
                                <Image
                                    src={manager.profile_photo_url}
                                    alt={manager.name}
                                    fill
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "#4f46e5",
                                        color: "#ffffff",
                                        fontSize: "32px",
                                        fontWeight: 700,
                                    }}
                                >
                                    {manager.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h3
                            style={{
                                marginTop: "16px",
                                fontSize: "24px",
                                fontWeight: 700,
                                color: "#000000",
                                padding: "4px",
                            }}
                        >
                            {manager.name}
                        </h3>

                        <p
                            style={{
                                fontSize: "16px",
                                color: "#000000",
                                padding: "2px 4px",
                                fontWeight: 500,
                            }}
                        >
                            {manager.role}
                        </p>
                    </div>

                    {/* Manager Information */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "16px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.dashboard.contentManagers.information}
                        </h3>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            <InfoRow
                                icon={<Mail size={20} />}
                                label={t.dashboard.contentManagers.email}
                                value={manager.email}
                            />

                            <InfoRow
                                icon={<Phone size={20} />}
                                label={t.dashboard.contentManagers.phone}
                                value={manager.phone ?? "-"}
                            />

                            <InfoRow
                                icon={<Globe size={20} />}
                                label={t.dashboard.contentManagers.language}
                                value={manager.language.toUpperCase()}
                            />

                            <InfoRow
                                icon={<Shield size={20} />}
                                label={t.dashboard.contentManagers.status}
                                value={manager.status}
                            />

                            <InfoRow
                                icon={<Calendar size={20} />}
                                label={t.dashboard.contentManagers.created_at}
                                value={new Date(
                                    manager.created_at
                                ).toLocaleDateString()}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface RowProps {
    icon: React.ReactNode;
    label: string;
    value?: string | null;
}

function InfoRow({
    icon,
    label,
    value,
}: RowProps) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "4px",
                boxSizing: "border-box",
                width: "100%",
            }}
        >
            <div
                style={{
                    borderRadius: "8px",
                    background: "#f1f5f9",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#2563eb",
                    }}
                >
                    {icon}
                </span>
            </div>

            <div>
                <p
                    style={{
                        fontSize: "12px",
                        textTransform: "uppercase",
                        color: "#000000",
                        margin: 0,
                        padding: "2px 4px",
                        fontWeight: 600,
                    }}
                >
                    {label}
                </p>
                <p
                    style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#000000",
                        margin: 0,
                        padding: "2px 4px",
                    }}
                >
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}
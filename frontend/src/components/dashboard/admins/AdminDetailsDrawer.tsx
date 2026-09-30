import Image from "next/image";

import type {
    Admin,
} from "@/types/admin";

import AdminStatusBadge
    from "./AdminStatusBadge";

import {
    useLanguage,
} from "@/context/language-context";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    X,
    Mail,
    Phone,
    UserCog,
    Languages,
    Shield,
    Key,
    Calendar,
    Clock,
} from "lucide-react";

interface AdminDetailsDrawerProps {
    open: boolean;
    admin: Admin | null;
    onClose: () => void;
}

export default function AdminDetailsDrawer({
    open,
    admin,
    onClose,
}: AdminDetailsDrawerProps) {
    const { t } = useLanguage();

    if (!open || !admin) {
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
                        {t.dashboard.admins.details}
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
                            <Image
                                src={
                                    admin.profile_photo_url ??
                                    "/images/default-avatar.png"
                                }
                                alt={admin.name}
                                fill
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
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
                            {admin.name}
                        </h3>

                        <div
                            style={{
                                marginTop: "12px",
                            }}
                        >
                            <AdminStatusBadge
                                status={admin.status}
                            />
                        </div>
                    </div>

                    {/* Admin Information */}
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
                            {t.dashboard.admins.information}
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
                                label={t.dashboard.admins.email}
                                value={admin.email}
                            />

                            <InfoRow
                                icon={<Phone size={20} />}
                                label={t.dashboard.admins.phone}
                                value={admin.phone ?? "-"}
                            />

                            <InfoRow
                                icon={<UserCog size={20} />}
                                label={t.dashboard.admins.role}
                                value={admin.role}
                            />

                            <InfoRow
                                icon={<Languages size={20} />}
                                label={t.dashboard.admins.language}
                                value={admin.language}
                            />

                            <InfoRow
                                icon={<Shield size={20} />}
                                label={t.dashboard.admins.email_verified}
                                value={
                                    admin.email_verified
                                        ? t.common.yes
                                        : t.common.no
                                }
                            />

                            <InfoRow
                                icon={<Key size={20} />}
                                label={t.dashboard.admins.must_change_password}
                                value={
                                    admin.must_change_password
                                        ? t.common.yes
                                        : t.common.no
                                }
                            />

                            <InfoRow
                                icon={<Calendar size={20} />}
                                label={t.dashboard.admins.created_at}
                                value={new Date(
                                    admin.created_at
                                ).toLocaleString()}
                            />

                            <InfoRow
                                icon={<Clock size={20} />}
                                label={t.dashboard.admins.updated_at}
                                value={new Date(
                                    admin.updated_at
                                ).toLocaleString()}
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
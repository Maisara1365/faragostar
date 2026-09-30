"use client";

import Link from "next/link";

import {
    X,
    Calendar,
    Globe,
    User,
    Star,
    Palette,
    FolderKanban,
    ExternalLink,
} from "lucide-react";

import type {
    Portfolio,
} from "@/types/portfolio";

import { useLanguage } from "@/context/language-context";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    portfolio: Portfolio | null;
    onClose: () => void;
}

export default function PortfolioDetailsDrawer({
    open,
    portfolio,
    onClose,
}: Props) {
    const { t } = useLanguage();

    if (!open || !portfolio) {
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
                        {t.dashboard.portfolio.detailsTitle}
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
                    {/* Image */}
                    <div
                        style={{
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                            overflow: "hidden",
                            width: "100%",
                            boxSizing: "border-box",
                            position: "relative",
                            height: "300px",
                        }}
                    >
                        <img
                            src={
                                portfolio.image ??
                                "/images/placeholders/portfolio.jpg"
                            }
                            alt={portfolio.title}
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>

                    {/* Status */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "12px",
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <span
                            style={{
                                borderRadius: "9999px",
                                padding: "8px 16px",
                                fontSize: "14px",
                                fontWeight: 600,
                                backgroundColor:
                                    portfolio.status === "active"
                                        ? "#dcfce7"
                                        : "#fee2e2",
                                color:
                                    portfolio.status === "active"
                                        ? "#166534"
                                        : "#991b1b",
                            }}
                        >
                            {portfolio.status}
                        </span>

                        {portfolio.is_featured && (
                            <span
                                style={{
                                    borderRadius: "9999px",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    backgroundColor: "#fef9c3",
                                    color: "#854d0e",
                                }}
                            >
                                ★ Featured
                            </span>
                        )}
                    </div>

                    {/* English */}
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
                            English
                        </h3>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            <InfoRow
                                icon={<FolderKanban size={20} />}
                                label="Title"
                                value={portfolio.title_en}
                            />

                            <InfoRow
                                icon={<FolderKanban size={20} />}
                                label="Category"
                                value={portfolio.category_en}
                            />

                            <InfoBlock
                                label="Description"
                                value={portfolio.description_en}
                            />
                        </div>
                    </div>

                    {/* Persian */}
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
                            فارسی
                        </h3>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            <InfoRow
                                icon={<FolderKanban size={20} />}
                                label="عنوان"
                                value={portfolio.title_fa}
                            />

                            <InfoRow
                                icon={<FolderKanban size={20} />}
                                label="دسته بندی"
                                value={portfolio.category_fa}
                            />

                            <InfoBlock
                                label="توضیحات"
                                value={portfolio.description_fa}
                            />
                        </div>
                    </div>

                    {/* Project Information */}
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
                            {t.dashboard.portfolio.projectInformation}
                        </h3>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            <InfoRow
                                icon={<User size={20} />}
                                label={t.dashboard.portfolio.client}
                                value={portfolio.client_name}
                            />

                            <InfoRow
                                icon={<Calendar size={20} />}
                                label={t.dashboard.portfolio.completionDate}
                                value={portfolio.completion_date}
                            />

                            <InfoRow
                                icon={<Palette size={20} />}
                                label={t.dashboard.portfolio.themeColor}
                                value={portfolio.theme_color}
                            />

                            <InfoRow
                                icon={<Star size={20} />}
                                label={t.dashboard.portfolio.displayOrder}
                                value={portfolio.display_order.toString()}
                            />
                        </div>
                    </div>

                    {/* Project URL */}
                    {portfolio.project_url && (
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
                                Website
                            </h3>

                            <Link
                                href={portfolio.project_url}
                                target="_blank"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#2563eb",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.textDecoration = "underline";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.textDecoration = "none";
                                }}
                            >
                                <Globe size={20} />
                                {portfolio.project_url}
                                <ExternalLink size={18} />
                            </Link>
                        </div>
                    )}
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

function InfoBlock({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div
            style={{
                padding: "4px",
                boxSizing: "border-box",
                width: "100%",
            }}
        >
            <p
                style={{
                    marginBottom: "8px",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    color: "#000000",
                    padding: "2px 4px",
                    fontWeight: 600,
                }}
            >
                {label}
            </p>
            <div
                style={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    padding: "16px",
                    lineHeight: 1.8,
                    color: "#000000",
                    fontSize: "16px",
                    fontWeight: 500,
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                {value || "-"}
            </div>
        </div>
    );
}
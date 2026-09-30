"use client";

import {
    Trash2,
    AlertTriangle,
    Loader2,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import Button from "@/components/ui/button";

import {
    deletePortfolio,
} from "@/services/portfolio";

import type {
    Portfolio,
} from "@/types/portfolio";

import { useLanguage } from "@/context/language-context";

interface DeletePortfolioDialogProps {
    open: boolean;

    portfolio: Portfolio | null;

    loading: boolean;

    onLoadingChange: (
        loading: boolean
    ) => void;

    onClose: () => void;

    onDeleted: () => void;
}

export default function DeletePortfolioDialog({
    open,
    portfolio,
    loading,
    onLoadingChange,
    onClose,
    onDeleted,
}: DeletePortfolioDialogProps) {
    const { t } = useLanguage();

    async function handleDelete() {
        if (!portfolio) return;

        try {
            onLoadingChange(true);

            await deletePortfolio(portfolio.id);

            onDeleted();

            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            onLoadingChange(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!loading && !value) {
                    onClose();
                }
            }}
        >
            <DialogContent
                className="max-w-5xl"
                style={{
                    width: "60vw",
                    maxWidth: "700px",
                    maxHeight: "80vh",
                    padding: "12px",
                    boxSizing: "border-box",
                    overflowY: "hidden",
                }}
            >
                {/* Header */}

                <DialogHeader
                    style={{
                        padding: "2px 2px 2px 2px",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    {/* Warning Icon */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "72px",
                            height: "72px",
                            margin: "4px auto 12px auto",
                            borderRadius: "9999px",
                            background: "#fee2e2",
                            boxSizing: "border-box",
                        }}
                    >
                        <AlertTriangle
                            style={{
                                width: "36px",
                                height: "36px",
                                color: "#dc2626",
                            }}
                        />
                    </div>

                    <DialogTitle
                        style={{
                            width: "100%",
                            padding: "2px",
                            marginTop: "4px",
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#0f172a",
                        }}
                    >
                        {t.dashboard.portfolio.deleteTitle}
                    </DialogTitle>

                    <DialogDescription
                        style={{
                            width: "100%",
                            padding: "2px",
                            marginTop: "8px",
                            lineHeight: "1.75",
                            color: "#64748b",
                        }}
                    >
                        {t.dashboard.portfolio.deleteDescription}
                    </DialogDescription>
                </DialogHeader>

                {/* Portfolio Preview */}

                {portfolio && (
                    <div
                        style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                background: "#f8fafc",
                                boxSizing: "border-box",
                            }}
                        >
                            <p
                                style={{
                                    margin: 0,
                                    padding: "2px 4px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "#64748b",
                                }}
                            >
                                {t.dashboard.portfolio.portfolio}
                            </p>

                            <h3
                                style={{
                                    margin: "8px 0 0 0",
                                    padding: "2px 4px",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#0f172a",
                                }}
                            >
                                {portfolio.title}
                            </h3>

                            <p
                                style={{
                                    margin: "6px 0 0 0",
                                    padding: "2px 4px",
                                    fontSize: "14px",
                                    color: "#64748b",
                                }}
                            >
                                {portfolio.category}
                            </p>
                        </div>
                    </div>
                )}

                {/* Warning Message */}

                <div
                    style={{
                        width: "100%",
                        padding: "4px 8px",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            width: "100%",
                            padding: "14px 16px",
                            borderRadius: "12px",
                            border: "1px solid #fecaca",
                            background: "#fef2f2",
                            boxSizing: "border-box",
                        }}
                    >
                        <AlertTriangle
                            style={{
                                width: "18px",
                                height: "18px",
                                minWidth: "18px",
                                marginTop: "2px",
                                color: "#dc2626",
                            }}
                        />

                        <p
                            style={{
                                margin: 0,
                                padding: "2px 0",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                color: "#991b1b",
                            }}
                        >
                            {t.common.actionCannotBeUndone}
                        </p>
                    </div>
                </div>

                {/* Footer */}

                <DialogFooter
                    style={{
                        padding: "20px 8px 8px 8px",
                        marginTop: "8px",
                        gap: "12px",
                    }}
                >
                    {/* Cancel */}

                    <Button
                        variant="outline"
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "12px 24px",
                            minHeight: "46px",
                            minWidth: "120px",
                            borderRadius: "9999px",
                            border: "2px solid #94a3b8",
                            background: "transparent",
                            color: "#475569",
                            fontWeight: 600,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                            opacity: loading ? 0.7 : 1,
                            boxSizing: "border-box",
                        }}
                    >
                        {t.common.cancel}
                    </Button>

                    {/* Delete */}

                    <Button
                        type="button"
                        disabled={loading}
                        onClick={handleDelete}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "12px 24px",
                            minHeight: "46px",
                            minWidth: "130px",
                            borderRadius: "9999px",
                            border: "2px solid #dc2626",
                            background: "transparent",
                            color: "#dc2626",
                            fontWeight: 700,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                            opacity: loading ? 0.7 : 1,
                            boxSizing: "border-box",
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    className="h-4 w-4 animate-spin"
                                />

                                {t.common.deleting}
                            </>
                        ) : (
                            <>
                                <Trash2
                                    className="h-4 w-4"
                                />

                                {t.common.delete}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
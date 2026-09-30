"use client";

import {
    useState,
} from "react";

import {
    createContentManager,
} from "@/services/content-manager";

import type {
    CreateContentManagerPayload,
} from "@/types/content-manager";

import {
    useLanguage,
} from "@/context/language-context";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateContentManagerModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export default function CreateContentManagerModal({
    open,
    onClose,
    onCreated,
}: CreateContentManagerModalProps) {
    const { t } = useLanguage();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            setSaving(true);

            const payload: CreateContentManagerPayload = {
                name,
                email,
                phone,
            };

            await createContentManager(payload);

            alert(t.dashboard.contentManagers.created_success);

            setName("");
            setEmail("");
            setPhone("");

            onCreated();
            onClose();

        } catch (error) {
            console.error(error);
            alert(t.dashboard.contentManagers.created_failed);

        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
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
                        }}
                    >
                        <div
                            className="flex items-center gap-2"
                            style={{
                                padding: "4px",
                            }}
                        >
                            <span className="text-2xl font-bold">
                                {t.dashboard.contentManagers.create_content_manager}
                            </span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        className="space-y-6"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >
                        {/* Description */}
                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <p
                                className="text-sm text-slate-500"
                                style={{
                                    padding: "2px 4px",
                                    margin: "4px 0",
                                }}
                            >
                                {t.dashboard.contentManagers.create_content_manager_description}
                            </p>
                        </div>

                        {/* Name Field */}
                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >
                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.auth.fullName}
                            </label>

                            <Input
                                required
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Email Field */}
                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >
                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.auth.email}
                            </label>

                            <Input
                                required
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Phone Field */}
                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >
                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.auth.phone}
                            </label>

                            <Input
                                value={phone}
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter
                        className="gap-3"
                        style={{
                            padding: "20px 8px 8px 8px",
                            marginTop: "8px",
                            gap: "12px",
                        }}
                    >
                        {/* Cancel Button */}
                        <Button
                            type="button"
                            variant="outline"
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
                                cursor: "pointer",
                                boxSizing: "border-box",
                            }}
                        >
                            {t.common.cancel}
                        </Button>

                        {/* Create Button */}
                        <Button
                            type="submit"
                            disabled={saving}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "12px 24px",
                                minHeight: "46px",
                                minWidth: "130px",
                                borderRadius: "9999px",
                                border: "2px solid #2563eb",
                                background: "transparent",
                                color: "#2563eb",
                                fontWeight: 700,
                                cursor: saving ? "not-allowed" : "pointer",
                                opacity: saving ? 0.7 : 1,
                                boxSizing: "border-box",
                            }}
                        >
                            {saving
                                ? t.common.loading
                                : t.dashboard.contentManagers.create
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
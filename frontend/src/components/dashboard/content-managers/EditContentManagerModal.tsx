"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    updateContentManager,
} from "@/services/content-manager";

import type {
    ContentManager,
    UpdateContentManagerPayload,
} from "@/types/content-manager";

import {
    useLanguage,
} from "@/context/language-context";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

interface EditContentManagerModalProps {
    open: boolean;
    manager: ContentManager;
    onClose: () => void;
    onUpdated: () => void;
}

export default function EditContentManagerModal({
    open,
    manager,
    onClose,
    onUpdated,
}: EditContentManagerModalProps) {
    const { t } = useLanguage();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [language, setLanguage] = useState<"fa" | "en">("fa");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!manager) return;

        setName(manager.name);
        setEmail(manager.email);
        setPhone(manager.phone ?? "");
        setLanguage(manager.language);
    }, [manager]);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            setSaving(true);

            const payload: UpdateContentManagerPayload = {
                name,
                email,
                phone,
                language,
            };

            await updateContentManager(manager.id, payload);

            alert(t.dashboard.contentManagers.updated_success);

            onUpdated();
            onClose();
        } catch (error) {
            console.error(error);
            alert(t.dashboard.contentManagers.updated_failed);
        } finally {
            setSaving(false);
        }
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
                        }}
                    >
                        {t.dashboard.contentManagers.edit_content_manager}
                    </DialogTitle>
                    <DialogDescription
                        style={{
                            padding: "4px",
                        }}
                    >
                        {t.dashboard.contentManagers.edit_content_manager_description}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div
                        className="grid gap-6 py-4"
                        style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                    >
                        {/* Name */}
                        <div
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.auth.fullName}
                            </Label>
                            <Input
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

                        {/* Email */}
                        <div
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.auth.email}
                            </Label>
                            <Input
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

                        {/* Phone */}
                        <div
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.auth.phone}
                            </Label>
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

                        {/* Language */}
                        <div
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.contentManagers.language}
                            </Label>
                            <Select
                                value={language}
                                onValueChange={(value) =>
                                    setLanguage(value as "fa" | "en")
                                }
                            >
                                <SelectTrigger
                                    style={{
                                        width: "100%",
                                        minHeight: "48px",
                                        padding: "12px 14px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fa">
                                        فارسی
                                    </SelectItem>
                                    <SelectItem value="en">
                                        English
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter
                        style={{
                            padding: "20px 8px 8px 8px",
                            marginTop: "8px",
                            gap: "12px",
                        }}
                    >
                        {/* Cancel */}
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

                        {/* Save */}
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
                            {saving && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {saving
                                ? t.common.loading
                                : t.dashboard.contentManagers.save_changes}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
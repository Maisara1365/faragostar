"use client";

import { useLanguage } from "@/context/language-context";
import type { Customer } from "@/types/customer";
import {
    Eye,
    Pencil,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import Button from "@/components/ui/button";

interface CustomerActionsDropdownProps {
    customer: Customer;
    onView: (customer: Customer) => void;
    onEdit: (customer: Customer) => void;
    onActivate: (customer: Customer) => void;
    onBlock: (customer: Customer) => void;
}

export default function CustomerActionsDropdown({
    customer,
    onView,
    onEdit,
    onActivate,
    onBlock,
}: CustomerActionsDropdownProps) {
    const { t } = useLanguage();

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "8px",
            }}
        >
            {/* View */}
            <Button
                size="icon"
                variant="outline"
                onClick={() => onView(customer)}
                style={{
                    width: "38px",
                    height: "38px",
                    minWidth: "38px",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#475569",
                    cursor: "pointer",
                }}
            >
                <Eye
                    style={{
                        display: "block",
                        width: "18px",
                        height: "18px",
                        color: "#475569",
                        stroke: "#475569",
                        strokeWidth: 2,
                    }}
                />
            </Button>

            {/* Edit */}
            <Button
                size="icon"
                variant="outline"
                onClick={() => onEdit(customer)}
                style={{
                    width: "38px",
                    height: "38px",
                    minWidth: "38px",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9px",
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    color: "#2563eb",
                    cursor: "pointer",
                }}
            >
                <Pencil
                    style={{
                        display: "block",
                        width: "18px",
                        height: "18px",
                        color: "#2563eb",
                        stroke: "#2563eb",
                        strokeWidth: 2,
                    }}
                />
            </Button>

            {/* Status Toggle */}
            {customer.status === "active" ? (
                <Button
                    size="icon"
                    variant="danger"
                    onClick={() => onBlock(customer)}
                    style={{
                        width: "38px",
                        height: "38px",
                        minWidth: "38px",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "9px",
                        backgroundColor: "#fee2e2",
                        border: "1px solid #fecaca",
                        color: "#dc2626",
                        cursor: "pointer",
                        boxSizing: "border-box",
                    }}
                >
                    <XCircle
                        style={{
                            display: "block",
                            width: "18px",
                            height: "18px",
                            color: "#dc2626",
                            stroke: "#dc2626",
                            strokeWidth: 2.2,
                        }}
                    />
                </Button>
            ) : (
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onActivate(customer)}
                    style={{
                        width: "38px",
                        height: "38px",
                        minWidth: "38px",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "9px",
                        backgroundColor: "#dcfce7",
                        border: "1px solid #bbf7d0",
                        color: "#16a34a",
                        cursor: "pointer",
                    }}
                >
                    <CheckCircle2
                        style={{
                            display: "block",
                            width: "18px",
                            height: "18px",
                            color: "#16a34a",
                            stroke: "#16a34a",
                            strokeWidth: 2.2,
                        }}
                    />
                </Button>
            )}
        </div>
    );
}
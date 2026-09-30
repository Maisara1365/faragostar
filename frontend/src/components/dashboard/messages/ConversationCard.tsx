"use client";

import {
    MessageCircle,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";

import type {
    Conversation,
} from "@/types/conversation";
import { useLanguage } from "@/context/language-context";

interface Props {
    conversation: Conversation;
    active?: boolean;
    onClick: () => void;
    userRole?: string | null;
}

export default function ConversationCard({
    conversation,
    active = false,
    onClick,
    userRole,
}: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    const normalizedRole =
        typeof userRole === "string"
            ? userRole.trim().toLowerCase()
            : null;

    /*
    |--------------------------------------------------------------------------
    | Determine Participant
    |--------------------------------------------------------------------------
    */

    let participantName = "Conversation";
    let participantRole: string | null = null;

    /*
    |--------------------------------------------------------------------------
    | ADMIN
    |--------------------------------------------------------------------------
    */

    if (normalizedRole === "admin") {
        const participant =
            conversation.customer ||
            conversation.content_manager;

        participantName =
            participant?.name ||
            participant?.email ||
            "User";

        participantRole =
            participant?.role ||
            null;
    }

    /*
    |--------------------------------------------------------------------------
    | CUSTOMER
    |--------------------------------------------------------------------------
    */

    else if (normalizedRole === "customer") {
        participantName =
            conversation.admin?.name ||
            conversation.admin?.email ||
            "Administrator";

        participantRole =
            conversation.admin?.role ||
            "admin";
    }

    /*
    |--------------------------------------------------------------------------
    | CONTENT MANAGER
    |--------------------------------------------------------------------------
    */

    else if (normalizedRole === "content_manager") {
        if (conversation.customer?.role === "customer") {
            participantName =
                conversation.customer?.name ||
                conversation.customer?.email ||
                "Customer";

            participantRole =
                conversation.customer?.role ||
                "customer";
        } else {
            participantName =
                conversation.admin?.name ||
                conversation.admin?.email ||
                "Administrator";

            participantRole =
                conversation.admin?.role ||
                "admin";
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Fallback
    |--------------------------------------------------------------------------
    */

    else {
        participantName =
            conversation.customer?.name ||
            conversation.customer?.email ||
            conversation.admin?.name ||
            conversation.admin?.email ||
            "Conversation";

        participantRole =
            conversation.customer?.role ||
            conversation.admin?.role ||
            null;
    }

    /*
    |--------------------------------------------------------------------------
    | Participant Label (Multilingual)
    |--------------------------------------------------------------------------
    */

    let participantLabel = "";

    switch (participantRole) {
        case "admin":
            participantLabel = isRTL ? "مدیر" : "Administrator";
            break;
        case "customer":
            participantLabel = isRTL ? "مشتری" : "Customer";
            break;
        case "content_manager":
            participantLabel = isRTL ? "مدیر محتوا" : "Content Manager";
            break;
        default:
            participantLabel = "";
            break;
    }

    /*
    |--------------------------------------------------------------------------
    | Status Label (Multilingual)
    |--------------------------------------------------------------------------
    */

    const statusLabel = conversation.status === "open"
        ? (isRTL ? "باز" : "Open")
        : (isRTL ? "بسته" : "Closed");

    /*
    |--------------------------------------------------------------------------
    | Conversation Information
    |--------------------------------------------------------------------------
    */

    const subject =
        conversation.subject ||
        (isRTL ? "بدون موضوع" : "No subject");

    const latestMessage =
        conversation.last_message ||
        conversation.messages?.[0];

    const messagePreview =
        latestMessage?.message ||
        (isRTL ? "هنوز پیامی وجود ندارد" : "No messages yet.");

    /*
    |--------------------------------------------------------------------------
    | Get Initial for Avatar
    |--------------------------------------------------------------------------
    */

    const getInitial = () => {
        if (participantName && participantName.length > 0) {
            return participantName.charAt(0).toUpperCase();
        }
        return "F";
    };

    /*
    |--------------------------------------------------------------------------
    | Get Role Icon
    |--------------------------------------------------------------------------
    */

    const getRoleIcon = () => {
        switch (participantRole) {
            case "admin":
                return <ShieldCheck size={14} />;
            case "customer":
                return <User size={14} />;
            case "content_manager":
                return <Users size={14} />;
            default:
                return <MessageCircle size={14} />;
        }
    };

    return (
        <>
            <style jsx>{`
                /* ─── RTL Support ─── */
                .rtl {
                    direction: rtl;
                    text-align: right;
                }

                .ltr {
                    direction: ltr;
                    text-align: left;
                }

                /* ─── Card Container ─── */
                .card-btn {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border-radius: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    background: rgba(255, 255, 255, 0.02);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .card-btn.ltr {
                    text-align: left;
                }

                .card-btn.rtl {
                    text-align: right;
                }

                .card-btn:hover {
                    background: rgba(245, 184, 27, 0.04);
                    border-color: rgba(245, 184, 27, 0.08);
                }

                .card-btn.ltr:hover {
                    transform: translateX(2px);
                }

                .card-btn.rtl:hover {
                    transform: translateX(-2px);
                }

                .card-btn.active {
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.08), rgba(245, 184, 27, 0.02));
                    border-color: rgba(245, 184, 27, 0.2);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }

                .card-btn.active::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: linear-gradient(180deg, #f5b81b, #e6a800);
                }

                .card-btn.ltr.active::before {
                    left: 0;
                    right: auto;
                    border-radius: 0 4px 4px 0;
                }

                .card-btn.rtl.active::before {
                    right: 0;
                    left: auto;
                    border-radius: 4px 0 0 4px;
                }

                /* ─── Inner Layout ─── */
                .card-inner {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    position: relative;
                    z-index: 1;
                }

                .card-inner-ltr {
                    flex-direction: row;
                }

                .card-inner-rtl {
                    flex-direction: row-reverse;
                }

                /* ─── Avatar ─── */
                .avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    font-weight: 700;
                    flex-shrink: 0;
                    background: linear-gradient(135deg, #f5b81b, #d4a017);
                    color: #0a1628;
                    box-shadow: 0 4px 16px rgba(245, 184, 27, 0.2);
                    transition: transform 0.2s ease;
                }

                /* Fix avatar order in RTL */
                .card-inner-rtl .avatar {
                    order: 2;
                }

                .card-inner-rtl .content {
                    order: 1;
                }

                .card-btn:hover .avatar {
                    transform: scale(1.05);
                }

                .card-btn.active .avatar {
                    box-shadow: 0 4px 20px rgba(245, 184, 27, 0.35);
                }

                /* ─── Content ─── */
                .content {
                    flex: 1;
                    min-width: 0;
                }

                /* ─── Top Row ─── */
                .top-row {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 0.5rem;
                    width: 100%;
                }

                /* Fix status badge alignment in RTL */
                .card-inner-rtl .top-row {
                    flex-direction: row;
                }

                .card-inner-ltr .top-row {
                    flex-direction: row;
                }

                /* Fix status badge wrapper */
                .top-row-left {
                    flex: 1;
                    min-width: 0;
                }

                .top-row-right {
                    flex-shrink: 0;
                }

                .card-inner-rtl .top-row-left {
                    order: 2;
                    text-align: right;
                }

                .card-inner-rtl .top-row-right {
                    order: 1;
                }

                /* ─── Participant Name Wrapper ─── */
                .participant-name-wrapper {
                    flex: 1;
                    min-width: 0;
                }

                .ltr-name {
                    direction: ltr;
                    text-align: left;
                }

                .rtl-name {
                    direction: rtl;
                    text-align: right;
                }

                .participant-name {
                    width: 100%;
                    margin: 0;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #ffffff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    transition: color 0.2s ease;
                }

                .ltr-name .participant-name {
                    text-align: left;
                }

                .rtl-name .participant-name {
                    text-align: right;
                    direction: rtl;
                }

                .card-btn:hover .participant-name {
                    color: #f5b81b;
                }

                .card-btn.active .participant-name {
                    color: #f5b81b;
                }

                /* ─── Role Badge ─── */
                .role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.25rem;
                    margin-top: 0.15rem;
                    font-size: 0.55rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 0.1rem 0.6rem;
                    border-radius: 40px;
                    border: 1px solid transparent;
                    width: fit-content;
                }

                .role-badge.admin {
                    color: #f5b81b;
                    background: rgba(245, 184, 27, 0.1);
                    border-color: rgba(245, 184, 27, 0.1);
                }

                .role-badge.customer {
                    color: #8bc34a;
                    background: rgba(139, 195, 74, 0.1);
                    border-color: rgba(139, 195, 74, 0.1);
                }

                .role-badge.content_manager {
                    color: #60a5fa;
                    background: rgba(37, 99, 235, 0.1);
                    border-color: rgba(37, 99, 235, 0.1);
                }

                .role-badge.default {
                    color: rgba(255, 255, 255, 0.3);
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(255, 255, 255, 0.04);
                }

                .role-badge svg {
                    width: 12px;
                    height: 12px;
                }

                /* ─── Status Badge ─── */
                .status-badge {
                    flex-shrink: 0;
                    padding: 0.15rem 0.6rem;
                    border-radius: 40px;
                    font-size: 0.55rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1px solid transparent;
                    display: inline-block;
                }

                .status-badge.open {
                    color: #8bc34a;
                    background: rgba(139, 195, 74, 0.08);
                    border-color: rgba(139, 195, 74, 0.08);
                }

                .status-badge.closed {
                    color: #f87171;
                    background: rgba(239, 68, 68, 0.08);
                    border-color: rgba(239, 68, 68, 0.08);
                }

                /* ─── Subject ─── */
                .subject-text {
                    margin-top: 0.25rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.6);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                }

                .card-inner-rtl .subject-text {
                    text-align: right;
                }

                .card-inner-ltr .subject-text {
                    text-align: left;
                }

                .card-btn.active .subject-text {
                    color: rgba(255, 255, 255, 0.8);
                }

                /* ─── Message Preview ─── */
                .message-preview {
                    margin-top: 0.2rem;
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.3);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    line-height: 1.4;
                    text-align: left;
                }

                .card-inner-rtl .message-preview {
                    text-align: right;
                }

                .card-inner-ltr .message-preview {
                    text-align: left;
                }

                .card-btn.active .message-preview {
                    color: rgba(255, 255, 255, 0.4);
                }

                /* ─── Responsive ─── */
                @media (max-width: 480px) {
                    .card-btn {
                        padding: 0.6rem 0.75rem;
                    }

                    .avatar {
                        width: 38px;
                        height: 38px;
                        font-size: 0.85rem;
                        border-radius: 10px;
                    }

                    .participant-name {
                        font-size: 0.75rem;
                    }

                    .subject-text {
                        font-size: 0.65rem;
                    }

                    .message-preview {
                        font-size: 0.6rem;
                        -webkit-line-clamp: 1;
                    }

                    .role-badge {
                        font-size: 0.5rem;
                        padding: 0.05rem 0.4rem;
                    }

                    .status-badge {
                        font-size: 0.5rem;
                        padding: 0.1rem 0.4rem;
                    }
                }

                @media (max-width: 380px) {
                    .card-btn {
                        padding: 0.5rem 0.5rem;
                    }

                    .avatar {
                        width: 32px;
                        height: 32px;
                        font-size: 0.7rem;
                        border-radius: 8px;
                    }

                    .participant-name {
                        font-size: 0.7rem;
                    }

                    .subject-text {
                        font-size: 0.6rem;
                    }
                }
            `}</style>

            <button
                type="button"
                onClick={onClick}
                className={`card-btn ${active ? "active" : ""} ${isRTL ? "rtl" : "ltr"}`}
            >
                <div
                    className={`card-inner ${isRTL ? "card-inner-rtl" : "card-inner-ltr"}`}
                >
                    {/* Avatar */}
                    <div className="avatar">
                        {getInitial()}
                    </div>

                    <div className="content">
                        <div className="top-row">
                            <div className={`participant-name-wrapper ${isRTL ? "rtl-name" : "ltr-name"}`}>
                                <h3 className="participant-name">
                                    {participantName}
                                </h3>

                                {participantLabel && (
                                    <span className={`role-badge ${participantRole || "default"}`}>
                                        {getRoleIcon()}
                                        {participantLabel}
                                    </span>
                                )}
                            </div>

                            {conversation.status && (
                                <span className={`status-badge ${conversation.status}`}>
                                    {statusLabel}
                                </span>
                            )}
                        </div>

                        <p className="subject-text">
                            {subject}
                        </p>

                        <p className="message-preview">
                            {messagePreview}
                        </p>
                    </div>
                </div>
            </button>
        </>
    );
}
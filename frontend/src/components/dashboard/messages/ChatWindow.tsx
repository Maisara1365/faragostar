"use client";

import type { Conversation } from "@/types/conversation";
import { useLanguage } from "@/hooks/use-language";
import { MessageCircle, ShieldCheck, Users, User } from "lucide-react";

interface Props {
    conversation: Conversation | null;
}

export default function ChatWindow({
    conversation,
}: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    // ─── Get participant info for header ───
    const getParticipantInfo = () => {
        if (!conversation) return { name: "", role: "" };

        // Try to get the other participant based on user role
        const user = conversation.customer || conversation.admin || conversation.content_manager;
        const name = user?.name || user?.email || "";
        const role = user?.role || "";

        return { name, role };
    };

    const participant = getParticipantInfo();

    // ─── Get role label ───
    const getRoleLabel = (role: string) => {
        if (isRTL) {
            switch (role) {
                case "admin": return "مدیر";
                case "customer": return "مشتری";
                case "content_manager": return "مدیر محتوا";
                default: return "";
            }
        }
        switch (role) {
            case "admin": return "Administrator";
            case "customer": return "Customer";
            case "content_manager": return "Content Manager";
            default: return "";
        }
    };

    // ─── Get role icon ───
    const getRoleIcon = (role: string) => {
        switch (role) {
            case "admin": return <ShieldCheck className="role-icon" />;
            case "customer": return <User className="role-icon" />;
            case "content_manager": return <Users className="role-icon" />;
            default: return <MessageCircle className="role-icon" />;
        }
    };

    if (!conversation) {
        return (
            <>
                <style jsx>{`
                    .empty-state {
                        display: flex;
                        height: 100%;
                        flex: 1;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(180deg, #0a1628 0%, #06101d 100%);
                        padding: 2rem;
                    }

                    .empty-content {
                        max-width: 400px;
                        text-align: center;
                    }

                    .rtl .empty-content {
                        text-align: center;
                    }

                    .empty-icon {
                        margin: 0 auto;
                        width: 64px;
                        height: 64px;
                        color: rgba(255, 255, 255, 0.05);
                    }

                    .empty-title {
                        margin-top: 1.5rem;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: rgba(255, 255, 255, 0.3);
                        letter-spacing: -0.3px;
                    }

                    .empty-description {
                        margin-top: 0.75rem;
                        font-size: 0.9rem;
                        color: rgba(255, 255, 255, 0.15);
                        line-height: 1.6;
                    }

                    .rtl .empty-description {
                        text-align: center;
                    }
                `}</style>

                <div className={`empty-state ${isRTL ? "rtl" : "ltr"}`}>
                    <div className="empty-content">
                        <MessageCircle className="empty-icon" />
                        <h2 className="empty-title">
                            {t?.dashboard?.messages?.emptyTitle || "No conversation selected"}
                        </h2>
                        <p className="empty-description">
                            {t?.dashboard?.messages?.emptyDescription || "Select a conversation from the list to start messaging"}
                        </p>
                    </div>
                </div>
            </>
        );
    }

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

                /* ─── Chat Container ─── */
                .chat-container {
                    display: flex;
                    height: 100%;
                    flex: 1;
                    flex-direction: column;
                    background: linear-gradient(180deg, #0a1628 0%, #06101d 100%);
                }

                /* ─── Header ─── */
                .chat-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid rgba(245, 184, 27, 0.04);
                    background: rgba(10, 22, 40, 0.6);
                    backdrop-filter: blur(10px);
                    flex-shrink: 0;
                }

                .rtl .chat-header {
                    flex-direction: row-reverse;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    min-width: 0;
                }

                .rtl .header-left {
                    flex-direction: row-reverse;
                }

                .header-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    background: linear-gradient(135deg, #f5b81b, #d4a017);
                    color: #0a1628;
                    font-size: 1rem;
                    font-weight: 700;
                    box-shadow: 0 4px 16px rgba(245, 184, 27, 0.2);
                }

                .header-info {
                    min-width: 0;
                }

                .header-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #ffffff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .header-subtitle {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    margin-top: 0.1rem;
                    font-size: 0.65rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .rtl .header-subtitle {
                    flex-direction: row-reverse;
                }

                .header-subtitle .role-icon {
                    width: 12px;
                    height: 12px;
                    color: rgba(245, 184, 27, 0.4);
                }

                .header-status {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.2rem 0.8rem;
                    border-radius: 40px;
                    font-size: 0.6rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1px solid transparent;
                    flex-shrink: 0;
                }

                .rtl .header-status {
                    flex-direction: row-reverse;
                }

                .header-status.open {
                    color: #8bc34a;
                    background: rgba(139, 195, 74, 0.08);
                    border-color: rgba(139, 195, 74, 0.08);
                }

                .header-status.open .status-dot {
                    background: #8bc34a;
                    box-shadow: 0 0 8px rgba(139, 195, 74, 0.4);
                    animation: pulse 2s infinite;
                }

                .header-status.closed {
                    color: #f87171;
                    background: rgba(239, 68, 68, 0.08);
                    border-color: rgba(239, 68, 68, 0.08);
                }

                .header-status.closed .status-dot {
                    background: #ef4444;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.7); }
                }

                /* ─── Messages Area ─── */
                .messages-area {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.5rem;
                }

                .messages-area::-webkit-scrollbar {
                    width: 4px;
                }

                .messages-area::-webkit-scrollbar-track {
                    background: transparent;
                }

                .messages-area::-webkit-scrollbar-thumb {
                    background: rgba(245, 184, 27, 0.15);
                    border-radius: 10px;
                }

                .messages-area::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 184, 27, 0.25);
                }

                /* ─── No Messages State ─── */
                .no-messages {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    text-align: center;
                    padding: 2rem;
                }

                .no-messages-icon {
                    width: 48px;
                    height: 48px;
                    color: rgba(255, 255, 255, 0.05);
                    margin-bottom: 1rem;
                }

                .no-messages-title {
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.2);
                }

                .no-messages-description {
                    margin-top: 0.3rem;
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.1);
                }

                /* ─── Responsive ─── */
                @media (max-width: 480px) {
                    .chat-header {
                        padding: 0.75rem 1rem;
                    }

                    .header-avatar {
                        width: 34px;
                        height: 34px;
                        font-size: 0.85rem;
                        border-radius: 10px;
                    }

                    .header-title {
                        font-size: 0.85rem;
                    }

                    .header-subtitle {
                        font-size: 0.55rem;
                    }

                    .messages-area {
                        padding: 1rem;
                    }

                    .empty-content {
                        padding: 1rem;
                    }

                    .empty-title {
                        font-size: 1.2rem;
                    }

                    .empty-description {
                        font-size: 0.8rem;
                    }
                }

                @media (max-width: 380px) {
                    .chat-header {
                        padding: 0.5rem 0.75rem;
                    }

                    .header-avatar {
                        width: 30px;
                        height: 30px;
                        font-size: 0.75rem;
                        border-radius: 8px;
                    }

                    .header-title {
                        font-size: 0.75rem;
                    }

                    .header-status {
                        font-size: 0.5rem;
                        padding: 0.1rem 0.5rem;
                    }

                    .messages-area {
                        padding: 0.75rem;
                    }
                }
            `}</style>

            <div className={`chat-container ${isRTL ? "rtl" : "ltr"}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="header-left">
                        <div className="header-avatar">
                            {conversation.subject?.charAt(0).toUpperCase() || "F"}
                        </div>
                        <div className="header-info">
                            <h2 className="header-title">
                                {conversation.subject || (isRTL ? "پشتیبانی فراگستری" : "Faragostar Support")}
                            </h2>
                            {participant.name && (
                                <div className="header-subtitle">
                                    {getRoleIcon(participant.role)}
                                    <span>
                                        {participant.name}
                                        {participant.role && ` • ${getRoleLabel(participant.role)}`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`header-status ${conversation.status === "open" ? "open" : "closed"}`}>
                        <span className="status-dot" />
                        {conversation.status === "open"
                            ? (isRTL ? "آنلاین" : "Online")
                            : (isRTL ? "بسته" : "Closed")
                        }
                    </div>
                </div>

                {/* Messages Area */}
                <div className="messages-area">
                    {/* Placeholder for messages - will be replaced with ChatMessages component */}
                    <div className="no-messages">
                        <MessageCircle className="no-messages-icon" />
                        <p className="no-messages-title">
                            {isRTL ? "هنوز پیامی وجود ندارد" : "No messages yet"}
                        </p>
                        <p className="no-messages-description">
                            {isRTL ? "اولین پیام را ارسال کنید" : "Send the first message"}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import {
    getConversationMessages,
} from "@/services/conversation";

import {
    markMessageSeen,
} from "@/services/message";

import type {
    Conversation,
} from "@/types/conversation";

import type {
    Message,
} from "@/types/message";

import AttachmentBubble from "./AttachmentBubble";
import { useLanguage } from "@/hooks/use-language";

interface Props {
    conversation: Conversation | null;
    refresh: number;
}

interface CurrentUser {
    id?: number;
}

interface ChatMessage extends Message {
    sender?: {
        id?: number;
        name?: string;
        email?: string;
    };
}

function getCurrentUser(): CurrentUser {
    if (typeof window === "undefined") {
        return {};
    }

    try {
        return JSON.parse(
            localStorage.getItem("user") || "{}"
        );
    } catch {
        return {};
    }
}

export default function ChatMessages({
    conversation,
    refresh,
}: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        if (!conversation) {
            setMessages([]);
            return;
        }

        loadMessages();
    }, [conversation, refresh]);

    async function loadMessages() {
        if (!conversation) return;

        try {
            const data = await getConversationMessages(conversation.id);
            setMessages(data as ChatMessage[]);

            const currentUser = getCurrentUser();
            const currentUserId = currentUser?.id;

            if (currentUserId) {
                for (const message of data) {
                    if (!message.seen && message.sender_id !== currentUserId) {
                        await markMessageSeen(message.id);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // ─── Format time ───
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) {
            return date.toLocaleTimeString(isRTL ? "fa-IR" : "en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
        } else if (hours < 24) {
            return date.toLocaleTimeString(isRTL ? "fa-IR" : "en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
        } else {
            return date.toLocaleDateString(isRTL ? "fa-IR" : "en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        }
    };

    if (!conversation) {
        return (
            <>
                <style jsx>{`
                    .empty-messages {
                        display: flex;
                        flex: 1;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                        background: linear-gradient(180deg, #0a1628 0%, #06101d 100%);
                        height: 100%;
                        width: 100%;
                        min-height: 300px;
                    }

                    .empty-messages-text {
                        font-size: 0.9rem;
                        color: rgba(255, 255, 255, 0.15);
                        font-weight: 400;
                        letter-spacing: 0.3px;
                    }

                    .rtl .empty-messages-text {
                        text-align: center;
                    }
                `}</style>

                <div className={`empty-messages ${isRTL ? "rtl" : "ltr"}`}>
                    <p className="empty-messages-text">
                        {isRTL ? "یک مکالمه انتخاب کنید" : "Select a conversation"}
                    </p>
                </div>
            </>
        );
    }

    const currentUser = getCurrentUser();
    const currentUserId = currentUser?.id;

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

                /* ─── Messages Container ─── */
                .messages-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding: 0.75rem 1rem;
                    width: 100%;
                    box-sizing: border-box;
                }

                /* ─── Message Row ─── */
                .message-row {
                    display: flex;
                    animation: messageIn 0.3s ease;
                }

                .message-row.own {
                    justify-content: flex-end;
                }

                .message-row.other {
                    justify-content: flex-start;
                }

                .rtl .message-row.own {
                    justify-content: flex-start;
                }

                .rtl .message-row.other {
                    justify-content: flex-end;
                }

                @keyframes messageIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* ─── Message Bubble ─── */
                .message-bubble {
                    max-width: 75%;
                    padding: 0.6rem 1rem;
                    border-radius: 16px;
                    position: relative;
                    word-wrap: break-word;
                }

                .message-bubble.own {
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.2), rgba(245, 184, 27, 0.08));
                    border: 1px solid rgba(245, 184, 27, 0.1);
                    color: #eef2f7;
                    border-bottom-right-radius: 4px;
                }

                .rtl .message-bubble.own {
                    border-bottom-right-radius: 16px;
                    border-bottom-left-radius: 4px;
                }

                .message-bubble.other {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    color: #eef2f7;
                    border-bottom-left-radius: 4px;
                }

                .rtl .message-bubble.other {
                    border-bottom-left-radius: 16px;
                    border-bottom-right-radius: 4px;
                }

                /* ─── Message Text ─── */
                .message-text {
                    font-size: 0.85rem;
                    line-height: 1.6;
                    margin: 0;
                    color: #eef2f7;
                }

                /* ─── Message Time ─── */
                .message-time {
                    margin-top: 0.25rem;
                    font-size: 0.6rem;
                    color: rgba(255, 255, 255, 0.25);
                    text-align: right;
                    letter-spacing: 0.3px;
                }

                .rtl .message-time {
                    text-align: left;
                }

                /* ─── Seen Indicator ─── */
                .message-seen {
                    font-size: 0.55rem;
                    color: rgba(139, 195, 74, 0.5);
                    margin-top: 0.1rem;
                    text-align: right;
                    letter-spacing: 0.3px;
                }

                .rtl .message-seen {
                    text-align: left;
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
                    flex: 1;
                    min-height: 200px;
                }

                .no-messages-icon {
                    width: 48px;
                    height: 48px;
                    color: rgba(255, 255, 255, 0.04);
                    margin-bottom: 1rem;
                }

                .no-messages-title {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.15);
                }

                .no-messages-description {
                    margin-top: 0.3rem;
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.08);
                }

                /* ─── Message Sender Name ─── */
                .message-sender {
                    font-size: 0.6rem;
                    font-weight: 600;
                    color: rgba(245, 184, 27, 0.5);
                    margin-bottom: 0.2rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .rtl .message-sender {
                    text-align: right;
                }

                /* ─── Responsive ─── */
                @media (max-width: 480px) {
                    .messages-container {
                        padding: 0.5rem 0.6rem;
                    }

                    .message-bubble {
                        max-width: 85%;
                        padding: 0.5rem 0.75rem;
                        border-radius: 12px;
                    }

                    .message-text {
                        font-size: 0.8rem;
                    }

                    .message-time {
                        font-size: 0.55rem;
                    }

                    .no-messages-title {
                        font-size: 0.8rem;
                    }
                }

                @media (max-width: 380px) {
                    .messages-container {
                        padding: 0.3rem 0.4rem;
                    }

                    .message-bubble {
                        max-width: 90%;
                        padding: 0.4rem 0.6rem;
                        border-radius: 10px;
                    }

                    .message-text {
                        font-size: 0.75rem;
                    }
                }
            `}</style>

            <div className={`messages-container ${isRTL ? "rtl" : "ltr"}`}>
                {messages.length === 0 ? (
                    <div className="no-messages">
                        <MessageCircle className="no-messages-icon" />
                        <p className="no-messages-title">
                            {isRTL ? "هنوز پیامی وجود ندارد" : "No messages yet"}
                        </p>
                        <p className="no-messages-description">
                            {isRTL ? "اولین پیام را ارسال کنید" : "Send the first message"}
                        </p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isOwnMessage = message.sender_id === currentUserId;

                        return (
                            <div key={message.id} className={`message-row ${isOwnMessage ? "own" : "other"}`}>
                                <div className={`message-bubble ${isOwnMessage ? "own" : "other"}`}>
                                    {!isOwnMessage && message.sender && (
                                        <div className="message-sender">
                                            {message.sender.name || message.sender.email}
                                        </div>
                                    )}

                                    {message.message && (
                                        <p className="message-text">
                                            {message.message}
                                        </p>
                                    )}

                                    {message.attachment && (
                                        <AttachmentBubble attachment={message.attachment} />
                                    )}

                                    <div className="message-time">
                                        {formatTime(message.created_at)}
                                        {isOwnMessage && message.seen && (
                                            <span className="message-seen">
                                                {isRTL ? "دیده شد" : "Seen"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}
"use client";

import {
    ShieldCheck,
    UserRoundCog,
    UsersRound,
    XCircle,
} from "lucide-react";

import type { Conversation } from "@/types/conversation";
import { useLanguage } from "@/context/language-context";

interface Props {
    conversation: Conversation | null;
    userRole?: string | null;
    admins?: {
        id: number;
        name: string | null;
        email: string;
        role: string;
    }[];
    contentManagers?: {
        id: number;
        name: string | null;
        email: string;
        role: string;
    }[];
    onAssignAdmin?: (adminId: number) => void;
    onAssignContentManager?: (contentManagerId: number) => void;
    onCloseConversation?: () => void;
    actionLoading?: boolean;
}

export default function ConversationHeader({
    conversation,
    userRole,
    admins = [],
    contentManagers = [],
    onAssignAdmin,
    onAssignContentManager,
    onCloseConversation,
    actionLoading = false,
}: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    if (!conversation) {
        return (
            <header
                className={`conversation-header empty-state ${
                    isRTL ? "rtl" : "ltr"
                }`}
            >
                <p className="empty-message">
                    {t.dashboard.messages.selectConversation ||
                        "Select a conversation"}
                </p>
            </header>
        );
    }

    const isAdmin =
        typeof userRole === "string" &&
        userRole.trim().toLowerCase() === "admin";

    const isOpen = conversation.status === "open";
    const canManage = isAdmin && isOpen && !actionLoading;

    return (
        <>
            <style jsx>{`
                /* =========================================================
                   RTL / LTR
                ========================================================= */

                .rtl {
                    direction: rtl;
                    text-align: right;
                }

                .ltr {
                    direction: ltr;
                    text-align: left;
                }

                /* =========================================================
                   MAIN CONVERSATION HEADER
                ========================================================= */

                .conversation-header {
                    position: relative;
                    overflow: hidden;

                    padding: 1rem 1.5rem;

                    border-bottom: 1px solid
                        rgba(245, 184, 27, 0.28);

                    background:
                        radial-gradient(
                            circle at 8% 15%,
                            rgba(245, 184, 27, 0.16),
                            transparent 28%
                        ),
                        radial-gradient(
                            circle at 92% 85%,
                            rgba(37, 99, 235, 0.14),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 50% -30%,
                            rgba(255, 255, 255, 0.08),
                            transparent 35%
                        ),
                        linear-gradient(
                            135deg,
                            #06101d 0%,
                            #0a192c 35%,
                            #102942 65%,
                            #071321 100%
                        );

                    transition:
                        background 0.4s ease,
                        box-shadow 0.4s ease;

                    box-shadow:
                        0 8px 35px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0
                            rgba(255, 255, 255, 0.04);
                }

                /* =========================================================
                   GOLD TOP ACCENT
                ========================================================= */

                .conversation-header::before {
                    content: "";

                    position: absolute;

                    top: 0;
                    left: 0;
                    right: 0;

                    height: 2px;

                    background:
                        linear-gradient(
                            90deg,
                            transparent 0%,
                            #c99512 15%,
                            #f5b81b 35%,
                            #ffe082 50%,
                            #f5b81b 65%,
                            #c99512 85%,
                            transparent 100%
                        );

                    box-shadow:
                        0 0 12px rgba(245, 184, 27, 0.7),
                        0 0 30px rgba(245, 184, 27, 0.25);

                    z-index: 2;
                }

                /* =========================================================
                   GOLD BACKGROUND GLOW
                ========================================================= */

                .conversation-header::after {
                    content: "";

                    position: absolute;

                    top: -180px;
                    right: -100px;

                    width: 430px;
                    height: 430px;

                    border-radius: 50%;

                    background:
                        radial-gradient(
                            circle,
                            rgba(245, 184, 27, 0.12) 0%,
                            rgba(245, 184, 27, 0.045) 35%,
                            transparent 70%
                        );

                    pointer-events: none;

                    filter: blur(5px);

                    animation:
                        headerGlow 8s ease-in-out
                        infinite alternate;
                }

                @keyframes headerGlow {
                    from {
                        transform: translate3d(0, 0, 0)
                            scale(1);

                        opacity: 0.7;
                    }

                    to {
                        transform: translate3d(-25px, 15px, 0)
                            scale(1.08);

                        opacity: 1;
                    }
                }

                /* =========================================================
                   EMPTY STATE
                ========================================================= */

                .conversation-header.empty-state {
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    min-height: 80px;

                    background:
                        radial-gradient(
                            circle at 50% 0%,
                            rgba(245, 184, 27, 0.1),
                            transparent 40%
                        ),
                        linear-gradient(
                            135deg,
                            #07111f,
                            #0d2035,
                            #071321
                        );
                }

                .conversation-header.empty-state::before {
                    opacity: 0.5;
                }

                .conversation-header.empty-state::after {
                    display: none;
                }

                .empty-message {
                    position: relative;

                    z-index: 3;

                    color: rgba(255, 255, 255, 0.55);

                    font-size: 0.95rem;

                    font-weight: 400;

                    letter-spacing: 0.4px;

                    background:
                        linear-gradient(
                            135deg,
                            rgba(255, 255, 255, 0.07),
                            rgba(255, 255, 255, 0.025)
                        );

                    padding: 0.55rem 1.5rem;

                    border-radius: 40px;

                    border: 1px solid
                        rgba(245, 184, 27, 0.18);

                    backdrop-filter: blur(10px);

                    box-shadow:
                        0 8px 30px rgba(0, 0, 0, 0.15),
                        inset 0 1px 0
                            rgba(255, 255, 255, 0.04);
                }

                /* =========================================================
                   HEADER INNER
                ========================================================= */

                .header-inner {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    gap: 1.5rem;

                    flex-wrap: wrap;

                    position: relative;

                    z-index: 3;
                }

                /* =========================================================
                   LEFT: AVATAR + INFORMATION
                ========================================================= */

                .info-section {
                    display: flex;

                    align-items: center;

                    gap: 1rem;

                    min-width: 0;
                }

                /* =========================================================
                   AVATAR
                ========================================================= */

                .avatar-wrapper {
                    position: relative;

                    width: 52px;
                    height: 52px;

                    border-radius: 16px;

                    background:
                        linear-gradient(
                            145deg,
                            #ffe082 0%,
                            #f5b81b 40%,
                            #c88f0d 100%
                        );

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    font-size: 1.4rem;

                    font-weight: 700;

                    color: #071321;

                    flex-shrink: 0;

                    border: 1px solid
                        rgba(255, 255, 255, 0.25);

                    box-shadow:
                        0 8px 28px
                            rgba(245, 184, 27, 0.3),
                        inset 0 1px 2px
                            rgba(255, 255, 255, 0.45);

                    transition:
                        transform 0.3s ease,
                        box-shadow 0.3s ease;
                }

                .avatar-wrapper::before {
                    content: "";

                    position: absolute;

                    inset: -5px;

                    border-radius: 20px;

                    border: 1px solid
                        rgba(245, 184, 27, 0.18);

                    opacity: 0;

                    transform: scale(0.85);

                    transition:
                        opacity 0.3s ease,
                        transform 0.3s ease;
                }

                .avatar-wrapper:hover {
                    transform: scale(1.06);

                    box-shadow:
                        0 10px 35px
                            rgba(245, 184, 27, 0.45),
                        inset 0 1px 2px
                            rgba(255, 255, 255, 0.5);
                }

                .avatar-wrapper:hover::before {
                    opacity: 1;

                    transform: scale(1);
                }

                /* =========================================================
                   INFORMATION
                ========================================================= */

                .info-content {
                    min-width: 0;
                }

                .info-title {
                    margin: 0;

                    font-size: 1.05rem;

                    font-weight: 650;

                    color: #ffffff;

                    overflow: hidden;

                    text-overflow: ellipsis;

                    white-space: nowrap;

                    letter-spacing: -0.2px;

                    text-shadow:
                        0 2px 5px
                            rgba(0, 0, 0, 0.35);
                }

                /* =========================================================
                   OFFICIAL SUPPORT BADGE
                ========================================================= */

                .info-badge {
                    display: inline-flex;

                    align-items: center;

                    gap: 0.4rem;

                    margin-top: 0.25rem;

                    font-size: 0.7rem;

                    font-weight: 500;

                    color: #a7d66c;

                    background:
                        linear-gradient(
                            135deg,
                            rgba(139, 195, 74, 0.14),
                            rgba(139, 195, 74, 0.05)
                        );

                    padding: 0.18rem 0.7rem;

                    border-radius: 40px;

                    border: 1px solid
                        rgba(139, 195, 74, 0.2);

                    width: fit-content;

                    backdrop-filter: blur(8px);

                    box-shadow:
                        inset 0 1px 0
                            rgba(255, 255, 255, 0.03);
                }

                .info-badge svg {
                    width: 16px;
                    height: 16px;

                    color: #8bc34a;

                    stroke-width: 2.5;

                    filter:
                        drop-shadow(
                            0 0 5px
                                rgba(139, 195, 74, 0.35)
                        );
                }

                /* =========================================================
                   RIGHT: ACTIONS
                ========================================================= */

                .actions-section {
                    display: flex;

                    flex-wrap: wrap;

                    align-items: center;

                    justify-content: flex-end;

                    gap: 0.5rem;
                }

                /* =========================================================
                   SELECT WRAPPER
                ========================================================= */

                .select-wrapper {
                    position: relative;
                }

                /* =========================================================
                   ASSIGNMENT ICONS - BRIGHT GOLD
                ========================================================= */

                .select-wrapper > svg {
                    position: absolute;

                    top: 50%;

                    transform: translateY(-50%);

                    width: 21px;
                    height: 21px;

                    /* Bright light gold */
                    color: #ffd95a;

                    /* Force the actual Lucide stroke to gold */
                    stroke: #ffd95a;

                    pointer-events: none;

                    z-index: 5;

                    transition:
                        color 0.3s ease,
                        stroke 0.3s ease,
                        transform 0.3s ease,
                        filter 0.3s ease;

                    stroke-width: 2.8;

                    /* Strong but elegant gold glow */
                    filter:
                        drop-shadow(0 0 3px rgba(255, 217, 90, 0.95))
                        drop-shadow(0 0 8px rgba(245, 184, 27, 0.7));
                }

                .ltr .select-wrapper > svg {
                    left: 0.75rem;
                }

                .rtl .select-wrapper > svg {
                    right: 0.75rem;
                }

                .select-wrapper:hover > svg {
                    color: #fff0a8;

                    stroke: #fff0a8;

                    transform:
                        translateY(-50%)
                        scale(1.12);

                    filter:
                        drop-shadow(0 0 4px rgba(255, 240, 168, 1))
                        drop-shadow(0 0 10px rgba(245, 184, 27, 0.9))
                        drop-shadow(0 0 18px rgba(245, 184, 27, 0.4));
                }

                /* =========================================================
                   SELECT
                ========================================================= */

                .select-wrapper select {
                    height: 40px;

                    min-width: 180px;

                    border-radius: 10px;

                    border: 1px solid
                        rgba(255, 255, 255, 0.1);

                    background:
                        linear-gradient(
                            135deg,
                            rgba(255, 255, 255, 0.075),
                            rgba(255, 255, 255, 0.025)
                        );

                    color: #eef2f7;

                    font-size: 0.75rem;

                    font-weight: 500;

                    outline: none;

                    transition: all 0.3s ease;

                    backdrop-filter: blur(12px);

                    appearance: none;

                    cursor: pointer;

                    letter-spacing: 0.3px;

                    box-shadow:
                        0 5px 20px
                            rgba(0, 0, 0, 0.12),
                        inset 0 1px 0
                            rgba(255, 255, 255, 0.03);
                }

                .ltr .select-wrapper select {
                    padding-left: 2.6rem;

                    padding-right: 1rem;
                }

                .rtl .select-wrapper select {
                    padding-right: 2.6rem;

                    padding-left: 1rem;
                }

                .select-wrapper select:hover:not(:disabled) {
                    border-color:
                        rgba(245, 184, 27, 0.45);

                    background:
                        linear-gradient(
                            135deg,
                            rgba(245, 184, 27, 0.09),
                            rgba(255, 255, 255, 0.035)
                        );

                    box-shadow:
                        0 7px 25px
                            rgba(0, 0, 0, 0.18),
                        0 0 20px
                            rgba(245, 184, 27, 0.06);
                }

                .select-wrapper select:focus {
                    border-color: #f5b81b;

                    box-shadow:
                        0 0 0 3px
                            rgba(245, 184, 27, 0.12),
                        0 8px 25px
                            rgba(0, 0, 0, 0.2);

                    background:
                        rgba(10, 22, 40, 0.95);
                }

                .select-wrapper select:disabled {
                    opacity: 0.4;

                    cursor: not-allowed;
                }

                .select-wrapper select option {
                    background: #0a1628;

                    color: #eef2f7;

                    padding: 0.4rem;
                }

                /* =========================================================
                   CLOSE BUTTON
                ========================================================= */

                .close-btn {
                    display: inline-flex;

                    align-items: center;

                    gap: 0.4rem;

                    height: 40px;

                    padding: 0 1.4rem;

                    border-radius: 10px;

                    border: 1px solid
                        rgba(239, 68, 68, 0.3);

                    background:
                        linear-gradient(
                            135deg,
                            rgba(239, 68, 68, 0.13),
                            rgba(239, 68, 68, 0.045)
                        );

                    color: #f87171;

                    font-size: 0.75rem;

                    font-weight: 600;

                    transition: all 0.3s ease;

                    cursor: pointer;

                    letter-spacing: 0.3px;

                    backdrop-filter: blur(10px);

                    box-shadow:
                        0 5px 20px
                            rgba(0, 0, 0, 0.12);
                }

                .close-btn:hover:not(:disabled) {
                    background:
                        linear-gradient(
                            135deg,
                            rgba(239, 68, 68, 0.23),
                            rgba(239, 68, 68, 0.08)
                        );

                    border-color:
                        rgba(239, 68, 68, 0.55);

                    transform: translateY(-1px);

                    box-shadow:
                        0 8px 25px
                            rgba(239, 68, 68, 0.2),
                        0 0 18px
                            rgba(239, 68, 68, 0.05);
                }

                .close-btn:active:not(:disabled) {
                    transform: scale(0.97);
                }

                .close-btn:disabled {
                    opacity: 0.4;

                    cursor: not-allowed;
                }

                .close-btn svg {
                    width: 18px;
                    height: 18px;

                    stroke-width: 2.5;
                }

                /* =========================================================
                   STATUS BADGE
                ========================================================= */

                .status-badge {
                    position: relative;

                    flex-shrink: 0;

                    padding: 0.3rem 1.2rem;

                    border-radius: 40px;

                    font-size: 0.7rem;

                    font-weight: 700;

                    letter-spacing: 0.5px;

                    text-transform: uppercase;

                    border: 1px solid transparent;

                    backdrop-filter: blur(8px);

                    box-shadow:
                        0 5px 18px
                            rgba(0, 0, 0, 0.1);
                }

                .status-badge::before {
                    content: "";

                    display: inline-block;

                    width: 6px;
                    height: 6px;

                    margin-right: 6px;

                    border-radius: 50%;

                    vertical-align: middle;
                }

                .status-badge.open {
                    background:
                        linear-gradient(
                            135deg,
                            rgba(139, 195, 74, 0.18),
                            rgba(139, 195, 74, 0.07)
                        );

                    color: #9bd160;

                    border-color:
                        rgba(139, 195, 74, 0.3);

                    box-shadow:
                        0 5px 20px
                            rgba(139, 195, 74, 0.08);
                }

                .status-badge.open::before {
                    background: #8bc34a;

                    box-shadow:
                        0 0 8px
                            rgba(139, 195, 74, 0.8);

                    animation:
                        onlinePulse 2s infinite;
                }

                .status-badge.closed {
                    background:
                        linear-gradient(
                            135deg,
                            rgba(239, 68, 68, 0.18),
                            rgba(239, 68, 68, 0.07)
                        );

                    color: #f87171;

                    border-color:
                        rgba(239, 68, 68, 0.3);
                }

                .status-badge.closed::before {
                    background: #ef4444;
                }

                @keyframes onlinePulse {
                    0%,
                    100% {
                        transform: scale(1);

                        opacity: 1;
                    }

                    50% {
                        transform: scale(0.7);

                        opacity: 0.45;
                    }
                }

                /* =========================================================
                   RESPONSIVE
                ========================================================= */

                @media (max-width: 820px) {
                    .conversation-header {
                        padding: 0.8rem 1.2rem;
                    }

                    .header-inner {
                        flex-direction: column;

                        align-items: stretch;

                        gap: 0.8rem;
                    }

                    .info-section {
                        flex: 1;
                    }

                    .actions-section {
                        justify-content: stretch;

                        flex-wrap: wrap;
                    }

                    .select-wrapper {
                        flex: 1;

                        min-width: 130px;
                    }

                    .select-wrapper select {
                        min-width: 0;

                        width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .conversation-header {
                        padding: 0.6rem 0.8rem;
                    }

                    .avatar-wrapper {
                        width: 44px;

                        height: 44px;

                        font-size: 1.1rem;

                        border-radius: 14px;
                    }

                    .info-title {
                        font-size: 0.85rem;
                    }

                    .info-badge {
                        font-size: 0.6rem;

                        padding: 0.05rem 0.5rem;
                    }

                    .info-badge svg {
                        width: 14px;

                        height: 14px;
                    }

                    .actions-section {
                        flex-direction: column;

                        width: 100%;
                    }

                    .select-wrapper {
                        width: 100%;
                    }

                    .select-wrapper > svg {
                        width: 18px;
                        height: 18px;
                    }

                    .select-wrapper select {
                        width: 100%;

                        height: 38px;

                        font-size: 0.7rem;
                    }

                    .ltr .select-wrapper select {
                        padding-left: 2.4rem;
                    }

                    .rtl .select-wrapper select {
                        padding-right: 2.4rem;
                    }

                    .close-btn {
                        width: 100%;

                        justify-content: center;

                        height: 38px;

                        font-size: 0.7rem;
                    }

                    .close-btn svg {
                        width: 16px;

                        height: 16px;
                    }

                    .status-badge {
                        align-self: flex-start;

                        font-size: 0.6rem;

                        padding: 0.15rem 0.6rem;
                    }
                }
            `}</style>

            <header
                className={`conversation-header ${
                    isRTL ? "rtl" : "ltr"
                }`}
            >
                <div className="header-inner">
                    {/* Left: Avatar + Info */}
                    <div className="info-section">
                        <div className="avatar-wrapper">
                            {conversation.subject?.charAt(0).toUpperCase() ||
                                "F"}
                        </div>

                        <div className="info-content">
                            <h2 className="info-title">
                                {conversation.subject ||
                                    "Faragostar Support"}
                            </h2>

                            <div className="info-badge">
                                <ShieldCheck />

                                {t.dashboard.messages
                                    .officialSupport ||
                                    "Official Company Support"}
                            </div>
                        </div>
                    </div>

                    {/* Right: Admin Controls + Status */}
                    <div className="actions-section">
                        {isAdmin && (
                            <>
                                {/* Assign Administrator */}
                                <div className="select-wrapper">
                                    <UserRoundCog />

                                    <select
                                        value={
                                            conversation.admin_id ?? ""
                                        }
                                        disabled={!canManage}
                                        onChange={(event) => {
                                            const adminId = Number(
                                                event.target.value
                                            );

                                            if (
                                                adminId &&
                                                onAssignAdmin
                                            ) {
                                                onAssignAdmin(adminId);
                                            }
                                        }}
                                    >
                                        <option value="">
                                            {t.dashboard.messages
                                                .assignAdmin ||
                                                "Assign Administrator"}
                                        </option>

                                        {admins.map((admin) => (
                                            <option
                                                key={admin.id}
                                                value={admin.id}
                                            >
                                                {admin.name ||
                                                    admin.email}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Assign Content Manager */}
                                <div className="select-wrapper">
                                    <UsersRound />

                                    <select
                                        value={
                                            conversation.content_manager_id ??
                                            ""
                                        }
                                        disabled={!canManage}
                                        onChange={(event) => {
                                            const contentManagerId =
                                                Number(
                                                    event.target.value
                                                );

                                            if (
                                                contentManagerId &&
                                                onAssignContentManager
                                            ) {
                                                onAssignContentManager(
                                                    contentManagerId
                                                );
                                            }
                                        }}
                                    >
                                        <option value="">
                                            {t.dashboard.messages
                                                .assignContentManager ||
                                                "Assign Content Manager"}
                                        </option>

                                        {contentManagers.map(
                                            (manager) => (
                                                <option
                                                    key={manager.id}
                                                    value={manager.id}
                                                >
                                                    {manager.name ||
                                                        manager.email}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Close Button */}
                                <button
                                    type="button"
                                    disabled={!canManage}
                                    onClick={() => {
                                        if (
                                            onCloseConversation
                                        ) {
                                            onCloseConversation();
                                        }
                                    }}
                                    className="close-btn"
                                >
                                    <XCircle />

                                    {t.dashboard.messages
                                        .closeConversation ||
                                        "Close"}
                                </button>
                            </>
                        )}

                        {/* Status Badge */}
                        <span
                            className={`status-badge ${
                                isOpen ? "open" : "closed"
                            }`}
                        >
                            {isOpen
                                ? t.dashboard.messages.online ||
                                  "Online"
                                : t.dashboard.messages.closed ||
                                  "Closed"}
                        </span>
                    </div>
                </div>
            </header>
        </>
    );
}
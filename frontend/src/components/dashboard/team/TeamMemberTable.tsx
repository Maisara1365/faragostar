"use client";

import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  User,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

import Button from "@/components/ui/button";

import {
  TeamMember,
} from "@/types/team-member";

import {
  activateTeamMember,
  deactivateTeamMember,
} from "@/services/team-member";

import { useLanguage } from "@/context/language-context";

interface TeamMemberTableProps {
  loading: boolean;
  members: TeamMember[];
  reload: () => Promise<void>;
  onView: (member: TeamMember) => void;
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void;
}

export default function TeamMemberTable({
  loading,
  members,
  reload,
  onView,
  onEdit,
  onDelete,
}: TeamMemberTableProps) {
  const { t, language } = useLanguage();

  //----------------------------------------------------------
  // Helper Functions for Number Formatting
  //----------------------------------------------------------

  const toPersianDigits = (num: number): string => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .split("")
      .map((digit) => persianDigits[parseInt(digit)] || digit)
      .join("");
  };

  const formatNumber = (num: number): string => {
    if (language === "fa") {
      return toPersianDigits(num);
    }
    return num.toString();
  };

  //----------------------------------------------------------
  // Team Member Image URL
  //----------------------------------------------------------

  function getMemberImageUrl(member: TeamMember): string | null {
    const imagePath = member.image;

    if (!imagePath) {
      return null;
    }

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    const backendUrl = (
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    )
      .replace(/\/api\/?$/, "")
      .replace(/\/$/, "");

    const cleanPath = imagePath.replace(/^\/+/, "");
    return `${backendUrl}/${cleanPath}`;
  }

  //----------------------------------------------------------
  // Status
  //----------------------------------------------------------

  async function toggleStatus(member: TeamMember) {
    if (member.status === "active") {
      await deactivateTeamMember(member.id);
    } else {
      await activateTeamMember(member.id);
    }
    await reload();
  }

  //----------------------------------------------------------
  // Loading
  //----------------------------------------------------------

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          padding: "48px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <Loader2
          style={{
            width: "32px",
            height: "32px",
            color: "#2563eb",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  //----------------------------------------------------------
  // Empty
  //----------------------------------------------------------

  if (members.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          padding: "56px 24px",
          textAlign: "center",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "14px",
            backgroundColor: "#f1f5f9",
          }}
        >
          <User
            style={{
              width: "26px",
              height: "26px",
              color: "#64748b",
            }}
          />
        </div>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          {t.dashboard.team.empty || "No team members found."}
        </p>
      </div>
    );
  }

  //----------------------------------------------------------
  // Table
  //----------------------------------------------------------

  return (
    <div
      style={{
        width: "100%",
        padding: "16px",
        borderRadius: "14px",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            padding: "4px",
            boxSizing: "border-box",
          }}
        >
          <table
            className="min-w-full"
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
            }}
          >
            {/* Header */}
            <thead
              style={{
                backgroundColor: "#f8fafc",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: language === "fa" ? "right" : "left",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.dashboard.team.table.member || "Member"}
                </th>

                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: language === "fa" ? "right" : "left",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.dashboard.team.table.designation || "Designation"}
                </th>

                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.dashboard.team.table.social || "Social"}
                </th>

                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.dashboard.team.table.order || "Order"}
                </th>

                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.dashboard.team.table.status || "Status"}
                </th>

                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: language === "fa" ? "left" : "right",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.dashboard.team.table.actions || "Actions"}
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {members.map((member) => {
                const imageUrl = getMemberImageUrl(member);

                return (
                  <tr
                    key={member.id}
                    style={{
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    {/* Member */}
                    <td
                      style={{
                        padding: "18px 20px",
                        verticalAlign: "middle",
                        textAlign: language === "fa" ? "right" : "left",
                        direction: language === "fa" ? "rtl" : "ltr",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          minWidth: "200px",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          boxSizing: "border-box",
                          direction: "ltr",
                        }}
                      >
                        {/* Image / Icon Frame */}
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            minWidth: "48px",
                            flexShrink: 0,
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            border: "2px solid #dbeafe",
                            backgroundColor: "#eff6ff",
                            boxSizing: "border-box",
                            overflow: "hidden",
                            order: language === "fa" ? 2 : 1,
                          }}
                        >
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={member.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                                const fallback =
                                  event.currentTarget.parentElement
                                    ?.querySelector(
                                      "[data-image-fallback]"
                                    ) as HTMLElement | null;
                                if (fallback) {
                                  fallback.style.display = "flex";
                                }
                              }}
                            />
                          ) : null}

                          {/* Fallback Icon */}
                          <div
                            data-image-fallback
                            style={{
                              width: "100%",
                              height: "100%",
                              display: imageUrl ? "none" : "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              backgroundColor: "#dbeafe",
                            }}
                          >
                            <User
                              style={{
                                width: "24px",
                                height: "24px",
                                color: "#2563eb",
                              }}
                            />
                          </div>
                        </div>

                        {/* Member Information */}
                        <div
                          style={{
                            flex: "1 1 auto",
                            minWidth: "0",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            alignItems:
                              language === "fa" ? "flex-end" : "flex-start",
                            textAlign:
                              language === "fa" ? "right" : "left",
                            direction:
                              language === "fa" ? "rtl" : "ltr",
                            order: language === "fa" ? 1 : 2,
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#0f172a",
                              lineHeight: "1.4",
                              textAlign:
                                language === "fa" ? "right" : "left",
                              direction:
                                language === "fa" ? "rtl" : "ltr",
                            }}
                          >
                            {member.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Designation */}
                    <td
                      style={{
                        padding: "18px 20px",
                        color: "#334155",
                        fontSize: "14px",
                        verticalAlign: "middle",
                        textAlign: language === "fa" ? "right" : "left",
                        direction: language === "fa" ? "rtl" : "ltr",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "180px",
                          wordBreak: "break-word",
                        }}
                      >
                        {member.designation}
                      </div>
                    </td>

                    {/* Social Media Icons */}
                    <td
                      style={{
                        padding: "18px 20px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        {member.facebook && (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              padding: "4px",
                              borderRadius: "4px",
                              color: "#1877f2",
                              transition: "all 0.2s",
                            }}
                          >
                            <Facebook size={18} />
                          </a>
                        )}
                        {member.instagram && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              padding: "4px",
                              borderRadius: "4px",
                              color: "#e4405f",
                              transition: "all 0.2s",
                            }}
                          >
                            <Instagram size={18} />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              padding: "4px",
                              borderRadius: "4px",
                              color: "#0a66c2",
                              transition: "all 0.2s",
                            }}
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                        {!member.facebook && !member.instagram && !member.linkedin && (
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#94a3b8",
                            }}
                          >
                            —
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Order */}
                    <td
                      style={{
                        padding: "18px 20px",
                        textAlign: "center",
                        color: "#334155",
                        fontSize: "14px",
                        verticalAlign: "middle",
                        direction: "ltr",
                      }}
                    >
                      {formatNumber(Number(member.display_order ?? 0))}
                    </td>

                    {/* Status */}
                    <td
                      style={{
                        padding: "18px 20px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleStatus(member)}
                        >
                          {member.status === "active" ? (
                            <CheckCircle2
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#16a34a",
                              }}
                            />
                          ) : (
                            <XCircle
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#dc2626",
                              }}
                            />
                          )}
                        </Button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td
                      style={{
                        padding: "18px 20px",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: language === "fa" ? "flex-start" : "flex-end",
                          alignItems: "center",
                          gap: "8px",
                          direction: "ltr",
                        }}
                      >
                        {/* View */}
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => onView(member)}
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
                          onClick={() => onEdit(member)}
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

                        {/* Delete */}
                        <Button
                          size="icon"
                          variant="danger"
                          onClick={() => onDelete(member)}
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
                          <Trash2
                            style={{
                              display: "block",
                              width: "18px",
                              height: "18px",
                              minWidth: "18px",
                              minHeight: "18px",
                              color: "#dc2626",
                              stroke: "#dc2626",
                              strokeWidth: 2.2,
                              opacity: 1,
                              visibility: "visible",
                            }}
                          />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
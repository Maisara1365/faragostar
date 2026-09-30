"use client";

import {
  Calendar,
  User,
  Briefcase,
  Facebook,
  Instagram,
  Linkedin,
  Hash,
  Globe,
} from "lucide-react";

import { TeamMember } from "@/types/team-member";
import { useLanguage } from "@/context/language-context";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

interface Props {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberDetailsDrawer({
  open,
  member,
  onClose,
}: Props) {
  const { t, language } = useLanguage();

  if (!member) return null;

  function getImageUrl(imagePath: string | null): string | null {
    if (!imagePath) return null;

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

  const imageUrl = getImageUrl(member.image);

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
            {t.dashboard.team.details}
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
          {/* Profile Image + Basic Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "4px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                border: "3px solid #e2e8f0",
                background: "#f1f5f9",
                overflow: "hidden",
                flexShrink: 0,
                width: "120px",
                height: "120px",
                position: "relative",
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={member.name}
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "120px",
                    width: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#dbeafe",
                  }}
                >
                  <User
                    style={{
                      width: "48px",
                      height: "48px",
                      color: "#2563eb",
                    }}
                  />
                </div>
              )}
            </div>

            <div
              style={{
                flex: 1,
                padding: "4px",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  margin: 0,
                  padding: "4px",
                  color: "#000000",
                }}
              >
                {member.name}
              </h2>

              <p
                style={{
                  marginTop: "8px",
                  color: "#475569",
                  padding: "4px",
                  fontSize: "18px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Briefcase
                  style={{
                    width: "18px",
                    height: "18px",
                    color: "#64748b",
                  }}
                />
                {member.designation}
              </p>

              {/* Status Badge */}
              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <Badge
                  variant={
                    member.status === "active" ? "default" : "secondary"
                  }
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "4px 14px",
                  }}
                >
                  {member.status === "active"
                    ? t.common.active
                    : t.common.inactive}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <div
              style={{
                padding: "4px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <h3
                style={{
                  marginBottom: "12px",
                  fontSize: "20px",
                  fontWeight: 700,
                  padding: "4px",
                  color: "#000000",
                }}
              >
                {t.dashboard.team.bio}
              </h3>

              <p
                style={{
                  lineHeight: 1.8,
                  color: "#334155",
                  whiteSpace: "pre-line",
                  padding: "4px",
                  fontSize: "16px",
                }}
              >
                {member.bio}
              </p>
            </div>
          )}

          {/* Social Media */}
          {(member.facebook || member.instagram || member.linkedin) && (
            <div
              style={{
                padding: "4px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <h3
                style={{
                  marginBottom: "12px",
                  fontSize: "20px",
                  fontWeight: 700,
                  padding: "4px",
                  color: "#000000",
                }}
              >
                {t.dashboard.team.socialMedia}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  padding: "4px",
                }}
              >
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      backgroundColor: "#f0f2f5",
                      color: "#1877f2",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Facebook size={20} />
                    Facebook
                  </a>
                )}

                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      backgroundColor: "#fdf2f6",
                      color: "#e4405f",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Instagram size={20} />
                    Instagram
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      backgroundColor: "#e8f0fe",
                      color: "#0a66c2",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Linkedin size={20} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Information Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              padding: "4px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            {/* Display Order */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                padding: "16px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <Hash
                style={{
                  height: "20px",
                  width: "20px",
                  color: "#2563eb",
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    margin: 0,
                    padding: "2px 4px",
                    fontWeight: 600,
                  }}
                >
                  {t.dashboard.team.displayOrder}
                </p>
                <p
                  style={{
                    fontWeight: 600,
                    margin: 0,
                    padding: "2px 4px",
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  {member.display_order}
                </p>
              </div>
            </div>

            {/* Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                padding: "16px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <Globe
                style={{
                  height: "20px",
                  width: "20px",
                  color: "#2563eb",
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    margin: 0,
                    padding: "2px 4px",
                    fontWeight: 600,
                  }}
                >
                  {t.common.status}
                </p>
                <p
                  style={{
                    fontWeight: 600,
                    margin: 0,
                    padding: "2px 4px",
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  {member.status === "active"
                    ? t.common.active
                    : t.common.inactive}
                </p>
              </div>
            </div>

            {/* Created At */}
            {member.created_at && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  padding: "16px",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <Calendar
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "#2563eb",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      margin: 0,
                      padding: "2px 4px",
                      fontWeight: 600,
                    }}
                  >
                    {t.common.createdAt}
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      margin: 0,
                      padding: "2px 4px",
                      fontSize: "16px",
                      color: "#0f172a",
                    }}
                  >
                    {new Date(member.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {/* Updated At */}
            {member.updated_at && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  padding: "16px",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <Calendar
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "#2563eb",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      margin: 0,
                      padding: "2px 4px",
                      fontWeight: 600,
                    }}
                  >
                    {t.common.updatedAt}
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      margin: 0,
                      padding: "2px 4px",
                      fontSize: "16px",
                      color: "#0f172a",
                    }}
                  >
                    {new Date(member.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
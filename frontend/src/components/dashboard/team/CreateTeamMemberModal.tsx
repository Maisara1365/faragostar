"use client";

import { useEffect, useState } from "react";
import { Loader2, UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { CreateTeamMemberData } from "@/types/team-member";
import { useLanguage } from "@/context/language-context";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
}

const initialState: CreateTeamMemberData = {
  name_fa: "",
  name_en: "",
  designation_fa: "",
  designation_en: "",
  bio_fa: "",
  bio_en: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  display_order: 0,
  status: "active",
};

export default function CreateTeamMemberModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const { t } = useLanguage();

  const [form, setForm] = useState<CreateTeamMemberData>(initialState);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      setForm(initialState);
      setImage(null);
    }
  }, [open]);

  function update<K extends keyof CreateTeamMemberData>(
    key: K,
    value: CreateTeamMemberData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    const data = new FormData();

    data.append("name_fa", form.name_fa ?? "");
    data.append("name_en", form.name_en ?? "");
    data.append("designation_fa", form.designation_fa ?? "");
    data.append("designation_en", form.designation_en ?? "");
    data.append("bio_fa", form.bio_fa ?? "");
    data.append("bio_en", form.bio_en ?? "");
    data.append("facebook", form.facebook ?? "");
    data.append("instagram", form.instagram ?? "");
    data.append("linkedin", form.linkedin ?? "");
    data.append("display_order", String(form.display_order ?? 0));
    data.append("status", form.status ?? "active");

    if (image) {
      data.append("image", image);
    }

    await onSubmit(data);
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
            <div
              className="flex items-center gap-2"
              style={{
                padding: "4px",
              }}
            >
              <UserPlus className="h-5 w-5" />
              {t.dashboard.team.create}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div
          className="grid gap-6"
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
          }}
        >
          {/* Names */}
          <div
            className="grid gap-4 md:grid-cols-2"
            style={{
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
            }}
          >
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
                {t.dashboard.team.nameFa}
              </label>
              <Input
                value={form.name_fa}
                onChange={(e) => update("name_fa", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

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
                {t.dashboard.team.nameEn}
              </label>
              <Input
                value={form.name_en}
                onChange={(e) => update("name_en", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Designations */}
          <div
            className="grid gap-4 md:grid-cols-2"
            style={{
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
            }}
          >
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
                {t.dashboard.team.designationFa}
              </label>
              <Input
                value={form.designation_fa}
                onChange={(e) => update("designation_fa", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

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
                {t.dashboard.team.designationEn}
              </label>
              <Input
                value={form.designation_en}
                onChange={(e) => update("designation_en", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Bios */}
          <div
            className="grid gap-4 md:grid-cols-2"
            style={{
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
            }}
          >
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
                {t.dashboard.team.bioFa}
              </label>
              <Textarea
                rows={4}
                value={form.bio_fa}
                onChange={(e) => update("bio_fa", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

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
                {t.dashboard.team.bioEn}
              </label>
              <Textarea
                rows={4}
                value={form.bio_en}
                onChange={(e) => update("bio_en", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Image */}
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
              {t.dashboard.team.image}
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Social Media */}
          <div
            className="grid gap-4 md:grid-cols-3"
            style={{
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
            }}
          >
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
                {t.dashboard.team.facebook}
              </label>
              <Input
                value={form.facebook}
                onChange={(e) => update("facebook", e.target.value)}
                placeholder="https://facebook.com/..."
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

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
                {t.dashboard.team.instagram}
              </label>
              <Input
                value={form.instagram}
                onChange={(e) => update("instagram", e.target.value)}
                placeholder="https://instagram.com/..."
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

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
                {t.dashboard.team.linkedin}
              </label>
              <Input
                value={form.linkedin}
                onChange={(e) => update("linkedin", e.target.value)}
                placeholder="https://linkedin.com/..."
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Settings */}
          <div
            className="grid gap-4 md:grid-cols-2"
            style={{
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
            }}
          >
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
                {t.dashboard.team.displayOrder}
              </label>
              <Input
                type="number"
                value={form.display_order}
                onChange={(e) => update("display_order", Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

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
                {t.dashboard.team.status}
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as "active" | "inactive")
                }
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                }}
              >
                <option value="active">{t.common.active}</option>
                <option value="inactive">{t.common.inactive}</option>
              </select>
            </div>
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
          <Button
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

          <Button
            onClick={handleSubmit}
            disabled={loading}
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
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxSizing: "border-box",
            }}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            {t.dashboard.team.create}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
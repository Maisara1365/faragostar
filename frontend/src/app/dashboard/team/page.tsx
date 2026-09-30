"use client";

import { useEffect, useMemo, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import TeamMemberTable from "@/components/dashboard/team/TeamMemberTable";
import CreateTeamMemberModal from "@/components/dashboard/team/CreateTeamMemberModal";
import EditTeamMemberModal from "@/components/dashboard/team/EditTeamMemberModal";
import TeamMemberDetailsDrawer from "@/components/dashboard/team/TeamMemberDetailsDrawer";
import DeleteTeamMemberDialog from "@/components/dashboard/team/DeleteTeamMemberDialog";

import {
  getAdminTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/services/team-member";

import type {
  TeamMember,
} from "@/types/team-member";

import { useLanguage } from "@/context/language-context";

import {
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  UserPlus,
  Search,
} from "lucide-react";

import Button from "@/components/ui/button";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TeamMembersPage() {
  const { t, language } = useLanguage();

  // ============================================================
  // Loading States
  // ============================================================

  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);

  // ============================================================
  // Team Members
  // ============================================================

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // ============================================================
  // Filters
  // ============================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ============================================================
  // Dialog States
  // ============================================================

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // ============================================================
  // Helper Functions for Number Formatting
  // ============================================================

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

  // ============================================================
  // Load Team Members
  // ============================================================

  async function loadMembers() {
    try {
      setLoading(true);
      const data = await getAdminTeamMembers();
      
      // Map localized fields
      const mappedMembers = data.map((member: TeamMember) => ({
        ...member,
        name: language === "fa" ? member.name_fa : member.name_en,
        designation: language === "fa" ? member.designation_fa : member.designation_en,
        bio: language === "fa" ? member.bio_fa : member.bio_en,
      }));

      setMembers(mappedMembers);
    } catch (error) {
      console.error("Failed to load team members:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, [language]);

  // ============================================================
  // Statistics
  // ============================================================

  const statistics = useMemo(() => {
    return {
      total: members.length,
      active: members.filter((member) => member.status === "active").length,
      inactive: members.filter((member) => member.status === "inactive").length,
    };
  }, [members]);

  const formattedStatistics = useMemo(() => {
    return {
      total: formatNumber(statistics.total),
      active: formatNumber(statistics.active),
      inactive: formatNumber(statistics.inactive),
    };
  }, [statistics, language]);

  // ============================================================
  // Filtering
  // ============================================================

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        member.name.toLowerCase().includes(searchValue) ||
        member.name_fa.toLowerCase().includes(searchValue) ||
        member.name_en.toLowerCase().includes(searchValue) ||
        member.designation.toLowerCase().includes(searchValue) ||
        member.designation_fa.toLowerCase().includes(searchValue) ||
        member.designation_en.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ? true : member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  // ============================================================
  // Create Team Member
  // ============================================================

  async function handleCreate(data: FormData) {
    try {
      setOperationLoading(true);
      await createTeamMember(data);
      await loadMembers();
      setCreateOpen(false);
    } catch (error: any) {
      console.error("CREATE TEAM MEMBER STATUS:", error?.response?.status);
      console.error("CREATE TEAM MEMBER RESPONSE:", error?.response?.data);
    } finally {
      setOperationLoading(false);
    }
  }

  // ============================================================
  // Update Team Member
  // ============================================================

  async function handleUpdate(id: number, data: FormData) {
    try {
      setOperationLoading(true);
      await updateTeamMember(id, data);
      await loadMembers();
      setEditOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error("Failed to update team member:", error);
    } finally {
      setOperationLoading(false);
    }
  }

  // ============================================================
  // Delete Team Member
  // ============================================================

  async function handleDelete(id: number) {
    try {
      setOperationLoading(true);
      await deleteTeamMember(id);
      await loadMembers();
      setDeleteOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error("Failed to delete team member:", error);
    } finally {
      setOperationLoading(false);
    }
  }

  // ============================================================
  // Render
  // ============================================================

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <Header />

      <DashboardShell
        title={t.dashboard.team.title}
        description={t.dashboard.team.subtitle}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            padding: "8px",
            width: "100%",
          }}
        >
          {/* ==================================================
              Statistics
          ================================================== */}

          <div
            className="grid gap-6 md:grid-cols-3"
            style={{
              gap: "24px",
              padding: "4px",
            }}
          >
            {/* Total */}
            <div
              className="rounded-2xl border bg-white"
              style={{
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                minHeight: "160px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  marginBottom: "16px",
                  padding: "8px",
                }}
              >
                <Users
                  style={{
                    width: "28px",
                    height: "28px",
                    color: "#2563eb",
                  }}
                />
              </div>

              <p className="text-sm text-slate-500">
                {t.dashboard.team.statistics.total}
              </p>

              <h3
                className="text-3xl font-bold"
                style={{
                  marginTop: "8px",
                  direction: "ltr",
                }}
              >
                {formattedStatistics.total}
              </h3>
            </div>

            {/* Active */}
            <div
              className="rounded-2xl border bg-white"
              style={{
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                minHeight: "160px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#ecfdf5",
                  marginBottom: "16px",
                  padding: "8px",
                }}
              >
                <CheckCircle2
                  style={{
                    width: "28px",
                    height: "28px",
                    color: "#16a34a",
                  }}
                />
              </div>

              <p className="text-sm text-slate-500">
                {t.dashboard.team.statistics.active}
              </p>

              <h3
                className="text-3xl font-bold"
                style={{
                  marginTop: "8px",
                  direction: "ltr",
                }}
              >
                {formattedStatistics.active}
              </h3>
            </div>

            {/* Inactive */}
            <div
              className="rounded-2xl border bg-white"
              style={{
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                minHeight: "160px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#fef2f2",
                  marginBottom: "16px",
                  padding: "8px",
                }}
              >
                <XCircle
                  style={{
                    width: "28px",
                    height: "28px",
                    color: "#ef4444",
                  }}
                />
              </div>

              <p className="text-sm text-slate-500">
                {t.dashboard.team.statistics.inactive}
              </p>

              <h3
                className="text-3xl font-bold"
                style={{
                  marginTop: "8px",
                  direction: "ltr",
                }}
              >
                {formattedStatistics.inactive}
              </h3>
            </div>
          </div>

          {/* ==================================================
              Filters
          ================================================== */}

          <div
            className="flex flex-col rounded-2xl border bg-white lg:flex-row lg:items-center"
            style={{
              gap: "16px",
              padding: "24px",
              marginTop: "4px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
            }}
          >
            {/* Search */}
            <div
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <Search
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "18px",
                  height: "18px",
                  color: "#94a3b8",
                }}
              />
              <input
                type="text"
                placeholder={t.dashboard.team.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 44px",
                  minHeight: "46px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  outline: "none",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "12px 16px",
                minHeight: "46px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                fontSize: "14px",
                minWidth: "140px",
                boxSizing: "border-box",
              }}
            >
              <option value="all">{t.common.all}</option>
              <option value="active">{t.common.active}</option>
              <option value="inactive">{t.common.inactive}</option>
            </select>

            {/* Create Team Member Button */}
            <Button
              onClick={() => setCreateOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                minHeight: "48px",
                padding: "32px 12px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                color: "#1e40af",
                border: "1px solid #93c5fd",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1px",
                boxShadow: "0 4px 10px rgba(59, 130, 246, 0.15)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 5px rgba(37, 99, 235, 0.12)",
                }}
              >
                <UserPlus
                  style={{
                    width: "17px",
                    height: "17px",
                    color: "#2563eb",
                    strokeWidth: 2.5,
                  }}
                />
              </span>

              <span>{t.dashboard.team.create}</span>
            </Button>
          </div>

          {/* ==================================================
              Team Member Table
          ================================================== */}

          <div
            style={{
              width: "100%",
              padding: "4px",
              marginTop: "4px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                padding: "4px",
                boxSizing: "border-box",
              }}
            >
              <TeamMemberTable
                loading={loading}
                members={filteredMembers}
                reload={loadMembers}
                onView={(member) => {
                  setSelectedMember(member);
                  setDetailsOpen(true);
                }}
                onEdit={(member) => {
                  setSelectedMember(member);
                  setEditOpen(true);
                }}
                onDelete={(member) => {
                  setSelectedMember(member);
                  setDeleteOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </DashboardShell>

      {/* ==========================================================
          Create Team Member
      ========================================================== */}

      <CreateTeamMemberModal
        open={createOpen}
        loading={operationLoading}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />

      {/* ==========================================================
          Edit Team Member
      ========================================================== */}

      <EditTeamMemberModal
        open={editOpen}
        loading={operationLoading}
        member={selectedMember}
        onClose={() => {
          setEditOpen(false);
          setSelectedMember(null);
        }}
        onSubmit={handleUpdate}
      />

      {/* ==========================================================
          Team Member Details
      ========================================================== */}

      <TeamMemberDetailsDrawer
        open={detailsOpen}
        member={selectedMember}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedMember(null);
        }}
      />

      {/* ==========================================================
          Delete Team Member
      ========================================================== */}

      <DeleteTeamMemberDialog
        open={deleteOpen}
        loading={operationLoading}
        member={selectedMember}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedMember(null);
        }}
        onDelete={handleDelete}
      />

      <Footer />
    </AuthGuard>
  );
}
import { api } from "@/services/api";

import { TeamMember } from "@/types/team-member";

// ============================================================
// Public Routes (No Authentication Required)
// ============================================================

/**
 * Get active team members for the public website
 * This is used on the frontend team page
 */
export async function getTeamMembers(
    language: "fa" | "en"
): Promise<TeamMember[]> {
    const response = await api.get(
        "/team-members"
    );

    const members = response.data.data;

    return members.map(
        (member: TeamMember) => ({
            ...member,

            name:
                language === "fa"
                    ? member.name_fa
                    : member.name_en,

            designation:
                language === "fa"
                    ? member.designation_fa
                    : member.designation_en,

            bio:
                language === "fa"
                    ? member.bio_fa
                    : member.bio_en,
        })
    );
}

// ============================================================
// Protected Admin Routes (Authentication Required)
// ============================================================

/**
 * Get all team members for admin dashboard
 */
export async function getAdminTeamMembers(): Promise<TeamMember[]> {
    const response = await api.get("/admin/team-members");
    return response.data.data;
}

/**
 * Get single team member by ID
 */
export async function getTeamMember(
    id: number
): Promise<TeamMember> {
    const response = await api.get(`/admin/team-members/${id}`);
    return response.data.data;
}

/**
 * Create a new team member
 */
export async function createTeamMember(
    data: FormData
): Promise<TeamMember> {
    const response = await api.post("/admin/team-members", data);
    return response.data.data;
}

/**
 * Update an existing team member
 */
export async function updateTeamMember(
    id: number,
    data: FormData
): Promise<TeamMember> {
    // Laravel requires _method PUT for form data
    data.append("_method", "PUT");
    const response = await api.post(`/admin/team-members/${id}`, data);
    return response.data.data;
}

/**
 * Delete a team member
 */
export async function deleteTeamMember(
    id: number
): Promise<void> {
    await api.delete(`/admin/team-members/${id}`);
}

/**
 * Activate a team member
 */
export async function activateTeamMember(
    id: number
): Promise<TeamMember> {
    const response = await api.patch(`/admin/team-members/${id}/activate`);
    return response.data.data;
}

/**
 * Deactivate a team member
 */
export async function deactivateTeamMember(
    id: number
): Promise<TeamMember> {
    const response = await api.patch(`/admin/team-members/${id}/deactivate`);
    return response.data.data;
}
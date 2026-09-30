export type TeamMemberStatus = "active" | "inactive";

export interface TeamMember {
    id: number;

    // Localized fields (based on current language)
    name: string;
    designation: string;
    bio: string | null;

    // Multilingual fields
    name_fa: string;
    name_en: string;
    designation_fa: string;
    designation_en: string;
    bio_fa: string | null;
    bio_en: string | null;

    // Media
    image: string | null;

    // Social Media
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;

    // Display
    display_order: number;

    // Status
    status: "active" | "inactive";

    // Timestamps (for admin dashboard)
    created_at?: string;
    updated_at?: string;
}

export interface CreateTeamMemberData {
    name_fa: string;
    name_en: string;
    designation_fa: string;
    designation_en: string;
    bio_fa?: string;
    bio_en?: string;
    image?: File | null;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    display_order?: number;
    status?: TeamMemberStatus;
}

export interface UpdateTeamMemberData extends Partial<CreateTeamMemberData> {}

export interface TeamMemberFilters {
    search?: string;
    status?: TeamMemberStatus | "all";
}

// Pagination (if needed for future)
export interface TeamMemberListResponse {
    data: TeamMember[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

// Statistics (for dashboard)
export interface TeamMemberStatistics {
    total: number;
    active: number;
    inactive: number;
}
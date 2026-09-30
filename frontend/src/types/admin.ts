/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

export interface Admin {

    id: number;

    name: string;

    email: string;

    phone: string | null;

    role: string;

    status: "active" | "blocked";

    language: "fa" | "en";

    profile_photo_path: string | null;

    profile_photo_url: string | null;

    email_verified: boolean;

    email_verified_at: string | null;

    must_change_password: boolean;

    created_at: string;

    updated_at: string;

}

/*
|--------------------------------------------------------------------------
| Pagination Links
|--------------------------------------------------------------------------
*/

export interface PaginationLink {

    url: string | null;

    label: string;

    active: boolean;

}

/*
|--------------------------------------------------------------------------
| Pagination Meta
|--------------------------------------------------------------------------
*/

export interface PaginationMeta {

    current_page: number;

    from: number | null;

    last_page: number;

    links: PaginationLink[];

    path: string;

    per_page: number;

    to: number | null;

    total: number;

}

/*
|--------------------------------------------------------------------------
| Paginated Response
|--------------------------------------------------------------------------
*/

export interface AdminListResponse {

    data: Admin[];

    meta: PaginationMeta;

}

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

export interface AdminFilters {

    search?: string;

    status?: "active" | "blocked";

    language?: "fa" | "en";

    verified?: boolean;

    per_page?: number;

}

/*
|--------------------------------------------------------------------------
| Create Administrator
|--------------------------------------------------------------------------
*/

export interface CreateAdminPayload {

    name: string;

    email: string;

    phone?: string;

}

/*
|--------------------------------------------------------------------------
| Update Administrator
|--------------------------------------------------------------------------
*/

export interface UpdateAdminPayload {

    name: string;

    email: string;

    phone?: string;

    language?: "fa" | "en";

}

/*
|--------------------------------------------------------------------------
| Single Administrator Response
|--------------------------------------------------------------------------
*/

export type AdminResponse = Admin;

/*
|--------------------------------------------------------------------------
| Statistics Cards
|--------------------------------------------------------------------------
*/

export interface AdminDashboardStatistics {

    total: number;

    active: number;

    blocked: number;

    verified: number;

}
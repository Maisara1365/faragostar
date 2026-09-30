import { api } from "@/services/api";

import type {
    Admin,
    AdminFilters,
    AdminListResponse,
    CreateAdminPayload,
    UpdateAdminPayload,
} from "@/types/admin";

/*
|--------------------------------------------------------------------------
| Get Administrators
|--------------------------------------------------------------------------
*/

export async function getAdmins(
    filters?: AdminFilters
): Promise<AdminListResponse> {

    const response = await api.get(
        "/admin/admins",
        {
            params: filters,
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Administrator
|--------------------------------------------------------------------------
*/

export async function getAdmin(
    id: number
): Promise<Admin> {

    const response = await api.get(
        `/admin/admins/${id}`
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Create Administrator
|--------------------------------------------------------------------------
*/

export async function createAdmin(
    payload: CreateAdminPayload
): Promise<void> {

    await api.post(
        "/admin/admins",
        payload
    );

}

/*
|--------------------------------------------------------------------------
| Update Administrator
|--------------------------------------------------------------------------
*/

export async function updateAdmin(
    id: number,
    payload: UpdateAdminPayload
): Promise<void> {

    await api.put(
        `/admin/admins/${id}`,
        payload
    );

}

/*
|--------------------------------------------------------------------------
| Activate Administrator
|--------------------------------------------------------------------------
*/

export async function activateAdmin(
    id: number
): Promise<void> {

    await api.patch(
        `/admin/admins/${id}/activate`
    );

}

/*
|--------------------------------------------------------------------------
| Block Administrator
|--------------------------------------------------------------------------
*/

export async function blockAdmin(
    id: number
): Promise<void> {

    await api.patch(
        `/admin/admins/${id}/block`
    );

}
import { api } from "@/services/api";

import type {
    ContentManager,
    ContentManagerFilters,
    ContentManagerListResponse,
    CreateContentManagerPayload,
    UpdateContentManagerPayload,
} from "@/types/content-manager";

/*
|--------------------------------------------------------------------------
| Get Content Managers
|--------------------------------------------------------------------------
*/

export async function getContentManagers(
    filters?: ContentManagerFilters
): Promise<ContentManagerListResponse> {

    const response = await api.get(
        "/admin/content-managers",
        {
            params: filters,
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Content Manager
|--------------------------------------------------------------------------
*/

export async function getContentManager(
    id: number
): Promise<ContentManager> {

    const response = await api.get(
        `/admin/content-managers/${id}`
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Create Content Manager
|--------------------------------------------------------------------------
*/

export async function createContentManager(
    payload: CreateContentManagerPayload
): Promise<void> {

    await api.post(
        "/admin/content-managers",
        payload
    );

}

/*
|--------------------------------------------------------------------------
| Update Content Manager
|--------------------------------------------------------------------------
*/

export async function updateContentManager(
    id: number,
    payload: UpdateContentManagerPayload
): Promise<void> {

    await api.put(
        `/admin/content-managers/${id}`,
        payload
    );

}

/*
|--------------------------------------------------------------------------
| Activate Content Manager
|--------------------------------------------------------------------------
*/

export async function activateContentManager(
    id: number
): Promise<void> {

    await api.patch(
        `/admin/content-managers/${id}/activate`
    );

}

/*
|--------------------------------------------------------------------------
| Block Content Manager
|--------------------------------------------------------------------------
*/

export async function blockContentManager(
    id: number
): Promise<void> {

    await api.patch(
        `/admin/content-managers/${id}/block`
    );

}
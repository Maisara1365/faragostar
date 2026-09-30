import { api } from "./api";

import type {
    Service,
} from "@/types/service";

// ============================================================
// Get Correct Service Base Route
// ============================================================
//
// Admin:
//      /admin/services
//
// Content Manager:
//      /content-manager/services
//
// The user's role is determined from /me.
// ============================================================

async function getServiceBaseRoute(): Promise<string> {

    const response = await api.get("/me");

    const user = response.data.data ?? response.data;

    if (user.role === "content_manager") {
        return "/content-manager/services";
    }

    if (user.role === "admin") {
        return "/admin/services";
    }

    throw new Error(
        "Unauthorized: You do not have permission to manage services."
    );
}


// ============================================================
// Get All Services
// ============================================================

export async function getServices(): Promise<Service[]> {

    const baseRoute = await getServiceBaseRoute();

    const response = await api.get(
        baseRoute
    );

    return response.data.data;
}


// ============================================================
// Get Single Service
// ============================================================

export async function getService(
    id: number
): Promise<Service> {

    const baseRoute = await getServiceBaseRoute();

    const response = await api.get(
        `${baseRoute}/${id}`
    );

    return response.data.data;
}


// ============================================================
// Create Service
// ============================================================

export async function createService(
    data: FormData
): Promise<Service> {

    const baseRoute = await getServiceBaseRoute();

    const response = await api.post(
        baseRoute,
        data
    );

    return response.data.data;
}


// ============================================================
// Update Service
// ============================================================

export async function updateService(
    id: number,
    data: FormData
): Promise<Service> {

    /*
    |--------------------------------------------------------------------------
    | Laravel + multipart/form-data
    |--------------------------------------------------------------------------
    |
    | Send the FormData directly.
    | Do NOT use Object.entries(data).
    |
    */

    data.append("_method", "PUT");

    const baseRoute = await getServiceBaseRoute();

    const response = await api.post(
        `${baseRoute}/${id}`,
        data
    );

    return response.data.data;
}


// ============================================================
// Delete Service
// ============================================================

export async function deleteService(
    id: number
): Promise<void> {

    const baseRoute = await getServiceBaseRoute();

    await api.delete(
        `${baseRoute}/${id}`
    );
}


// ============================================================
// Activate Service
// ============================================================

export async function activateService(
    id: number
): Promise<Service> {

    const baseRoute = await getServiceBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/activate`
    );

    return response.data.data;
}


// ============================================================
// Deactivate Service
// ============================================================

export async function deactivateService(
    id: number
): Promise<Service> {

    const baseRoute = await getServiceBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/deactivate`
    );

    return response.data.data;
}


// ============================================================
// Feature Service
// ============================================================

export async function featureService(
    id: number
): Promise<Service> {

    const baseRoute = await getServiceBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/feature`
    );

    return response.data.data;
}


// ============================================================
// Unfeature Service
// ============================================================

export async function unfeatureService(
    id: number
): Promise<Service> {

    const baseRoute = await getServiceBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/unfeature`
    );

    return response.data.data;
}

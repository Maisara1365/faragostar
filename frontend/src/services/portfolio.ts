import { api } from "@/services/api";

import type {
    Portfolio,
    PortfolioFormData,
} from "@/types/portfolio";

/*
|--------------------------------------------------------------------------
| Portfolio Management Endpoints
|--------------------------------------------------------------------------
|
| Admin:
|     /admin/portfolio
|
| Content Manager:
|     /content-manager/portfolio
|
*/


// ==========================================================================
// Get Correct Portfolio Management Route
// ==========================================================================

async function getPortfolioBaseRoute(): Promise<string> {

    const response = await api.get("/me");

    const user = response.data.data ?? response.data;

    if (user.role === "content_manager") {
        return "/content-manager/portfolio";
    }

    if (user.role === "admin") {
        return "/admin/portfolio";
    }

    throw new Error(
        "Unauthorized: You do not have permission to manage portfolio."
    );
}


// ==========================================================================
// Get All Portfolio
// ==========================================================================

export async function getPortfolio(): Promise<Portfolio[]> {

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.get(
        baseRoute
    );

    return response.data.data;
}


// ==========================================================================
// Get Active Portfolio (Public)
// ==========================================================================

export async function getActivePortfolio(): Promise<Portfolio[]> {

    const response = await api.get(
        "/portfolio"
    );

    return response.data.data;
}


// ==========================================================================
// Get Featured Portfolio (Public)
// ==========================================================================

export async function getFeaturedPortfolio(): Promise<Portfolio[]> {

    const response = await api.get(
        "/portfolio/featured"
    );

    return response.data.data;
}


// ==========================================================================
// Get Single Portfolio (Public)
// ==========================================================================

export async function getPortfolioBySlug(
    slug: string
): Promise<Portfolio> {

    const response = await api.get(
        `/portfolio/${slug}`
    );

    return response.data.data;
}


// ==========================================================================
// Get Single Portfolio (Admin / Content Manager)
// ==========================================================================

export async function getPortfolioById(
    id: number
): Promise<Portfolio> {

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.get(
        `${baseRoute}/${id}`
    );

    return response.data.data;
}


// ==========================================================================
// Helper: Append Form Data With Correct Type Coercion
// ==========================================================================
//
// FormData stringifies everything. A JS boolean `false` becomes the
// string "false", which Laravel's boolean validation rule can reject
// depending on how it arrives through multipart parsing.
//
// Coercing booleans to "1"/"0" explicitly avoids that ambiguity.
//

function appendFormData(
    formData: FormData,
    data: PortfolioFormData
) {

    Object.entries(data).forEach(([key, value]) => {

        if (
            value !== undefined &&
            value !== null
        ) {

            if (typeof value === "boolean") {

                formData.append(
                    key,
                    value ? "1" : "0"
                );

            } else {

                formData.append(
                    key,
                    value as string | Blob
                );

            }
        }
    });
}


// ==========================================================================
// Create Portfolio
// ==========================================================================

export async function createPortfolio(
    data: PortfolioFormData
): Promise<Portfolio> {

    const formData = new FormData();

    appendFormData(
        formData,
        data
    );

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.post(
        baseRoute,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data.data;
}


// ==========================================================================
// Update Portfolio
// ==========================================================================

export async function updatePortfolio(
    id: number,
    data: PortfolioFormData
): Promise<Portfolio> {

    const formData = new FormData();

    formData.append(
        "_method",
        "PUT"
    );

    appendFormData(
        formData,
        data
    );

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.post(
        `${baseRoute}/${id}`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data.data;
}


// ==========================================================================
// Delete Portfolio
// ==========================================================================

export async function deletePortfolio(
    id: number
): Promise<void> {

    const baseRoute = await getPortfolioBaseRoute();

    await api.delete(
        `${baseRoute}/${id}`
    );
}


// ==========================================================================
// Activate Portfolio
// ==========================================================================

export async function activatePortfolio(
    id: number
): Promise<Portfolio> {

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/activate`
    );

    return response.data.data;
}


// ==========================================================================
// Deactivate Portfolio
// ==========================================================================

export async function deactivatePortfolio(
    id: number
): Promise<Portfolio> {

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/deactivate`
    );

    return response.data.data;
}


// ==========================================================================
// Feature Portfolio
// ==========================================================================

export async function featurePortfolio(
    id: number
): Promise<Portfolio> {

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/feature`
    );

    return response.data.data;
}


// ==========================================================================
// Unfeature Portfolio
// ==========================================================================

export async function unfeaturePortfolio(
    id: number
): Promise<Portfolio> {

    const baseRoute = await getPortfolioBaseRoute();

    const response = await api.patch(
        `${baseRoute}/${id}/unfeature`
    );

    return response.data.data;
}


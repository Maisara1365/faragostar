import { api } from "@/services/api";

import type {
    SettingResponse,
    UpdateSettingPayload,
} from "@/types/setting";

/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

export async function getSettings(): Promise<SettingResponse> {

    const response = await api.get(
        "/settings"
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Update Settings
|--------------------------------------------------------------------------
*/

export async function updateSettings(
    payload: UpdateSettingPayload
): Promise<void> {

    const formData = new FormData();

    Object.entries(payload).forEach(
        ([key, value]) => {

            if (
                value !== undefined &&
                value !== null
            ) {

                formData.append(
                    key,
                    value instanceof File
                        ? value
                        : String(value)
                );

            }

        }
    );

    await api.post(
        "/admin/settings?_method=PUT",
        formData
    );
}

/*
|--------------------------------------------------------------------------
| Delete Logo
|--------------------------------------------------------------------------
*/

export async function deleteLogo(): Promise<void> {

    await api.delete(
        "/admin/settings/logo"
    );

}

/*
|--------------------------------------------------------------------------
| Delete Favicon
|--------------------------------------------------------------------------
*/

export async function deleteFavicon(): Promise<void> {

    await api.delete(
        "/admin/settings/favicon"
    );

}
import { api } from "@/services/api";

import type {
    ProfileResponse,
    UpdateProfilePayload,
    ChangePasswordPayload,
} from "@/types/profile";

/*
|--------------------------------------------------------------------------
| Profile Role
|--------------------------------------------------------------------------
*/

export type ProfileRole =
    | "admin"
    | "content_manager"
    | "customer";

/*
|--------------------------------------------------------------------------
| Profile Endpoint
|--------------------------------------------------------------------------
*/

function getProfileEndpoint(
    role: ProfileRole
): string {

    switch (role) {

        case "admin":
            return "/admin/profile";

        case "content_manager":
            return "/content-manager/profile";

        case "customer":
            return "/customer/profile";

        default:
            throw new Error(
                `Unsupported profile role: ${role}`
            );
    }
}

/*
|--------------------------------------------------------------------------
| Get Profile
|--------------------------------------------------------------------------
*/

export async function getProfile(
    role: ProfileRole
): Promise<ProfileResponse> {

    const response = await api.get(
        getProfileEndpoint(role)
    );

    return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

export async function updateProfile(
    role: ProfileRole,
    payload: UpdateProfilePayload
): Promise<void> {

    await api.put(
        getProfileEndpoint(role),
        payload
    );
}

/*
|--------------------------------------------------------------------------
| Upload Profile Photo
|--------------------------------------------------------------------------
*/

export async function uploadProfilePhoto(
    role: ProfileRole,
    photo: File
): Promise<void> {

    const formData = new FormData();

    formData.append(
        "photo",
        photo
    );

    await api.post(
        `${getProfileEndpoint(role)}/photo`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );
}

/*
|--------------------------------------------------------------------------
| Delete Profile Photo
|--------------------------------------------------------------------------
*/

export async function deleteProfilePhoto(
    role: ProfileRole
): Promise<void> {

    await api.delete(
        `${getProfileEndpoint(role)}/photo`
    );
}

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

export async function changePassword(
    role: ProfileRole,
    payload: ChangePasswordPayload
): Promise<void> {

    await api.put(
        `${getProfileEndpoint(role)}/password`,
        payload
    );
}
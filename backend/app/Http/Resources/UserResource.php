<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'name' => $this->name,

            'email' => $this->email,

            'phone' => $this->phone,

            'role' => $this->role,

            'status' => $this->status,

            'language' => $this->language,

            /*
            |--------------------------------------------------------------------------
            | Profile
            |--------------------------------------------------------------------------
            */

            'profile_photo_path' => $this->profile_photo_path,

            'profile_photo_url' => $this->profile_photo_path
                ? url(
                    Storage::disk('public')->url(
                        $this->profile_photo_path
                    )
                )
                : null,

            /*
            |--------------------------------------------------------------------------
            | Email Verification
            |--------------------------------------------------------------------------
            */

            'email_verified' => !is_null(
                $this->email_verified_at
            ),

            'email_verified_at' => $this->email_verified_at,

            /*
            |--------------------------------------------------------------------------
            | Security
            |--------------------------------------------------------------------------
            */

            'must_change_password' =>
                $this->must_change_password,

            /*
            |--------------------------------------------------------------------------
            | Dates
            |--------------------------------------------------------------------------
            */

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}
<?php

namespace App\Services\Setting;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SettingService
{
    /**
     * Get the application settings.
     */
    public function get(): Setting
    {
        return Setting::firstOrCreate(
            ['id' => 1],
            [
                'company_name' => 'Faragostar Company',
                'company_email' => 'info@example.com',
                'default_language' => 'fa',
            ]
        );
    }

    /**
     * Update application settings.
     */
    public function update(array $data): Setting
    {
        return DB::transaction(function () use ($data) {

            $setting = $this->get();

            /*
            |--------------------------------------------------------------------------
            | Logo
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['logo']) &&
                $data['logo'] instanceof UploadedFile
            ) {

                if (
                    $setting->logo &&
                    Storage::disk('public')->exists($setting->logo)
                ) {
                    Storage::disk('public')->delete(
                        $setting->logo
                    );
                }

                $data['logo'] = $data['logo']->store(
                    'settings/logo',
                    'public'
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Favicon
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['favicon']) &&
                $data['favicon'] instanceof UploadedFile
            ) {

                if (
                    $setting->favicon &&
                    Storage::disk('public')->exists($setting->favicon)
                ) {
                    Storage::disk('public')->delete(
                        $setting->favicon
                    );
                }

                $data['favicon'] = $data['favicon']->store(
                    'settings/favicon',
                    'public'
                );
            }

            $setting->update($data);

            return $setting->refresh();

        });
    }

    /**
     * Remove logo.
     */
    public function deleteLogo(): Setting
    {
        $setting = $this->get();

        if (
            $setting->logo &&
            Storage::disk('public')->exists($setting->logo)
        ) {
            Storage::disk('public')->delete(
                $setting->logo
            );
        }

        $setting->update([
            'logo' => null,
        ]);

        return $setting->refresh();
    }

    /**
     * Remove favicon.
     */
    public function deleteFavicon(): Setting
    {
        $setting = $this->get();

        if (
            $setting->favicon &&
            Storage::disk('public')->exists($setting->favicon)
        ) {
            Storage::disk('public')->delete(
                $setting->favicon
            );
        }

        $setting->update([
            'favicon' => null,
        ]);

        return $setting->refresh();
    }
}
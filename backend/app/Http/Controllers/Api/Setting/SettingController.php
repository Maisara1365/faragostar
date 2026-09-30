<?php

namespace App\Http\Controllers\Api\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Services\Setting\SettingService;

class SettingController extends Controller
{
    public function __construct(
        private SettingService $settingService
    ) {}

    /**
     * Public - Get website settings.
     */
    public function show()
    {
        return $this->success(
            new SettingResource(
                $this->settingService->get()
            ),
            'Settings retrieved successfully.'
        );
    }

    /**
     * Admin - Update settings.
     */
    public function update(
        UpdateSettingRequest $request
    ) {
        $setting = $this->settingService->update(
            $request->validated()
        );

        return $this->success(
            new SettingResource($setting),
            'Settings updated successfully.'
        );
    }

    /**
     * Delete company logo.
     */
    public function deleteLogo()
    {
        $setting = $this->settingService->deleteLogo();

        return $this->success(
            new SettingResource($setting),
            'Logo deleted successfully.'
        );
    }

    /**
     * Delete company favicon.
     */
    public function deleteFavicon()
    {
        $setting = $this->settingService->deleteFavicon();

        return $this->success(
            new SettingResource($setting),
            'Favicon deleted successfully.'
        );
    }
}
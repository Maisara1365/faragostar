<?php

namespace App\Services\Team;

use App\Models\TeamMember;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TeamMemberService
{
    /**
     * Get all team members for admin.
     */
    public function getAll()
    {
        return TeamMember::ordered()
            ->get();
    }

    /**
     * Get active team members.
     */
    public function getActive()
    {
        return TeamMember::active()
            ->ordered()
            ->get();
    }

    /**
     * Create team member.
     */
    public function create(array $data): TeamMember
    {
        /*
        |--------------------------------------------------------------------------
        | Upload Image
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile
        ) {
            $data['image'] = $data['image']->store(
                'team',
                'public'
            );
        }

        return TeamMember::create([

            /*
            |--------------------------------------------------------------------------
            | Multilingual
            |--------------------------------------------------------------------------
            */

            'name_fa' => $data['name_fa'],

            'name_en' => $data['name_en'],

            'designation_fa' => $data['designation_fa'],

            'designation_en' => $data['designation_en'],

            'bio_fa' =>
                $data['bio_fa'] ?? null,

            'bio_en' =>
                $data['bio_en'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            'image' =>
                $data['image'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            'facebook' =>
                $data['facebook'] ?? null,

            'instagram' =>
                $data['instagram'] ?? null,

            'linkedin' =>
                $data['linkedin'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'display_order' =>
                $data['display_order'] ?? 0,

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            'status' =>
                $data['status'] ?? 'active',

        ]);
    }

    /**
     * Update team member.
     */
    public function update(
        TeamMember $teamMember,
        array $data
    ): TeamMember {

        /*
        |--------------------------------------------------------------------------
        | Replace Image
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile
        ) {

            if (
                $teamMember->image &&
                Storage::disk('public')->exists(
                    $teamMember->image
                )
            ) {
                Storage::disk('public')
                    ->delete($teamMember->image);
            }

            $data['image'] = $data['image']->store(
                'team',
                'public'
            );
        }

        $teamMember->update($data);

        return $teamMember->refresh();
    }

    /**
     * Delete team member.
     */
    public function delete(
        TeamMember $teamMember
    ): void {

        if (
            $teamMember->image &&
            Storage::disk('public')->exists(
                $teamMember->image
            )
        ) {
            Storage::disk('public')
                ->delete($teamMember->image);
        }

        $teamMember->delete();
    }

    /**
     * Activate / Deactivate.
     */
    public function setStatus(
        TeamMember $teamMember,
        string $status
    ): TeamMember {

        $teamMember->update([
            'status' => $status,
        ]);

        return $teamMember->refresh();
    }
}

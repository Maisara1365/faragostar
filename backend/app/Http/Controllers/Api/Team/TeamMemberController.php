<?php

namespace App\Http\Controllers\Api\Team;

use App\Http\Controllers\Controller;
use App\Http\Requests\Team\StoreTeamMemberRequest;
use App\Http\Requests\Team\UpdateTeamMemberRequest;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use App\Services\Team\TeamMemberService;

class TeamMemberController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct(
        private TeamMemberService $teamMemberService
    ) {}

    /**
     * Admin - List all team members.
     */
    public function index()
    {
        $teamMembers = $this->teamMemberService->getAll();

        return $this->success(
            TeamMemberResource::collection($teamMembers),
            'Team members retrieved successfully.'
        );
    }

    /**
     * Public - Active team members.
     */
    public function active()
    {
        $teamMembers = $this->teamMemberService->getActive();

        return $this->success(
            TeamMemberResource::collection($teamMembers),
            'Active team members retrieved successfully.'
        );
    }

    /**
     * Show single team member.
     */
    public function show(
        TeamMember $teamMember
    ) {
        return $this->success(
            new TeamMemberResource($teamMember),
            'Team member retrieved successfully.'
        );
    }

    /**
     * Create team member.
     */
    public function store(
        StoreTeamMemberRequest $request
    ) {
        $teamMember = $this->teamMemberService->create(
            $request->validated()
        );

        return $this->success(
            new TeamMemberResource($teamMember),
            'Team member created successfully.',
            201
        );
    }

    /**
     * Update team member.
     */
    public function update(
        UpdateTeamMemberRequest $request,
        TeamMember $teamMember
    ) {
        $teamMember = $this->teamMemberService->update(
            $teamMember,
            $request->validated()
        );

        return $this->success(
            new TeamMemberResource($teamMember),
            'Team member updated successfully.'
        );
    }

    /**
     * Delete team member.
     */
    public function destroy(
        TeamMember $teamMember
    ) {
        $this->teamMemberService->delete(
            $teamMember
        );

        return $this->success(
            null,
            'Team member deleted successfully.'
        );
    }

    /**
     * Activate team member.
     */
    public function activate(
        TeamMember $teamMember
    ) {
        $teamMember = $this->teamMemberService
            ->setStatus(
                $teamMember,
                'active'
            );

        return $this->success(
            new TeamMemberResource($teamMember),
            'Team member activated successfully.'
        );
    }

    /**
     * Deactivate team member.
     */
    public function deactivate(
        TeamMember $teamMember
    ) {
        $teamMember = $this->teamMemberService
            ->setStatus(
                $teamMember,
                'inactive'
            );

        return $this->success(
            new TeamMemberResource($teamMember),
            'Team member deactivated successfully.'
        );
    }
}

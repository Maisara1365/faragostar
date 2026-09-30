"use client";

import { useEffect, useState } from "react";

import { TeamMember } from "@/types/team-member";

import {
    getTeamMembers,
} from "@/services/team-member";

export function useTeamMembers(
    language: "fa" | "en"
) {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTeamMembers() {
            try {
                setLoading(true);

                const data = await getTeamMembers(language);

                setTeamMembers(data);
            } catch {
                setError(
                    "Unable to load team members."
                );
            } finally {
                setLoading(false);
            }
        }

        loadTeamMembers();
    }, [language]);

    return {
        teamMembers,
        loading,
        error,
    };
}
"use client";

import { useEffect, useState } from "react";

import { Service } from "@/types/service";

import {
    getServices,
    getFeaturedServices,
} from "@/lib/api/services";

export function useServices(
    featured: boolean = false
) {

    const [services, setServices] = useState<Service[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadServices() {

            try {

                const data = featured
                    ? await getFeaturedServices()
                    : await getServices();

                setServices(data);

            } catch {

                setError(
                    "Unable to load services."
                );

            } finally {

                setLoading(false);

            }

        }

        loadServices();

    }, [featured]);

    return {

        services,

        loading,

        error,

    };

}
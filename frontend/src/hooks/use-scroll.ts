"use client";

import { useEffect, useState } from "react";

export default function useScroll() {

    const [scrollY, setScrollY] = useState(0);

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        const handleScroll = () => {

            const current = window.scrollY;

            setScrollY(current);

            const total =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percent =
                total > 0
                    ? (current / total) * 100
                    : 0;

            setProgress(percent);

        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );

    }, []);

    return {

        scrollY,

        progress,

        scrolled: scrollY > 30,

    };

}
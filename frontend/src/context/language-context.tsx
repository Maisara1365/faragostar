"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    translations,
    Language,
} from "@/locales";

interface LanguageContextType {

    language: Language;

    setLanguage: (language: Language) => void;

    t: typeof translations.en;

}

const LanguageContext =
    createContext<LanguageContextType | null>(null);

export function LanguageProvider({

    children,

}: {
    children: React.ReactNode;
}) {

    const [language, setLanguageState] =
        useState<Language>("fa");

    useEffect(() => {

        const savedLanguage =
            localStorage.getItem("language") as Language | null;

        if (
            savedLanguage &&
            ["en", "fa"].includes(savedLanguage)
        ) {

            setLanguageState(savedLanguage);

        }

    }, []);

    useEffect(() => {

        localStorage.setItem(
            "language",
            language
        );

        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "fa"
                ? "rtl"
                : "ltr";

    }, [language]);

    const setLanguage = (
        lang: Language
    ) => {

        setLanguageState(lang);

    };

    return (

        <LanguageContext.Provider

            value={{

                language,

                setLanguage,

                t: translations[language],

            }}

        >

            {children}

        </LanguageContext.Provider>

    );

}

export function useLanguage() {

    const context =
        useContext(LanguageContext);

    if (!context) {

        throw new Error(

            "useLanguage must be used inside LanguageProvider"

        );

    }

    return context;

}
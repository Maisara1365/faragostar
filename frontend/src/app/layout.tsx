import type { Metadata } from "next";
import { Poppins, Vazirmatn } from "next/font/google";

import "./globals.css";

import { LanguageProvider } from "@/context/language-context";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: [
        "300",
        "400",
        "500",
        "600",
        "700",
    ],
});

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazirmatn",
    weight: [
        "300",
        "400",
        "500",
        "600",
        "700",
    ],
});

export const metadata: Metadata = {
    title: "Faragostar Advertising Company",
    description:
        "Professional Advertising, Branding and Digital Marketing Company",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fa"
            suppressHydrationWarning
        >
            <body
                className={`
                    ${poppins.variable}
                    ${vazirmatn.variable}
                `}
            >
                <LanguageProvider>

                    <AuthProvider>

                        {children}

                    </AuthProvider>

                </LanguageProvider>
            </body>
        </html>
    );
}
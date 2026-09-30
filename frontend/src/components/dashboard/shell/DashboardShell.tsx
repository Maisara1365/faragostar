"use client";

import { ReactNode, useState } from "react";

import DashboardSidebar from "../DashboardSidebar";
import DashboardMobileSidebar from "../DashboardMobileSidebar";
import DashboardHeader from "../DashboardHeader";
import DashboardContainer from "../DashboardContainer";

export interface DashboardShellProps {

    children: ReactNode;

    title: string;

    description?: string;

}

export default function DashboardShell({

    children,

    title,

    description,

}: DashboardShellProps) {

    const [

        mobileMenuOpen,

        setMobileMenuOpen,

    ] = useState(false);

    return (

        <div
            className="
                min-h-screen
                bg-slate-50
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    max-w-[1700px]
                    gap-6
                    p-6
                "
            >

                {/* Desktop Sidebar */}

                <div
                    className="
                        hidden
                        lg:block
                    "
                >

                    <DashboardSidebar />

                </div>

                {/* Mobile Sidebar */}

                <DashboardMobileSidebar

                    open={mobileMenuOpen}

                    onClose={() =>
                        setMobileMenuOpen(false)
                    }

                />

                {/* Main Content */}

                <div
                    className="
                        min-w-0
                        flex-1
                    "
                >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
                    <DashboardContainer>
                        <DashboardHeader

                            title={title}

                            description={description}

                            onOpenMenu={() =>
                                setMobileMenuOpen(true)
                            }

                        />

                        {children}

                    </DashboardContainer>

                </div>

            </div>

        </div>

    );

}
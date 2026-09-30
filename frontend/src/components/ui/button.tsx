"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?:
        | "primary"
        | "secondary"
        | "outline"
        | "ghost"
        | "danger";

    size?:
        | "sm"
        | "md"
        | "lg"
        | "icon";

    loading?: boolean;

    fullWidth?: boolean;

    leftIcon?: React.ReactNode;

    rightIcon?: React.ReactNode;

    asChild?: boolean;

    href?: string;
}

export default function Button({

    children,

    className,

    variant = "primary",

    size = "md",

    loading = false,

    disabled,

    fullWidth = false,

    leftIcon,

    rightIcon,

    asChild = false,

    href,

    ...props

}: ButtonProps) {

    const variants = {

        primary:
            "bg-[var(--primary)] text-white shadow-md hover:bg-[var(--secondary)] hover:shadow-xl",

        secondary:
            "bg-[var(--secondary)] text-white shadow-md hover:bg-[var(--primary)] hover:shadow-xl",

        outline:
            "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",

        ghost:
            "text-[var(--dark)] hover:bg-slate-100",

        danger:
            "bg-red-600 text-white hover:bg-red-700",

    };

    const sizes = {

        sm: "h-9 px-4 text-sm",

        md: "h-11 px-6",

        lg: "h-14 px-8 text-lg",

        icon: "h-11 w-11 p-0",

    };

    const classes = cn(

        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300",

        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]",

        "disabled:pointer-events-none disabled:opacity-50",

        "hover:-translate-y-0.5 active:translate-y-0 active:scale-95",

        variants[variant],

        sizes[size],

        fullWidth && "w-full",

        className

    );

    /*
    |--------------------------------------------------------------------------
    | Link Button
    |--------------------------------------------------------------------------
    */

    if (href) {

        return (

            <Link
                href={href}
                className={classes}
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        {leftIcon}
                        <span>{children}</span>
                        {rightIcon}
                    </>
                )}
            </Link>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Radix Slot
    |--------------------------------------------------------------------------
    */

    if (asChild) {

        return (

            <Slot
                className={classes}
                {...props}
            >
                {children}
            </Slot>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Normal Button
    |--------------------------------------------------------------------------
    */

    return (

        <button
            type="button"
            disabled={disabled || loading}
            className={classes}
            {...props}
        >

            {loading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {leftIcon}
                    <span>{children}</span>
                    {rightIcon}
                </>
            )}

        </button>

    );

}
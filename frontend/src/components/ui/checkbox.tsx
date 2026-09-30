"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

function Checkbox({
    className,
    ...props
}: CheckboxProps) {

    return (

        <input
            type="checkbox"
            className={cn(
                "h-4 w-4 rounded border",
                className
            )}
            {...props}
        />

    );

}

export { Checkbox };
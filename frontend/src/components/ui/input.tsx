import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                className={cn(
                    "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm transition-all duration-300",
                    "placeholder:text-slate-400",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

function Drawer({
    ...props
}: DialogPrimitive.Root.Props) {
    return (
        <DialogPrimitive.Root
            data-slot="drawer"
            {...props}
        />
    );
}

function DrawerTrigger({
    ...props
}: DialogPrimitive.Trigger.Props) {
    return (
        <DialogPrimitive.Trigger
            data-slot="drawer-trigger"
            {...props}
        />
    );
}

function DrawerPortal({
    ...props
}: DialogPrimitive.Portal.Props) {
    return (
        <DialogPrimitive.Portal
            data-slot="drawer-portal"
            {...props}
        />
    );
}

function DrawerOverlay({
    className,
    ...props
}: DialogPrimitive.Backdrop.Props) {
    return (
        <DialogPrimitive.Backdrop
            data-slot="drawer-overlay"
            className={cn(
                "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm",
                className
            )}
            {...props}
        />
    );
}

function DrawerContent({
    className,
    children,
    ...props
}: DialogPrimitive.Popup.Props) {
    return (
        <DrawerPortal>
            <DrawerOverlay />

            <DialogPrimitive.Popup
                data-slot="drawer-content"
                className={cn(
                    "fixed top-0 right-0 z-50 h-screen w-full max-w-2xl border-l bg-background shadow-xl outline-none",
                    "data-open:animate-in data-open:slide-in-from-right",
                    "data-closed:animate-out data-closed:slide-out-to-right",
                    className
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Popup>
        </DrawerPortal>
    );
}

function DrawerHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="drawer-header"
            className={cn(
                "flex flex-col gap-2",
                className
            )}
            {...props}
        />
    );
}

function DrawerFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="drawer-footer"
            className={cn(
                "mt-auto flex items-center justify-end gap-2",
                className
            )}
            {...props}
        />
    );
}

function DrawerTitle({
    className,
    ...props
}: DialogPrimitive.Title.Props) {
    return (
        <DialogPrimitive.Title
            data-slot="drawer-title"
            className={cn(
                "text-lg font-semibold",
                className
            )}
            {...props}
        />
    );
}

function DrawerDescription({
    className,
    ...props
}: DialogPrimitive.Description.Props) {
    return (
        <DialogPrimitive.Description
            data-slot="drawer-description"
            className={cn(
                "text-sm text-muted-foreground",
                className
            )}
            {...props}
        />
    );
}

export {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { navLinks } from "@/components/navigation/NavLinks";

export default function MobileMenu() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <button

                onClick={() => setOpen(true)}

                className="lg:hidden"

            >

                <Menu size={28} />

            </button>

            <AnimatePresence>

                {open && (

                    <motion.div

                        initial={{ x: "100%" }}

                        animate={{ x: 0 }}

                        exit={{ x: "100%" }}

                        transition={{
                            duration: .35,
                        }}

                        className="
                        fixed
                        inset-0
                        z-50
                        bg-white"

                    >

                        <div
                            className="
                            flex
                            items-center
                            justify-between
                            p-6"
                        >

                            <h2
                                className="font-bold"
                            >
                                Menu
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                            >

                                <X size={28} />

                            </button>

                        </div>

                        <div
                            className="
                            mt-10
                            flex
                            flex-col"
                        >

                            {navLinks.map((item) => (

                                <Link

                                    key={item.href}

                                    href={item.href}

                                    onClick={() => setOpen(false)}

                                    className="
                                    border-b
                                    px-6
                                    py-5
                                    text-lg"

                                >

                                    {item.title}

                                </Link>

                            ))}

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </>

    );

}
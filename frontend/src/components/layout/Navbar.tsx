"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/components/navigation/NavLinks";

export default function Navbar() {

    const pathname = usePathname();

    return (

        <nav
            className="
            hidden
            lg:flex
            items-center
            gap-8"
        >

            {navLinks.map((link) => (

                <Link
                    key={link.href}
                    href={link.href}
                    className={`
                        relative
                        text-[15px]
                        font-medium
                        transition-all
                        duration-300
                        hover:text-[#183B73]

                        ${
                            pathname === link.href
                                ? "text-[#183B73]"
                                : "text-gray-700"
                        }
                    `}
                >

                    {link.title}

                </Link>

            ))}

        </nav>

    );

}
"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/hooks/use-language";

const companies = [

    "Adobe",

    "Google",

    "Meta",

    "Microsoft",

    "Canva",

    "Faragostar",

];

export default function Trusted() {

    const { t } = useLanguage();

    return (

        <section className="py-16">

            <Container>

                <motion.div

                    initial={{
                        opacity: 0,
                    }}

                    whileInView={{
                        opacity: 1,
                    }}

                    viewport={{
                        once: true,
                    }}

                    className="text-center"

                >

                    <p
                        className="
                        mb-10
                        text-sm
                        uppercase
                        tracking-[0.3em]
                        text-slate-500"
                    >

                        {t.common.trusted}

                    </p>

                    <div
                        className="
                        grid
                        grid-cols-2
                        gap-8
                        md:grid-cols-3
                        lg:grid-cols-6"
                    >

                        {

                            companies.map((company) => (

                                <motion.div

                                    key={company}

                                    whileHover={{
                                        y: -6,
                                    }}

                                    className="
                                    flex
                                    h-20
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    bg-white
                                    shadow-sm
                                    transition-all
                                    hover:shadow-xl"

                                >

                                    <span
                                        className="
                                        text-lg
                                        font-bold
                                        text-slate-500"
                                    >

                                        {company}

                                    </span>

                                </motion.div>

                            ))

                        }

                    </div>

                </motion.div>

            </Container>

        </section>

    );

}
"use client";

import { useMemo } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import {
    ArrowRight,
    Facebook,
    Instagram,
    Linkedin,
    Users,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/button";

import { useLanguage } from "@/context/language-context";
import { useTeamMembers } from "@/hooks/use-team-members";

/*
|--------------------------------------------------------------------------
| Homepage Team Section
|--------------------------------------------------------------------------
*/

export default function Team() {
    const { t, language } = useLanguage();

    const {
        teamMembers: members,
        loading,
    } = useTeamMembers(language);

    /*
    |--------------------------------------------------------------------------
    | Localized Team Members
    |--------------------------------------------------------------------------
    |
    | The API returns both Persian and English fields.
    | We select the correct fields according to the current language.
    |
    */

    const localizedMembers = useMemo(() => {
        return [...members]
            .sort(
                (a, b) =>
                    a.display_order - b.display_order
            )
            .map((member) => ({
                ...member,

                name:
                    language === "fa"
                        ? member.name_fa
                        : member.name_en,

                designation:
                    language === "fa"
                        ? member.designation_fa
                        : member.designation_en,

                bio:
                    language === "fa"
                        ? member.bio_fa
                        : member.bio_en,
            }));
    }, [members, language]);

    /*
    |--------------------------------------------------------------------------
    | Founder
    |--------------------------------------------------------------------------
    */

    const founder = useMemo(() => {
        return (
            localizedMembers.find(
                (member) =>
                    member.display_order === 1
            ) ??
            localizedMembers[0] ??
            null
        );
    }, [localizedMembers]);

    /*
    |--------------------------------------------------------------------------
    | Other Members
    |--------------------------------------------------------------------------
    */

    const teamMembers = useMemo(() => {
        return localizedMembers.filter(
            (member) =>
                member.id !== founder?.id
        );
    }, [
        localizedMembers,
        founder,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <section
                className="
                relative
                overflow-hidden
                py-28
                lg:py-36"
            >
                <div
                    className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-slate-50
                    via-white
                    to-sky-100"
                />

                <Container>
                    <div
                        className="
                        flex
                        items-center
                        justify-center
                        py-32"
                    >
                        <div
                            className="
                            h-16
                            w-16
                            animate-spin
                            rounded-full
                            border-4
                            border-[#46A6D9]
                            border-t-transparent"
                        />
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section
            className="
            relative
            overflow-hidden
            py-24
            lg:py-32"
        >
            {/* ==========================================================
                Background
            ========================================================== */}

            <div
                className="
                absolute
                inset-0
                -z-30
                bg-gradient-to-br
                from-slate-50
                via-white
                to-sky-100"
            />

            {/* Decorative Glow */}

            <motion.div
                animate={{
                    x: [0, 80, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                absolute
                -left-44
                top-0
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#46A6D9]/20
                blur-[170px]
                -z-20"
            />

            <motion.div
                animate={{
                    x: [0, -60, 0],
                    y: [0, 60, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                absolute
                right-0
                bottom-0
                h-[600px]
                w-[600px]
                rounded-full
                bg-[#183B73]/10
                blur-[180px]
                -z-20"
            />

            <Container>

                {/* ======================================================
                    Section Heading - CENTERED WITH BEAUTIFUL STYLING
                ====================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 35,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    style={{
                        textAlign: "center",
                        maxWidth: "800px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "80px",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "9999px",
                            border: "1px solid rgba(70, 166, 217, 0.2)",
                            backgroundColor: "rgba(24, 59, 115, 0.08)",
                            padding: "8px 20px",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#183B73",
                            marginBottom: "24px",
                        }}
                    >
                        <Users size={16} />

                        {t.team.badge || "Our Team"}
                    </div>

                    <h2
                        style={{
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            fontWeight: "900",
                            lineHeight: "1.2",
                            color: "#183B73",
                            marginBottom: "16px",
                            background: "linear-gradient(135deg, #183B73 0%, #24579D 50%, #46A6D9 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {t.team.title || "Our Team"}
                    </h2>

                    <p
                        style={{
                            fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
                            lineHeight: "1.8",
                            color: "#475569",
                            maxWidth: "650px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            fontWeight: "400",
                        }}
                    >
                        {t.team.description || "Meet Our Creative Team"}
                    </p>

                    <div
                        style={{
                            width: "80px",
                            height: "4px",
                            background: "linear-gradient(90deg, #183B73, #46A6D9)",
                            borderRadius: "2px",
                            margin: "20px auto 0",
                        }}
                    />
                </motion.div>


                {/* ======================================================
                    Founder
                ====================================================== */}

                {founder && (
                    <>
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 50,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                margin: "-100px",
                            }}
                            transition={{
                                duration: 0.8,
                            }}
                            className="
                            relative
                            mx-auto
                            mb-24
                            max-w-6xl
                            overflow-hidden
                            rounded-[42px]
                            border
                            border-white/60
                            bg-white/70
                            p-8
                            shadow-[0_25px_80px_rgba(24,59,115,0.12)]
                            backdrop-blur-xl
                            md:p-12
                            lg:p-16"
                        >
                            {/* Top Gradient */}

                            <div
                                className="
                                absolute
                                inset-x-0
                                top-0
                                h-1.5
                                bg-gradient-to-r
                                from-[#183B73]
                                via-[#24579D]
                                to-[#46A6D9]"
                            />

                            {/* Decorative Glow */}

                            <div
                                className="
                                pointer-events-none
                                absolute
                                -right-32
                                -top-32
                                h-80
                                w-80
                                rounded-full
                                bg-[#46A6D9]/20
                                blur-[110px]"
                            />

                            <div
                                className="
                                relative
                                grid
                                items-center
                                gap-12
                                lg:grid-cols-[420px_1fr]
                                lg:gap-16"
                            >

                                {/* ==================================================
                                    Founder Portrait
                                ================================================== */}

                                <div className="flex justify-center">

                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 250,
                                            damping: 18,
                                        }}
                                        className="
                                        relative
                                        h-[310px]
                                        w-[310px]
                                        md:h-[380px]
                                        md:w-[380px]"
                                    >

                                        {/* Outer Ring */}

                                        <div
                                            className="
                                            absolute
                                            inset-0
                                            rounded-full
                                            bg-gradient-to-br
                                            from-[#183B73]
                                            via-[#24579D]
                                            to-[#46A6D9]
                                            p-[5px]
                                            shadow-[0_20px_60px_rgba(24,59,115,0.25)]"
                                        >
                                            <div
                                                className="
                                                relative
                                                h-full
                                                w-full
                                                overflow-hidden
                                                rounded-full
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center"
                                            >
                                                {founder.image ? (
                                                    <img
                                                        src={founder.image}
                                                        alt={founder.name || "Team member"}
                                                        className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                        transition-transform
                                                        duration-700
                                                        hover:scale-110"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="
                                                        flex
                                                        h-full
                                                        w-full
                                                        items-center
                                                        justify-center
                                                        bg-gradient-to-br
                                                        from-[#183B73]
                                                        to-[#46A6D9]"
                                                    >
                                                        <Users
                                                            size={90}
                                                            className="
                                                            text-white/60"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Founder Badge */}

                                        <div
                                            className="
                                            absolute
                                            -bottom-2
                                            left-1/2
                                            -translate-x-1/2
                                            whitespace-nowrap
                                            rounded-full
                                            bg-[#183B73]
                                            px-6
                                            py-2.5
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-white
                                            shadow-xl"
                                        >
                                            {t.team.founder ||
                                                "Founder"}
                                        </div>

                                    </motion.div>

                                </div>


                                {/* ==================================================
                                    Founder Information
                                ================================================== */}

                                <div
                                    className="
                                    text-center
                                    lg:text-start"
                                >

                                    <span
                                        className="
                                        text-sm
                                        font-bold
                                        uppercase
                                        tracking-[0.25em]
                                        text-[#46A6D9]"
                                    >
                                        {t.team.founderSpotlight ||
                                            "Founder Spotlight"}
                                    </span>

                                    <h3
                                        className="
                                        mt-4
                                        text-4xl
                                        font-black
                                        leading-tight
                                        text-[#183B73]
                                        md:text-5xl"
                                    >
                                        {founder.name}
                                    </h3>

                                    <p
                                        className="
                                        mt-3
                                        text-lg
                                        font-bold
                                        text-[#46A6D9]
                                        md:text-xl"
                                    >
                                        {founder.designation}
                                    </p>

                                    {founder.bio && (
                                        <p
                                            className="
                                            mx-auto
                                            mt-7
                                            max-w-2xl
                                            text-base
                                            leading-8
                                            text-slate-600
                                            lg:mx-0
                                            md:text-lg"
                                        >
                                            {founder.bio}
                                        </p>
                                    )}

                                    {/* Skills */}

                                    <div
                                        className="
                                        mt-8
                                        flex
                                        flex-wrap
                                        justify-center
                                        gap-2.5
                                        lg:justify-start"
                                    >
                                        {[
                                            t.team.skills?.website ||
                                                "Website Design",

                                            t.team.skills?.branding ||
                                                "Branding",

                                            t.team.skills?.motion ||
                                                "Motion Design",

                                            t.team.skills?.video ||
                                                "Video Production",

                                            t.team.skills?.digital ||
                                                "Digital Strategy",
                                        ].map(
                                            (
                                                skill,
                                                index
                                            ) => (
                                                <motion.span
                                                    key={`${skill}-${index}`}
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.85,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            index *
                                                            0.07,
                                                    }}
                                                    className="
                                                    rounded-full
                                                    border
                                                    border-[#46A6D9]/20
                                                    bg-[#46A6D9]/10
                                                    px-4
                                                    py-2
                                                    text-xs
                                                    font-semibold
                                                    text-[#183B73]"
                                                >
                                                    {skill}
                                                </motion.span>
                                            )
                                        )}
                                    </div>

                                    {/* Social Links */}

                                    <div
                                        className="
                                        mt-8
                                        flex
                                        justify-center
                                        gap-3
                                        lg:justify-start"
                                    >

                                        {founder.facebook && (
                                            <SocialLink
                                                href={founder.facebook}
                                                label="Facebook"
                                                className="
                                                bg-[#183B73]
                                                hover:bg-[#24579D]"
                                            >
                                                <Facebook
                                                    size={18}
                                                />
                                            </SocialLink>
                                        )}

                                        {founder.instagram && (
                                            <SocialLink
                                                href={founder.instagram}
                                                label="Instagram"
                                                className="
                                                bg-[#46A6D9]
                                                hover:bg-[#24579D]"
                                            >
                                                <Instagram
                                                    size={18}
                                                />
                                            </SocialLink>
                                        )}

                                        {founder.linkedin && (
                                            <SocialLink
                                                href={founder.linkedin}
                                                label="LinkedIn"
                                                className="
                                                bg-[#24579D]
                                                hover:bg-[#183B73]"
                                            >
                                                <Linkedin
                                                    size={18}
                                                />
                                            </SocialLink>
                                        )}

                                    </div>

                                    {/* Contact Founder Button - Updated Color */}

                                    <div className="mt-8">

                                        <Button
                                            asChild
                                            size="lg"
                                            style={{
                                                background: "linear-gradient(135deg, #183B73 0%, #24579D 100%)",
                                                color: "#FFFFFF",
                                                border: "none",
                                                boxShadow: "0 8px 25px rgba(24, 59, 115, 0.35)",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-3px)";
                                                e.currentTarget.style.boxShadow = "0 12px 35px rgba(24, 59, 115, 0.45)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "0 8px 25px rgba(24, 59, 115, 0.35)";
                                            }}
                                        >
                                            <Link href="/contact">
                                                {t.team.contactFounder ||
                                                    "Contact Founder"}

                                                <ArrowRight
                                                    className="
                                                    ms-2
                                                    h-5
                                                    w-5"
                                                />
                                            </Link>
                                        </Button>

                                    </div>

                                </div>

                            </div>
                        </motion.div>

                        {/* ======================================================
                            SPACER - <br/> equivalent between CEO and Team Cards
                        ====================================================== */}
                        
                        <div style={{ height: "40px" }} />
                        
                    </>
                )}


                {/* ======================================================
                    Team Members - CENTER ALIGNED
                ====================================================== */}

                {teamMembers.length > 0 && (
                    <div
                        className={`
                            flex
                            flex-wrap
                            items-stretch
                            justify-center
                            gap-8
                            lg:gap-10
                            ${
                                // Center alignment when exactly 2 members
                                teamMembers.length === 2
                                    ? "max-w-3xl mx-auto"
                                    : ""
                            }
                            ${
                                // Center alignment when exactly 1 member
                                teamMembers.length === 1
                                    ? "max-w-sm mx-auto"
                                    : ""
                            }
                        `}
                    >

                        {teamMembers.map(
                            (
                                member,
                                index
                            ) => (
                                <motion.article
                                    key={member.id}
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        margin: "-80px",
                                    }}
                                    transition={{
                                        duration: 0.65,
                                        delay:
                                            index *
                                            0.08,
                                    }}
                                    whileHover={{
                                        y: -10,
                                    }}
                                    className={`
                                        group
                                        relative
                                        w-full
                                        overflow-hidden
                                        rounded-[34px]
                                        border
                                        border-white/70
                                        bg-white/75
                                        p-7
                                        text-center
                                        shadow-[0_20px_60px_rgba(24,59,115,0.10)]
                                        backdrop-blur-xl
                                        transition-shadow
                                        duration-500
                                        hover:shadow-[0_30px_80px_rgba(24,59,115,0.18)]
                                        ${
                                            // Responsive width based on member count
                                            teamMembers.length === 1
                                                ? "max-w-[350px]"
                                                : teamMembers.length === 2
                                                ? "max-w-[320px] sm:max-w-[350px]"
                                                : "max-w-[350px]"
                                        }
                                    `}
                                >

                                    {/* Card Glow */}

                                    <div
                                        className="
                                        pointer-events-none
                                        absolute
                                        -right-24
                                        -top-24
                                        h-52
                                        w-52
                                        rounded-full
                                        bg-[#46A6D9]/15
                                        blur-[90px]
                                        transition-transform
                                        duration-700
                                        group-hover:scale-150"
                                    />

                                    {/* Top Gradient */}

                                    <div
                                        className="
                                        absolute
                                        inset-x-0
                                        top-0
                                        h-1.5
                                        bg-gradient-to-r
                                        from-[#183B73]
                                        via-[#24579D]
                                        to-[#46A6D9]"
                                    />

                                    {/* ==================================================
                                        Circular Portrait
                                    ================================================== */}

                                    <div
                                        className="
                                        relative
                                        mx-auto
                                        h-44
                                        w-44
                                        sm:h-48
                                        sm:w-48"
                                    >

                                        {/* Outer Ring */}

                                        <div
                                            className="
                                            absolute
                                            inset-0
                                            rounded-full
                                            bg-gradient-to-br
                                            from-[#183B73]
                                            via-[#24579D]
                                            to-[#46A6D9]
                                            p-[4px]
                                            shadow-lg"
                                        >

                                            <div
                                                className="
                                                relative
                                                h-full
                                                w-full
                                                overflow-hidden
                                                rounded-full
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center"
                                            >

                                                {member.image ? (
                                                    <img
                                                        src={member.image}
                                                        alt={member.name || "Team member"}
                                                        className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                        transition-transform
                                                        duration-700
                                                        group-hover:scale-110"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="
                                                        flex
                                                        h-full
                                                        w-full
                                                        items-center
                                                        justify-center
                                                        bg-gradient-to-br
                                                        from-[#183B73]
                                                        to-[#46A6D9]"
                                                    >
                                                        <Users
                                                            size={55}
                                                            className="
                                                            text-white/60"
                                                        />
                                                    </div>
                                                )}

                                            </div>

                                        </div>

                                        {/* Small Decorative Dot */}

                                        <div
                                            className="
                                            absolute
                                            bottom-1
                                            right-3
                                            h-5
                                            w-5
                                            rounded-full
                                            border-4
                                            border-white
                                            bg-[#46A6D9]
                                            shadow-md"
                                        />

                                    </div>


                                    {/* ==================================================
                                        Member Information
                                    ================================================== */}

                                    <div className="relative mt-7">

                                        <h3
                                            className="
                                            text-2xl
                                            font-black
                                            text-[#183B73]"
                                        >
                                            {member.name}
                                        </h3>

                                        <p
                                            className="
                                            mt-2
                                            text-sm
                                            font-bold
                                            leading-6
                                            text-[#46A6D9]"
                                        >
                                            {member.designation}
                                        </p>

                                        {member.bio && (
                                            <p
                                                className="
                                                mt-5
                                                line-clamp-4
                                                min-h-[112px]
                                                text-sm
                                                leading-7
                                                text-slate-600"
                                            >
                                                {member.bio}
                                            </p>
                                        )}

                                    </div>


                                    {/* ==================================================
                                        Social Links
                                    ================================================== */}

                                    <div
                                        className="
                                        relative
                                        mt-6
                                        flex
                                        justify-center
                                        gap-2.5"
                                    >

                                        {member.facebook && (
                                            <SocialLink
                                                href={
                                                    member.facebook
                                                }
                                                label="Facebook"
                                                small
                                                className="
                                                bg-[#183B73]
                                                hover:bg-[#24579D]"
                                            >
                                                <Facebook
                                                    size={16}
                                                />
                                            </SocialLink>
                                        )}

                                        {member.instagram && (
                                            <SocialLink
                                                href={
                                                    member.instagram
                                                }
                                                label="Instagram"
                                                small
                                                className="
                                                bg-[#46A6D9]
                                                hover:bg-[#24579D]"
                                            >
                                                <Instagram
                                                    size={16}
                                                />
                                            </SocialLink>
                                        )}

                                        {member.linkedin && (
                                            <SocialLink
                                                href={
                                                    member.linkedin
                                                }
                                                label="LinkedIn"
                                                small
                                                className="
                                                bg-[#24579D]
                                                hover:bg-[#183B73]"
                                            >
                                                <Linkedin
                                                    size={16}
                                                />
                                            </SocialLink>
                                        )}

                                    </div>


                                    {/* Bottom Label */}

                                    <div
                                        className="
                                        relative
                                        mt-7
                                        border-t
                                        border-slate-200/80
                                        pt-5"
                                    >
                                        <div
                                            className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            text-xs
                                            font-semibold
                                            text-slate-500"
                                        >
                                            <span
                                                className="
                                                h-1.5
                                                w-1.5
                                                rounded-full
                                                bg-[#46A6D9]"
                                            />

                                            {t.team.teamMember ||
                                                "Team Member"}
                                        </div>
                                    </div>

                                </motion.article>
                            )
                        )}

                    </div>
                )}


                {/* ======================================================
                    Bottom CTA - Updated Button Colors
                ====================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    className="
                    relative
                    mt-24
                    overflow-hidden
                    rounded-[40px]"
                >

                    {/* CTA Background */}

                    <div
                        className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[#183B73]
                        via-[#24579D]
                        to-[#46A6D9]"
                    />

                    {/* Decorative Glows */}

                    <div
                        className="
                        absolute
                        -bottom-32
                        -left-20
                        h-80
                        w-80
                        rounded-full
                        bg-white/10
                        blur-[110px]"
                    />

                    <div
                        className="
                        absolute
                        -right-20
                        -top-32
                        h-80
                        w-80
                        rounded-full
                        bg-sky-300/20
                        blur-[110px]"
                    />

                    <div
                        className="
                        relative
                        z-10
                        px-8
                        py-16
                        text-center
                        md:px-16
                        md:py-20"
                    >

                        <motion.div
                            animate={{
                                rotate: [
                                    0,
                                    8,
                                    -8,
                                    0,
                                ],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 6,
                                ease: "easeInOut",
                            }}
                            className="
                            mx-auto
                            mb-7
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-white/15
                            backdrop-blur"
                        >
                            <Users
                                size={38}
                                className="
                                text-white"
                            />
                        </motion.div>

                        <h2
                            className="
                            text-3xl
                            font-black
                            text-white
                            md:text-5xl"
                        >
                            {t.team.ctaTitle ||
                                "Ready to Work Together?"}
                        </h2>

                        <p
                            className="
                            mx-auto
                            mt-5
                            max-w-3xl
                            text-base
                            leading-8
                            text-white/80
                            md:text-lg"
                        >
                            {t.team.ctaDescription ||
                                "Let's create something amazing together. Get in touch with our team today."}
                        </p>

                        <div
                            className="
                            mt-9
                            flex
                            flex-wrap
                            justify-center
                            gap-4"
                        >

                            {/* Start Project Button - Vibrant Gradient */}

                            <Button
                                asChild
                                size="lg"
                                style={{
                                    background: "linear-gradient(135deg, #46A6D9 0%, #58C4F4 100%)",
                                    color: "#FFFFFF",
                                    border: "none",
                                    boxShadow: "0 8px 25px rgba(70, 166, 217, 0.45)",
                                    transition: "all 0.3s ease",
                                    fontWeight: "600",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(70, 166, 217, 0.55)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(70, 166, 217, 0.45)";
                                }}
                            >
                                <Link href="/contact">
                                    {t.team.startProject ||
                                        "Start a Project"}

                                    <ArrowRight
                                        className="
                                        ms-2
                                        h-5
                                        w-5"
                                    />
                                </Link>
                            </Button>

                            {/* Meet Our Team Button - White with Blue Border */}

                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                style={{
                                    background: "rgba(255, 255, 255, 0.15)",
                                    color: "#FFFFFF",
                                    border: "2px solid rgba(255, 255, 255, 0.6)",
                                    backdropFilter: "blur(10px)",
                                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                                    transition: "all 0.3s ease",
                                    fontWeight: "600",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                                    e.currentTarget.style.borderColor = "#FFFFFF";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.25)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                                }}
                            >
                                <Link href="/about">
                                    {t.team.meetTeam || "Meet Our Team"}
                                </Link>
                            </Button>

                        </div>

                    </div>

                </motion.div>

            </Container>
        </section>
    );
}


/*
|--------------------------------------------------------------------------
| Social Link
|--------------------------------------------------------------------------
*/

function SocialLink({
    href,
    label,
    children,
    className,
    small = false,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
    className?: string;
    small?: boolean;
}) {
    return (
        <motion.div
            whileHover={{
                y: -3,
                scale: 1.08,
            }}
            whileTap={{
                scale: 0.95,
            }}
        >
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`
                    flex
                    ${
                        small
                            ? "h-10 w-10"
                            : "h-11 w-11"
                    }
                    items-center
                    justify-center
                    rounded-full
                    text-white
                    shadow-sm
                    transition-colors
                    duration-300
                    ${className ?? ""}
                `}
            >
                {children}
            </Link>
        </motion.div>
    );
}
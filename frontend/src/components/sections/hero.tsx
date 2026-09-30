"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

import {
    PlayCircle,
    Sparkles,
    Award,
    Palette,
    Megaphone,
    Printer,
    ArrowRight,
    Star,
    CheckCircle2,
    Zap,
    Globe2,
    Globe,
    PenTool,
    Film,
    Video,
} from "lucide-react";

import { useMemo } from "react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/button";

import { company } from "@/config/company";
import { useLanguage } from "@/context/language-context";

const services = [
    {
        titleEn: "Website Development",
        titleFa: "توسعه وب‌سایت",
        icon: Globe,
    },
    {
        titleEn: "Logo Design",
        titleFa: "طراحی لوگو",
        icon: PenTool,
    },
    {
        titleEn: "Graphic Design",
        titleFa: "طراحی گرافیک",
        icon: Palette,
    },
    {
        titleEn: "Motion Graphics",
        titleFa: "موشن گرافیک",
        icon: Film,
    },
    {
        titleEn: "Video Advertisement",
        titleFa: "تولید ویدیو تبلیغاتی",
        icon: Video,
    },
    {
        titleEn: "Printing Services",
        titleFa: "خدمات چاپ",
        icon: Printer,
    },
    {
        titleEn: "Digital Marketing",
        titleFa: "بازاریابی دیجیتال",
        icon: Megaphone,
    },
];

const servicePositions = [
    // Website Development
    "absolute left-1/2 top-[250px] -translate-x-1/2",

    // Logo Design
    "absolute left-0 top-[335px]",

    // Graphic Design
    "absolute right-0 top-[335px]",

    // Motion Graphics
    "absolute left-0 top-[440px]",

    // Video Advertisement
    "absolute right-0 top-[440px]",

    // Printing Services
    "absolute left-0 top-[545px]",

    // Digital Marketing
    "absolute right-0 top-[545px]",
];

const particlePositions = [

    { left: "6%", top: "12%", size: 5 },
    { left: "18%", top: "78%", size: 4 },
    { left: "27%", top: "26%", size: 7 },
    { left: "36%", top: "58%", size: 5 },
    { left: "48%", top: "10%", size: 8 },
    { left: "55%", top: "74%", size: 6 },
    { left: "68%", top: "34%", size: 5 },
    { left: "76%", top: "84%", size: 7 },
    { left: "88%", top: "20%", size: 4 },
    { left: "94%", top: "60%", size: 5 },
    { left: "12%", top: "48%", size: 6 },
    { left: "44%", top: "90%", size: 5 },
    { left: "82%", top: "8%", size: 6 },
    { left: "60%", top: "48%", size: 4 },
    { left: "31%", top: "14%", size: 7 },
    { left: "72%", top: "56%", size: 5 },

];

const fadeUp = {

    hidden: {
        opacity: 0,
        y: 60,
    },

    show: {
        opacity: 1,
        y: 0,

        transition: {
            duration: .8,
        },
    },

};

const staggerContainer = {

    hidden: {},

    show: {

        transition: {

            staggerChildren: .12,

        },

    },

};

const floatingAnimation = {

    y: [0, -12, 0],

    rotate: [0, 2, 0, -2, 0],

};

export default function Hero() {

    const { language } = useLanguage();

    const isFa = language === "fa";

    const statistics = [
        {
            number: isFa ? "+۹۰۰۰" : "9000+",
            labelEn: "Projects",
            labelFa: "پروژه",
        },
        {
            number: isFa ? "۹۸٪" : "98%",
            labelEn: "Happy Clients",
            labelFa: "رضایت مشتری",
        },
        {
            number: isFa ? "+۸" : "8+",
            labelEn: "Years",
            labelFa: "سال تجربه",
        },
        {
            number: isFa ? "۲۴/۷" : "24/7",
            labelEn: "Support",
            labelFa: "پشتیبانی",
        },
    ];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [0, 900], [10, -10]);

    const rotateY = useTransform(mouseX, [0, 1600], [-10, 10]);

    const glowSize = useMemo(() => 420, []);

    const glowX = useSpring(mouseX, {
        stiffness: 120,
        damping: 25,
    });

    const glowY = useSpring(mouseY, {
        stiffness: 120,
        damping: 25,
    });

    function handleMouseMove(
        event: React.MouseEvent<HTMLDivElement>
    ) {

        const rect = event.currentTarget.getBoundingClientRect();

        mouseX.set(event.clientX - rect.left);

        mouseY.set(event.clientY - rect.top);

    }

    return (

        <section
            onMouseMove={handleMouseMove}
            className="
            relative
            overflow-hidden
            pt-8
            pb-28
            lg:pt-10
            lg:pb-40"
        >

            {/* ================= Animated Background ================= */}

            <div
                className="
                absolute
                inset-0
                -z-20
                bg-[radial-gradient(circle_at_top_left,#8bd7ff_0%,transparent_25%),radial-gradient(circle_at_bottom_right,#183B73_0%,transparent_30%),linear-gradient(to_bottom_right,#ffffff,#eff8ff,#ffffff)]"
            />

            {/* Aurora Layer */}

            <motion.div

                animate={{

                    backgroundPosition: [

                        "0% 50%",
                        "100% 50%",
                        "0% 50%",

                    ],

                }}

                transition={{

                    duration: 25,

                    repeat: Infinity,

                    ease: "linear",

                }}

                className="
                absolute
                inset-0
                -z-20
                opacity-40
                blur-3xl"

                style={{

                    backgroundImage: `
                    radial-gradient(circle at 15% 20%, rgba(70,166,217,.30), transparent 30%),
                    radial-gradient(circle at 85% 30%, rgba(24,59,115,.20), transparent 35%),
                    radial-gradient(circle at 50% 80%, rgba(70,166,217,.25), transparent 40%)
                    `,

                    backgroundSize: "200% 200%",

                }}

            />

            {/* Mouse Follow Glow */}

            <motion.div

                style={{
                    left: glowX,
                    top: glowY,
                }}

                className="
                pointer-events-none
                absolute
                h-[500px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gradient-to-r
                from-sky-400/25
                via-cyan-300/20
                to-blue-500/25
                blur-[160px]"

            />

            <motion.div

                animate={{
                    x: [0, 60, 0],
                    y: [0, -30, 0],
                }}

                transition={{
                    duration: 14,
                    repeat: Infinity,
                }}

                className="
                absolute
                -top-40
                right-0
                h-[520px]
                w-[520px]
                rounded-full
                bg-[#46A6D9]/20
                blur-[120px]"
            />

            <motion.div

                animate={{
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                }}

                transition={{
                    duration: 16,
                    repeat: Infinity,
                }}

                className="
                absolute
                bottom-0
                left-0
                h-[420px]
                w-[420px]
                rounded-full
                bg-[#183B73]/10
                blur-[120px]"
            />

            <div

                className="
                absolute
                inset-0
                -z-10
                opacity-[0.18]
                [background-image:
                linear-gradient(rgba(24,59,115,.09)_1px,transparent_1px),
                linear-gradient(90deg,rgba(24,59,115,.09)_1px,transparent_1px)]
                [background-size:50px_50px]"

            />

            {/* Floating Particles */}

            {
                particlePositions.map((particle, index) => (

                    <motion.div

                        key={index}

                        animate={{

                            y: [0, -35, 0],

                            opacity: [.25, 1, .25],

                            scale: [1, 1.4, 1],

                        }}

                        transition={{

                            duration: 3 + index * .4,

                            repeat: Infinity,

                        }}

                        style={{

                            width: particle.size,

                            height: particle.size,

                            left: particle.left,

                            top: particle.top,

                        }}

                        className="
                        absolute
                        rounded-full
                        bg-gradient-to-br
                        from-[#46A6D9]
                        to-white
                        shadow-[0_0_25px_rgba(70,166,217,.6)]"

                    />

                ))
            }

            <Container>

                <div
                    className="
                    mt-32
                    lg:mt-40
                    grid
                    items-center
                    gap-24
                    lg:grid-cols-2"
                >

                    {/* ================= Left Side ================= */}

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="relative z-10"
                    >

                        {/* Premium Badge */}

                        <motion.div
                            variants={fadeUp}
                            className="
                            inline-flex
                            items-center
                            gap-3
                            rounded-full
                            border
                            border-white/60
                            bg-white/70
                            px-6
                            py-3
                            shadow-xl
                            backdrop-blur-2xl"
                        >

                            <div className="relative">

                                <Sparkles
                                    size={18}
                                    className="text-[#46A6D9]"
                                />

                                <motion.span

                                    animate={{

                                        scale:[1,1.6,1],
                                        opacity:[1,0,1],

                                    }}

                                    transition={{

                                        repeat:Infinity,
                                        duration:2,

                                    }}

                                    className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    bg-sky-400/40"

                                />

                            </div>

                            <span
                                className="
                                font-semibold
                                text-[#183B73]"
                            >

                                

                            </span>

                        </motion.div>

                        {/* Heading */}

                        <motion.h1
                            variants={fadeUp}
                            className="
                            mt-8
                            max-w-3xl
                            text-5xl
                            font-black
                            leading-tight
                            md:text-6xl
                            xl:text-7xl"
                        >

                            {isFa ? (

                                <>
                                    <span className="text-[#183B73]">
                                        <br/><br/>
                                        کسب‌وکار خود را
                                    </span>

                                    <br />

                                    <span
                                        className="
                                        bg-gradient-to-r
                                        from-[#183B73]
                                        via-[#46A6D9]
                                        to-sky-500
                                        bg-clip-text
                                        text-transparent"
                                    >
                                        با راهکارهای خلاقانه
                                    </span>

                                    <br />

                                    <span className="text-slate-800">
                                        تبلیغاتی متحول کنید
                                    </span>
                                </>

                            ) : (

                                <>
                                    <span className="text-[#183B73]">
                                        <br/><br/>
                                        Transform Your Business
                                    </span>

                                    <br />

                                    <span
                                        className="
                                        bg-gradient-to-r
                                        from-[#183B73]
                                        via-[#46A6D9]
                                        to-sky-500
                                        bg-clip-text
                                        text-transparent"
                                    >
                                        with Creative
                                    </span>

                                    <br />

                                    <span className="text-slate-800">
                                        Advertising Solutions
                                    </span>
                                </>

                            )}

                        </motion.h1>

                        {/* Description */}

                        <motion.p
                            variants={fadeUp}
                            className="
                            mt-8
                            max-w-2xl
                            text-lg
                            leading-9
                            text-slate-600
                            "
                            style={{ paddingTop: '20px' }}
                        >

                            {isFa

                                ? "شرکت تبلیغاتی فراگستر با بهره‌گیری از دانش طراحی، فناوری اطلاعات، تولید محتوا و صنعت چاپ، خدمات جامع تبلیغاتی را برای رشد کسب‌وکارها ارائه می‌کند."

                                : "We help brands grow through professional design, printing, digital marketing and modern technology solutions."

                            }

                        </motion.p>

                        <br />

                        {/* Feature Pills */}

                        <motion.div

                            variants={fadeUp}

                            className="
                            mt-10
                            flex
                            flex-wrap
                            gap-4"

                        >

                            {

                                [

                                    {

                                        icon:CheckCircle2,

                                        textEn:"Premium Quality",

                                        textFa:"کیفیت ممتاز",

                                    },

                                    {

                                        icon:Zap,

                                        textEn:"Fast Delivery",

                                        textFa:"تحویل سریع",

                                    },

                                    {

                                        icon:Globe2,

                                        textEn:"Global Standards",

                                        textFa:"استاندارد جهانی",

                                    },

                                ].map((item,index)=>{

                                    const Icon=item.icon;

                                    return(

                                        <motion.div

                                            key={index}

                                            whileHover={{

                                                y:-5,
                                                scale:1.04,

                                            }}

                                            className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-full
                                            border
                                            border-white/70
                                            bg-white/70
                                            px-5
                                            py-3
                                            shadow-lg
                                            backdrop-blur-xl"

                                        >

                                            <Icon

                                                size={18}

                                                className="text-[#46A6D9]"

                                            />

                                            <span
                                                className="
                                                text-sm
                                                font-semibold"
                                            >

                                                {

                                                    isFa

                                                        ? item.textFa

                                                        : item.textEn

                                                }

                                            </span>

                                        </motion.div>

                                    )

                                })

                            }

                        </motion.div>

                        <br />

                        {/* Buttons */}

                        <motion.div

                            variants={fadeUp}

                            className="
                            mt-12
                            flex
                            flex-wrap
                            gap-5"
                        >

                            {isFa ? (
                                // Persian: Contact Us first, then View Services
                                <>
                                    <Button
                                        href="/contact"
                                        size="lg"
                                        className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-2xl
                                        border-0
                                        bg-gradient-to-r
                                        from-[#183B73]
                                        via-[#24639A]
                                        to-[#46A6D9]
                                        px-8
                                        py-4
                                        text-base
                                        font-bold
                                        text-white
                                        shadow-[0_15px_40px_rgba(24,59,115,.30)]
                                        transition-all
                                        duration-500
                                        hover:-translate-y-1
                                        hover:scale-[1.03]
                                        hover:shadow-[0_20px_55px_rgba(70,166,217,.45)]
                                        "
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            تماس با ما
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </span>
                                    </Button>

                                    <Button
                                        href="/services"
                                        size="lg"
                                        variant="outline"
                                        className="
                                        group
                                        rounded-2xl
                                        border-2
                                        border-[#46A6D9]/50
                                        bg-white/80
                                        px-8
                                        py-4
                                        text-base
                                        font-bold
                                        text-[#183B73]
                                        shadow-[0_10px_30px_rgba(24,59,115,.10)]
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:-translate-y-1
                                        hover:scale-[1.03]
                                        hover:border-[#46A6D9]
                                        hover:bg-[#46A6D9]
                                        hover:text-white
                                        hover:shadow-[0_20px_45px_rgba(70,166,217,.30)]
                                        "
                                    >
                                        <span className="flex items-center gap-2">
                                            مشاهده خدمات
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </span>
                                    </Button>
                                </>
                            ) : (
                                // English: View Services first, then Contact Us
                                <>
                                    <Button
                                        href="/services"
                                        size="lg"
                                        className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-2xl
                                        border-0
                                        bg-gradient-to-r
                                        from-[#183B73]
                                        via-[#24639A]
                                        to-[#46A6D9]
                                        px-8
                                        py-4
                                        text-base
                                        font-bold
                                        text-white
                                        shadow-[0_15px_40px_rgba(24,59,115,.30)]
                                        transition-all
                                        duration-500
                                        hover:-translate-y-1
                                        hover:scale-[1.03]
                                        hover:shadow-[0_20px_55px_rgba(70,166,217,.45)]
                                        "
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            View Services
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </span>
                                    </Button>

                                    <Button
                                        href="/contact"
                                        variant="outline"
                                        size="lg"
                                        className="
                                        group
                                        rounded-2xl
                                        border-2
                                        border-[#46A6D9]/50
                                        bg-white/80
                                        px-8
                                        py-4
                                        text-base
                                        font-bold
                                        text-[#183B73]
                                        shadow-[0_10px_30px_rgba(24,59,115,.10)]
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:-translate-y-1
                                        hover:scale-[1.03]
                                        hover:border-[#46A6D9]
                                        hover:bg-[#46A6D9]
                                        hover:text-white
                                        hover:shadow-[0_20px_45px_rgba(70,166,217,.30)]
                                        "
                                    >
                                        <span className="flex items-center gap-2">
                                            Contact Us
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </span>
                                    </Button>
                                </>
                            )}

                        </motion.div>

                        <br />

                        {/* Trust Row */}

                        <motion.div

                            variants={fadeUp}

                            className="
                            mt-10
                            flex
                            items-center
                            gap-6"

                        >

                            <div className="flex -space-x-3">

                                {

                                    [1,2,3,4].map((i)=>(

                                        <div

                                            key={i}

                                            className="
                                            h-12
                                            w-12
                                            rounded-full
                                            border-4
                                            border-white
                                            bg-gradient-to-br
                                            from-[#46A6D9]
                                            to-[#183B73]"

                                        />

                                    ))

                                }

                            </div>

                            <div>

                                <div className="flex">

                                    {

                                        [1,2,3,4,5].map((i)=>(

                                            <Star

                                                key={i}

                                                size={16}

                                                fill="#facc15"

                                                className="text-yellow-400"

                                            />

                                        ))

                                    }

                                </div>

                                <p className="mt-1 text-sm text-slate-500">

                                    {

                                        isFa

                                            ? "بیش از ۵۰۰۰ مشتری راضی"

                                            : "Trusted by 5000+ happy clients"

                                    }

                                </p>

                            </div>

                        </motion.div>

                        <br />

                        {/* Statistics */}

                        <motion.div

                            variants={fadeUp}

                            className="
                            mt-16
                            grid
                            grid-cols-2
                            gap-5
                            md:grid-cols-4"

                        >

                            {

                                statistics.map((item,index)=>(

                                    <motion.div

                                        key={index}

                                        whileHover={{

                                            y:-12,
                                            scale:1.06,
                                            rotateX:6,

                                        }}

                                        className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-3xl
                                        border
                                        border-white/60
                                        bg-white/70
                                        p-6
                                        shadow-xl
                                        backdrop-blur-xl
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        text-center"
                                    >

                                        <div
                                            className="
                                            absolute
                                            inset-0
                                            opacity-0
                                            transition
                                            duration-500
                                            group-hover:opacity-100
                                            bg-gradient-to-br
                                            from-sky-100/60
                                            to-white"
                                        />

                                        <div className="relative">

                                            <h3
                                                className="
                                                text-4xl
                                                font-black
                                                text-[#183B73]"
                                            >

                                                {item.number}

                                            </h3>

                                            <p
                                                className="
                                                mt-2
                                                text-sm
                                                text-slate-500"
                                            >

                                                {

                                                    isFa

                                                        ? item.labelFa

                                                        : item.labelEn

                                                }

                                            </p>

                                        </div>

                                    </motion.div>

                                ))

                            }

                        </motion.div>

                        {/* Add space at the bottom */}
                        <br/><br/>

                    </motion.div>

                    {/* ================= Premium Showcase ================= */}
                    
                    <div className="relative mx-auto w-full max-w-[560px] h-[620px]">
                        <br/><br/><br/><br/>
                        <motion.div
                            initial={{ opacity: 0, x: 80, scale: .9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{
                                duration: 1,
                                delay: .25,
                            }}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            className="relative flex justify-center"
                        >

                            {/* Main Glow */}

                            <motion.div

                                animate={{

                                    scale:[1,1.15,1],
                                    opacity:[.35,.6,.35],

                                }}

                                transition={{

                                    duration:6,
                                    repeat:Infinity,

                                }}

                                className="
                                absolute
                                inset-8
                                rounded-full
                                bg-[#46A6D9]/30
                                blur-[90px]"

                            />

                            {/* Rotating Ring */}

                            <motion.div

                                animate={{
                                    rotate:360,
                                }}

                                transition={{

                                    repeat:Infinity,
                                    duration:25,
                                    ease:"linear",

                                }}

                                className="
                                absolute
                                h-[560px]
                                w-[560px]
                                rounded-full
                                border
                                border-sky-200/40"

                            >

                                <div
                                    className="
                                    absolute
                                    -top-2
                                    left-1/2
                                    h-4
                                    w-4
                                    -translate-x-1/2
                                    rounded-full
                                    bg-sky-400
                                    shadow-[0_0_35px_rgba(70,166,217,.9)]"
                                />

                            </motion.div>

                            {/* Main Card */}

                            <motion.div

                                animate={{

                                    y:[0,-10,0],

                                }}

                                transition={{

                                    duration:6,
                                    repeat:Infinity,

                                }}

                                whileHover={{

                                    scale:1.02,

                                }}

                                className="
                                relative
                                w-full
                                max-w-[520px]
                                overflow-hidden
                                rounded-[40px]
                                border
                                border-white/50
                                bg-white/60
                                p-8
                                shadow-[0_40px_120px_rgba(0,0,0,.18)]
                                backdrop-blur-3xl"

                            >

                                {/* Animated Border */}

                                <motion.div

                                    animate={{

                                        backgroundPosition:[
                                            "0%",
                                            "100%",
                                            "0%",
                                        ],

                                    }}

                                    transition={{

                                        repeat:Infinity,
                                        duration:8,

                                    }}

                                    className="
                                    absolute
                                    inset-0
                                    rounded-[40px]
                                    opacity-40"

                                    style={{

                                        backgroundImage:
                                        "linear-gradient(120deg,#46A6D9,#ffffff,#183B73,#46A6D9)",

                                        backgroundSize:"250% 250%",

                                        padding:"1px",

                                        WebkitMask:
                                        "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",

                                    }}

                                />

                                {/* Live Badge */}

                                <motion.div

                                    animate={{

                                        y:[0,-6,0],

                                    }}

                                    transition={{

                                        repeat:Infinity,
                                        duration:3,

                                    }}

                                    className="
                                    absolute
                                    right-6
                                    top-6
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-emerald-100
                                    px-4
                                    py-2
                                    shadow-lg"

                                >

                                    <motion.span

                                        animate={{

                                            scale:[1,1.4,1],
                                            opacity:[1,.3,1],

                                        }}

                                        transition={{

                                            repeat:Infinity,
                                            duration:1.5,

                                        }}

                                        className="
                                        h-3
                                        w-3
                                        rounded-full
                                        bg-emerald-500"

                                    />

                                    <span
                                        className="
                                        text-xs
                                        font-semibold
                                        text-emerald-700"
                                    >

                                        {isFa ? "آنلاین" : "LIVE"}

                                    </span>

                                </motion.div>

                                {/* Hero Display */}

                                <div
                                    className="
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    bg-gradient-to-br
                                    from-[#183B73]
                                    via-[#214b89]
                                    to-[#46A6D9]
                                    p-14
                                    text-center
                                    text-white"
                                >

                                    {/* Shine */}

                                    <motion.div

                                        animate={{

                                            x:["-180%","180%"],

                                        }}

                                        transition={{

                                            repeat:Infinity,
                                            duration:5,
                                            ease:"linear",

                                        }}

                                        className="
                                        absolute
                                        inset-y-0
                                        w-32
                                        rotate-12
                                        bg-white/30
                                        blur-2xl"

                                    />

                                    {/* Decorative Circles */}

                                    <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-white/10"/>

                                    <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10"/>

                                    {/* Company */}

                                    <motion.h2

                                        animate={{

                                            scale:[1,1.03,1],

                                        }}

                                        transition={{

                                            duration:4,
                                            repeat:Infinity,

                                        }}

                                        className="
                                        text-5xl
                                        font-black"

                                    >

                                        {isFa ? "فراگستر" : "Faragostar"}

                                    </motion.h2>

                                    <p className="mt-5 text-lg opacity-90">

                                        {

                                            isFa

                                            ? "خلاقیت • کیفیت • نوآوری"

                                            : "Creativity • Quality • Innovation"

                                        }

                                    </p>

                                    {/* Premium Mini Cards */}

                                    <div
                                        className="
                                        mt-12
                                        grid
                                        grid-cols-3
                                        gap-4"
                                    >

                                        {

                                            [
                                                {
                                                    title: isFa ? "+۹۰۰۰" : "9000+",
                                                    sub: isFa ? "پروژه" : "Projects",
                                                },

                                                {
                                                    title: isFa ? "۹۸٪" : "98%",
                                                    sub: isFa ? "رضایت مشتری" : "Success Rate",
                                                },

                                                {
                                                    title: isFa ? "۲۴/۷" : "24/7",
                                                    sub: isFa ? "پشتیبانی" : "Support",
                                                },

                                            ].map((item,index)=>(

                                                <motion.div

                                                    key={index}

                                                    whileHover={{

                                                        y:-8,

                                                    }}

                                                    className="
                                                    rounded-2xl
                                                    border
                                                    border-white/20
                                                    bg-white/10
                                                    p-4
                                                    backdrop-blur-xl
                                                    text-center
                                                    flex
                                                    flex-col
                                                    items-center
                                                    justify-center"
                                                >

                                                    <h4 className="text-2xl font-bold">

                                                        {item.title}

                                                    </h4>

                                                    <p className="mt-1 text-xs opacity-80">

                                                        {item.sub}

                                                    </p>

                                                </motion.div>

                                            ))

                                        }

                                    </div>

                                </div>

                            </motion.div>

                        </motion.div>

                        {/* ================= Floating Premium Service Cards ================= */}
                        
                        {services.map((service, index) => {
                            
                            const Icon = service.icon;

                            return (

                                <motion.div

                                    key={index}

                                    animate={{

                                        y: [-5, 5],

                                    }}

                                    transition={{

                                        duration: 3,

                                        repeat: Infinity,

                                        repeatType: "mirror",

                                        delay: index * 0.2,

                                    }}

                                    whileHover={{

                                        scale: 1.08,

                                        y: -10,

                                    }}

                                    className={`
                                    ${servicePositions[index]}
                                    hidden
                                    xl:flex
                                    z-20
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-white/60
                                    bg-white/75
                                    px-6
                                    py-5
                                    shadow-[0_25px_60px_rgba(0,0,0,.18)]
                                    backdrop-blur-3xl
                                    `}
                                >

                                    {/* Animated Glow */}

                                    <motion.div

                                        animate={{

                                            opacity: [.15,.35,.15],

                                            scale: [1,1.3,1],

                                        }}

                                        transition={{

                                            repeat: Infinity,

                                            duration: 3,

                                        }}

                                        className="
                                        absolute
                                        -right-6
                                        -top-6
                                        h-24
                                        w-24
                                        rounded-full
                                        bg-sky-300
                                        blur-3xl"

                                    />

                                    {/* Icon */}

                                    <motion.div

                                        whileHover={{

                                            rotate: 360,

                                        }}

                                        transition={{

                                            duration: .8,

                                        }}

                                        className="
                                        relative
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-[#183B73]
                                        to-[#46A6D9]
                                        text-white
                                        shadow-xl"

                                    >

                                        <Icon size={24}/>

                                    </motion.div>

                                    {/* Text */}

                                    <div className="ml-4">

                                        <p className="font-bold text-[#183B73]">

                                            {isFa ? service.titleFa : service.titleEn}

                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">

                                            {

                                                isFa

                                                ? "راهکار حرفه‌ای"

                                                : "Professional Solution"

                                            }

                                        </p>

                                    </div>

                                </motion.div>

                            );

                        })}

                    </div>

                </div>

            </Container>

            {/* Decorative Floating Elements */}

            {[...Array(8)].map((_, index) => (

                <motion.div

                    key={index}

                    animate={{

                        y:[0,-30,0],

                        opacity:[.2,.8,.2],

                        scale:[1,1.3,1],

                    }}

                    transition={{

                        duration:5 + index,

                        repeat:Infinity,

                    }}

                    style={{

                        left:`${10 + index*11}%`,

                        top:`${8 + (index%4)*20}%`,

                    }}

                    className="
                    absolute
                    hidden
                    xl:block
                    h-2
                    w-2
                    rounded-full
                    bg-sky-400
                    shadow-[0_0_20px_rgba(70,166,217,.9)]"

                />

            ))}

            {/* Premium Background Rings */}

            <motion.div

                animate={{

                    rotate:360,

                }}

                transition={{

                    repeat:Infinity,

                    duration:60,

                    ease:"linear",

                }}

                className="
                absolute
                right-24
                top-24
                hidden
                xl:block
                h-[650px]
                w-[650px]
                rounded-full
                border
                border-sky-100/40"

            />

            <motion.div

                animate={{

                    rotate:-360,

                }}

                transition={{

                    repeat:Infinity,

                    duration:80,

                    ease:"linear",

                }}

                className="
                absolute
                right-36
                top-36
                hidden
                xl:block
                h-[520px]
                w-[520px]
                rounded-full
                border
                border-[#183B73]/10"

            />

            {/* ================= Premium Scroll Indicator ================= */}

            <motion.div

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                transition={{

                    delay: 2,

                }}

                className="
                absolute
                bottom-8
                left-1/2
                hidden
                -translate-x-1/2
                lg:flex
                flex-col
                items-center
                gap-4"

            >

                <motion.span

                    animate={{

                        opacity:[.4,1,.4],

                        letterSpacing:["2px","6px","2px"],

                    }}

                    transition={{

                        repeat:Infinity,

                        duration:2,

                    }}

                    className="
                    text-xs
                    font-semibold
                    uppercase
                    text-slate-500"

                >

                    {isFa ? "برای مشاهده بیشتر" : "Scroll Down"}

                </motion.span>

                <div

                    className="
                    relative
                    flex
                    h-16
                    w-8
                    justify-center
                    rounded-full
                    border-2
                    border-[#183B73]/30
                    bg-white/40
                    backdrop-blur-xl"

                >

                    <motion.div

                        animate={{

                            y:[6,34,6],

                            opacity:[1,.4,1],

                        }}

                        transition={{

                            repeat:Infinity,

                            duration:1.8,

                        }}

                        className="
                        absolute
                        h-3
                        w-3
                        rounded-full
                        bg-gradient-to-br
                        from-[#46A6D9]
                        to-[#183B73]
                        shadow-[0_0_15px_rgba(70,166,217,.8)]"

                    />

                </div>

            </motion.div>

        </section>

    );

}
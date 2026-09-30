"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  Sparkles,
  Building2,
  MonitorSmartphone,
  Globe,
  Palette,
  PenTool,
  Clapperboard,
  Megaphone,
  Printer,
  Video,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export default function About() {
  const { t, language } = useLanguage();

  return (
    <>
      <style jsx>{`
        @keyframes floatGlow {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.05);
            opacity: 0.8;
          }
        }
        
        @keyframes shimmerBorder {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .about-section {
          position: relative;
          overflow: hidden;
          padding: 2rem 0;
          background: linear-gradient(160deg, #f8fafc 0%, #ffffff 40%, #e0f2fe 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .about-section {
            padding: 3rem 0;
          }
        }
        
        .about-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 30% 20%, rgba(70, 166, 217, 0.03) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Container wrapper for centering */
        .about-wrapper {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Glassmorphism cards with enhanced effects */
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.06),
            0 2px 8px rgba(70, 166, 217, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
          box-shadow: 
            0 20px 60px rgba(24, 59, 115, 0.10),
            0 8px 24px rgba(70, 166, 217, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(70, 166, 217, 0.3);
        }

        /* Enhanced badge styling */
        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.5rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(24, 59, 115, 0.12), rgba(70, 166, 217, 0.12));
          color: #183B73;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.025em;
          border: 1px solid rgba(24, 59, 115, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 12px rgba(24, 59, 115, 0.06);
          transition: all 0.4s ease;
        }
        
        .premium-badge:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 24px rgba(24, 59, 115, 0.12);
        }

        /* Gradient text with enhanced effect */
        .gradient-text {
          background: linear-gradient(135deg, #183B73 0%, #24579D 40%, #46A6D9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 40px rgba(70, 166, 217, 0.15);
          position: relative;
        }
        
        .gradient-text::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #46A6D9, transparent);
          border-radius: 10px;
          opacity: 0.5;
        }

        /* Icon container with premium styling */
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          background: linear-gradient(135deg, rgba(24, 59, 115, 0.08), rgba(70, 166, 217, 0.08));
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .group:hover .icon-wrapper {
          transform: scale(1.05) rotate(-2deg);
          background: linear-gradient(135deg, rgba(24, 59, 115, 0.15), rgba(70, 166, 217, 0.15));
          border-color: rgba(70, 166, 217, 0.3);
          box-shadow: 0 4px 16px rgba(70, 166, 217, 0.15);
        }

        /* Expertise item with enhanced hover */
        .expertise-item {
          position: relative;
          overflow: hidden;
          padding: 1.25rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .expertise-item:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 
            0 12px 40px rgba(24, 59, 115, 0.10),
            0 4px 16px rgba(70, 166, 217, 0.08);
          border-color: rgba(70, 166, 217, 0.3);
          background: rgba(255, 255, 255, 0.85);
        }

        .expertise-item .icon-gradient {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #183B73, #46A6D9);
          color: white;
          box-shadow: 0 4px 16px rgba(24, 59, 115, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .expertise-item:hover .icon-gradient {
          transform: scale(1.1) rotate(4deg);
          box-shadow: 0 8px 24px rgba(24, 59, 115, 0.3);
        }

        /* Expanded Left Banner */
        .expanded-banner {
          height: 100%;
          min-height: 500px;
        }

        @media (min-width: 1024px) {
          .expanded-banner {
            min-height: 600px;
          }
        }

        /* Bottom CTA section - Dark background with ALL WHITE text and icons */
        .cta-section {
          padding: 2rem;
          border-radius: 2.25rem;
          background: linear-gradient(135deg, #0f1f3a 0%, #183B73 40%, #1a5290 70%, #46A6D9 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 40px rgba(24, 59, 115, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          max-width: 1024px;
        }

        @media (min-width: 1024px) {
          .cta-section {
            padding: 2.5rem;
          }
        }

        .cta-section:hover {
          box-shadow: 0 12px 60px rgba(24, 59, 115, 0.4);
          transform: translateY(-2px);
        }

        .cta-title {
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .cta-title {
            font-size: 2.5rem;
          }
        }

        .cta-description {
          margin-top: 1rem;
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .benefit-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .benefit-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .benefit-item:hover .benefit-check {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .benefit-check svg {
          color: #ffffff;
        }

        .benefit-text {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Button styles - ALL WHITE */
        .btn-white-primary {
          background: #ffffff;
          border: none;
          color: #183B73;
          padding: 0.875rem 2rem;
          border-radius: 0.75rem;
          font-weight: 700;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }

        .btn-white-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(70, 166, 217, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .btn-white-primary:hover::before {
          left: 100%;
        }

        .btn-white-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px rgba(255, 255, 255, 0.3);
          background: #f0f4ff;
        }

        .btn-white-primary svg {
          color: #183B73;
        }

        .btn-white-outline {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: #ffffff;
          padding: 0.875rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }

        .btn-white-outline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.08);
          transform: scale(0);
          transition: transform 0.4s ease;
          border-radius: 0.75rem;
        }

        .btn-white-outline:hover::before {
          transform: scale(1);
        }

        .btn-white-outline:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.08);
        }

        .btn-white-outline svg {
          color: #ffffff;
        }

        .section-heading {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1.2;
          color: #183B73;
          letter-spacing: -0.02em;
        }

        @media (min-width: 768px) {
          .section-heading {
            font-size: 3.5rem;
          }
        }

        @media (min-width: 1024px) {
          .section-heading {
            font-size: 4.5rem;
          }
        }

        .heading-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 768px;
          margin: 0 auto 80px;
          text-align: center;
        }

        /* Content wrapper for centering */
        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .grid-layout {
          display: grid;
          gap: 64px;
          width: 100%;
          max-width: 1200px;
        }

        @media (min-width: 1024px) {
          .grid-layout {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
        }

        /* Left column */
        .left-column {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .about-section {
            padding: 1.5rem 0 !important;
          }
          .about-wrapper {
            padding: 0 20px;
          }
          .glass-card {
            padding: 24px !important;
          }
          .expanded-banner {
            min-height: 350px !important;
          }
          .cta-title {
            font-size: 1.75rem !important;
          }
        }

        @media (max-width: 640px) {
          .about-section {
            padding: 1rem 0 !important;
          }
          .about-wrapper {
            padding: 0 16px;
          }
          .glass-card {
            padding: 20px !important;
            border-radius: 24px !important;
          }
          .section-heading {
            font-size: 28px !important;
          }
          .heading-wrapper {
            margin-bottom: 48px;
          }
          .grid-layout {
            gap: 32px;
          }
          .cta-section {
            padding: 20px !important;
            border-radius: 24px !important;
          }
          .cta-title {
            font-size: 1.5rem !important;
          }
          .cta-description {
            font-size: 1rem !important;
          }
          .expertise-item {
            padding: 16px !important;
          }
          .premium-badge {
            padding: 0.4rem 1rem !important;
            font-size: 12px !important;
          }
          .expanded-banner {
            min-height: 250px !important;
          }
        }
      `}</style>

      <section className="about-section">
        {/* Background Glows */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-44 top-10 h-[420px] w-[420px] rounded-full bg-[#46A6D9]/20 blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, -60, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-[#183B73]/10 blur-[170px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#46A6D9]/5 blur-[120px]"
          />
        </div>

        <div className="about-wrapper">
          <div className="content-wrapper">
            {/* Section Heading - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="heading-wrapper"
            >
              <div className="premium-badge">
                <Sparkles size={16} />
                {t.about.badge}
              </div>

              <h2 className="mt-8 section-heading">
                {t.about.heading.line1}
                <br />
                {t.about.heading.line2}
                <br />
                <span className="gradient-text">
                  {t.about.heading.line3}
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-600 font-medium">
                {t.about.description}
              </p>
            </motion.div>

            {/* Main Layout - Centered Grid */}
            <div className="grid-layout">
              {/* Left Column - Expanded Banner */}
              <div className="left-column">
                <motion.div
                  initial={{ opacity: 0, x: language === "fa" ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative flex justify-center h-full"
                >
                  <div className="glass-card relative overflow-hidden rounded-[40px] p-10 w-full expanded-banner">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#46A6D9]/20 blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-[#183B73]/10 blur-3xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#46A6D9]/5 rounded-[40px]" />

                    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-[#183B73] via-[#24579D] to-[#46A6D9] shadow-2xl w-full h-full">
                      <motion.div
                        animate={{
                          scale: [1, 1.08, 1],
                          rotate: [0, 4, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute h-72 w-72 rounded-full border border-white/10"
                      />
                      <motion.div
                        animate={{
                          scale: [1.1, 0.95, 1.1],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute h-52 w-52 rounded-full border border-white/20"
                      />
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative z-10"
                      >
                        <Building2 size={110} className="text-white drop-shadow-2xl" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: language === "fa" ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Who We Are - Added padding */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="glass-card group relative overflow-hidden rounded-[30px] p-10"
                  style={{ padding: '2.5rem' }}
                >
                  <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#46A6D9]/15 blur-3xl transition-all duration-700 group-hover:scale-125" />
                  <div className="icon-wrapper">
                    <Building2 size={28} className="text-[#183B73]" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-[#183B73]">
                    {t.about.whoWeAre}
                  </h3>
                  <p className="mt-4 text-base leading-9 text-slate-600">
                    {t.about.company}
                  </p>
                </motion.div>

                {/* Mission - Added padding */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="glass-card group relative overflow-hidden rounded-[30px] p-10"
                  style={{ padding: '2.5rem' }}
                >
                  <div className="absolute -left-20 -bottom-20 h-44 w-44 rounded-full bg-[#183B73]/10 blur-3xl transition-all duration-700 group-hover:scale-125" />
                  <div className="icon-wrapper">
                    <Sparkles size={28} className="text-[#46A6D9]" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-[#183B73]">
                    {t.about.mission}
                  </h3>
                  <p className="mt-4 text-base leading-9 text-slate-600">
                    {t.about.missionText}
                  </p>
                </motion.div>

                {/* Expertise */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, duration: 0.7 }}
                >
                  <h3 className="mb-6 text-2xl font-bold text-[#183B73]">
                    {t.about.expertise}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      MonitorSmartphone,
                      Globe,
                      Palette,
                      PenTool,
                      Clapperboard,
                      Megaphone,
                      Printer,
                    ].map((Icon, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08, duration: 0.5 }}
                        className="expertise-item group"
                      >
                        <div className="relative z-10 flex items-center gap-4">
                          <div className="icon-gradient">
                            <Icon size={22} />
                          </div>
                          <span className="font-semibold leading-6 text-slate-800">
                            {t.about.expertiseItems[index]}
                          </span>
                        </div>
                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#46A6D9]/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom CTA Section - Moved further down with inline CSS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="cta-section"
              style={{ marginTop: '8rem' }}
            >
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h3 className="cta-title">
                    {t.about.whyTitle}
                  </h3>
                  <p className="cta-description">
                    {t.about.whyDescription}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      t.about.benefitOne,
                      t.about.benefitTwo,
                      t.about.benefitThree,
                      t.about.benefitFour,
                    ].map((item) => (
                      <div key={item} className="benefit-item">
                        <div className="benefit-check">
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="benefit-text">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <Link 
                    href="/services" 
                    className="btn-white-primary"
                    style={{ color: '#ffffff' }}
                  >
                    {t.about.exploreServices}
                    <ArrowRight 
                      className="h-5 w-5" 
                      style={{ color: '#ffffff' }}
                    />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="btn-white-outline"
                    style={{ color: '#ffffff' }}
                  >
                    {t.about.startProject}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
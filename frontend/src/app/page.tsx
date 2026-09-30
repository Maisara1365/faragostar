import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import Section from "@/components/layout/Section";

import Button from "@/components/ui/button";
import Hero from "@/components/sections/hero";

import {
    ArrowRight,
    LogIn,
} from "lucide-react";
import Trusted from "@/components/sections/trusted";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/services";
import Process from "@/components/sections/Process";
import TestimonialSection from "@/components/sections/Testimonial";
import Team from "../components/sections/Team";
import About from "@/components/sections/About";

export default function HomePage() {

    return (

        <>

            <Header />

            <main className="pt-[150px] lg:pt-[170px]">

                <Hero />

                <Services />
                <Portfolio /> 
                <Team /> 
                <About /> 
		<Process />
                <TestimonialSection /> 

            </main>

            <Footer />

        </>

    );

}
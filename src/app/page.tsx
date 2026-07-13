"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";

// Sections
import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Products from "@/components/sections/Products";
import Services from "@/components/sections/Services";
import BuyRefurbishProcess from "@/components/sections/BuyRefurbishProcess";
import WikiPreview from "@/components/sections/WikiPreview";
import Offers from "@/components/sections/Offers";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import LocationContact from "@/components/sections/LocationContact";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      {/* Sticky Top Header */}
      <Header />

      {/* Main Sections Composition */}
      <main className="flex-1 pb-16 lg:pb-0">
        <Hero />
        <Brands />
        <Products />
        <Services />
        <BuyRefurbishProcess />
        <WikiPreview />
        <Offers />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <LocationContact />
        <ContactForm />
      </main>

      {/* Footer layout */}
      <Footer />

      {/* Mobile persistent bottom Call & WA bar */}
      <MobileContactBar />
    </div>
  );
}

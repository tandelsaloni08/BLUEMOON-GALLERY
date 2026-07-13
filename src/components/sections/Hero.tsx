"use client";

import React from "react";
import { Phone, MessageCircle, Star, Shield, ArrowRight, Laptop, Smartphone } from "lucide-react";
import { siteData } from "../../../content/site-data";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 lg:py-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start"
          >
            {/* Tag Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-semibold text-xs sm:text-sm mb-6"
            >
              <Star className="w-4 h-4 fill-blue-400" />
              <span>Trusted Local Tech Partner Since 2005</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none mb-6"
            >
              Your Smart Choice for Tech in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300">
                Bilimora
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8"
            >
              Get certified refurbished iPhones, laptops, and tablets with local warranty. Trade in your old device instantly or browse our free specification encyclopedia.
            </motion.p>

            {/* Primary CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
            >
              <a
                href={`tel:${siteData.business.contactNumber}`}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                <span>Call Shop: {siteData.business.contactNumber}</span>
              </a>

              <a
                href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
                  siteData.business.whatsappPrefilledMessage
                )}`}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold transition-all hover:bg-slate-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5.5 h-5.5 text-green-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full pt-8 border-t border-slate-900"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">20+ Years</div>
                <div className="text-xs sm:text-sm text-slate-400">In Business</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">45+ Daily</div>
                <div className="text-xs sm:text-sm text-slate-400">Customers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">100%</div>
                <div className="text-xs sm:text-sm text-slate-400">Genuine Parts</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Local</div>
                <div className="text-xs sm:text-sm text-slate-400">Warranty Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:flex justify-center relative"
          >
            {/* Main Visual Frame */}
            <div className="relative w-[340px] h-[480px] bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden gold-glow">
              {/* Crescent Moon Visual Graphic */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />

              {/* Inner UI layout */}
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono">bluemoon.OS</span>
                </div>

                {/* Main Spec Card mockup */}
                <div className="flex-1 flex flex-col justify-center gap-6 py-6">
                  {/* Laptop Sil */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                      <Laptop className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Certified Laptops</div>
                      <div className="text-sm font-semibold text-white font-mono">Dell • HP • Lenovo</div>
                    </div>
                  </div>

                  {/* Phone Sil */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Refurbished Phones</div>
                      <div className="text-sm font-semibold text-white font-mono">iPhone • Realme • Vivo</div>
                    </div>
                  </div>

                  {/* Trust badge */}
                  <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-center">
                    <div className="text-xs text-blue-400 font-semibold mb-1">Guaranteed Quality</div>
                    <div className="text-xs text-slate-400">All pre-owned units undergo a 20-point diagnostic run.</div>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-[10px] text-slate-500 font-mono">
                  <span>EST. 2005</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Shield className="w-3.5 h-3.5 fill-amber-400/20" />
                    <span>SECURE CHECK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Absolute side overlay card */}
            <div className="absolute top-1/4 -right-12 p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center gap-3 glass backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Average valuation</div>
                <div className="text-xs font-bold text-white">Best rates in Bilimora</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

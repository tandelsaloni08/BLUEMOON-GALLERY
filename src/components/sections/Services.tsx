"use client";

import React from "react";
import { siteData } from "../../../content/site-data";
import { ShoppingBag, RefreshCw, ShieldCheck, Percent, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<any>> = {
  ShoppingBag: ShoppingBag,
  RefreshCw: RefreshCw,
  ShieldCheck: ShieldCheck,
  Percent: Percent,
  BookOpen: BookOpen,
};

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Our Core Services & Unique Values
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Since 2005, we have served the Bilimora community by keeping technology accessible, affordable, and highly reliable.
          </p>
        </div>

        {/* Services Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {siteData.services.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || ShieldCheck;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/30 transition-all hover:bg-slate-950/80 duration-300 relative group"
              >
                {/* Visual Accent */}
                <div className="absolute top-4 right-4 text-xs font-semibold text-slate-700 font-mono group-hover:text-blue-500/50 transition-colors">
                  0{idx + 1}
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Micro CTA */}
                {service.id === "wiki" ? (
                  <a
                    href="#wiki"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Browse Wiki Catalog</span>
                    <span>&rarr;</span>
                  </a>
                ) : service.id === "discounts" ? (
                  <a
                    href="#offers"
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Latest Offers</span>
                    <span>&rarr;</span>
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Enquire Details</span>
                    <span>&rarr;</span>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

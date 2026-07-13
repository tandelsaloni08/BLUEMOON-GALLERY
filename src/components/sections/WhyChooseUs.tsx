"use client";

import React from "react";
import { siteData } from "../../../content/site-data";
import { ShieldCheck, Users2, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "20+ Years Legacy",
      description: "Serving Bilimora and surrounding towns since 2005. A verified local store built on trust."
    },
    {
      icon: Users2,
      title: "45+ Daily Customers",
      description: "A large base of regular returning customers who rely on us for their tech purchases and trade-ins."
    },
    {
      icon: ShieldCheck,
      title: "100% Genuine Parts",
      description: "No cheap knock-offs. All refurbished devices are rebuilt using quality-checked genuine components."
    },
    {
      icon: Clock,
      title: "Owner-Driven Support",
      description: "Direct assistance from owner Monti Shah. Honest diagnostics and post-sale technical support."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Block - Text */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Why Customers Trust Bluemoon Gallery
            </h2>
            <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
              We aren't just another retail store. For over two decades, we have provided transparency, quality, and exceptional customer service.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-slate-900">
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono"
                >
                  {siteData.statistics.approxDevicesSold}
                </motion.div>
                <div className="text-xs text-slate-500 mt-1">Devices Handled</div>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono"
                >
                  {siteData.statistics.approxDevicesRefurbished}
                </motion.div>
                <div className="text-xs text-slate-500 mt-1">Devices Refurbished</div>
              </div>
            </div>
          </div>

          {/* Right Block - Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;

              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { siteData } from "../../../content/site-data";
import { ClipboardList, ShieldAlert, Settings2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = [
  ClipboardList,
  ShieldAlert,
  Settings2,
  Sparkles,
];

export default function BuyRefurbishProcess() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How Our Buy-Back & Refurbishing Works
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A transparent, sustainable cycle that gives old devices a second life and helps you save money.
          </p>
        </div>

        {/* Stepper Timeline */}
        <div className="relative">
          {/* Vertical/Horizontal Connecting line */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-slate-800 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {siteData.buyRefurbishProcess.map((step, idx) => {
              const Icon = iconMap[idx] || CheckCircle2;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group"
                >
                  {/* Step Bubble */}
                  <div className="relative w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-white mb-6 group-hover:border-blue-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-600 border border-slate-950 flex items-center justify-center text-xs font-bold font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Info */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Ready to trade in or buy?</h4>
              <p className="text-sm text-slate-400">Bring your device to our Bilimora store today for a free on-the-spot valuation.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
                "Hello Bluemoon Gallery, I want to trade in my old device. What are the documents required?"
              )}`}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire Valuation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

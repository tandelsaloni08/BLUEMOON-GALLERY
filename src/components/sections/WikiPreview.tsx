"use client";

import React from "react";
import Link from "next/link";
import { siteData } from "../../../content/site-data";
import { BookOpen, Search, ArrowRight, Eye, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function WikiPreview() {
  // Show first 3 entries as a preview
  const previewEntries = siteData.wiki.slice(0, 3);

  return (
    <section id="wiki" className="py-20 lg:py-28 bg-slate-900/20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Content Block */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Our Free Phone & Laptop Spec \"Wikipedia\"
            </h2>
            
            <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
              Don't buy blindly. Consult our localized knowledge base of mobile, laptop, and tablet specifications. Compare battery capacities, processors, screen refreshes, and price ranges to find the right device.
            </p>

            <Link
              href="/wiki"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/10 hover:translate-x-1"
            >
              <span>Explore Complete Spec Wiki</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Table/Card Spec Preview */}
          <div className="lg:col-span-7">
            <div className="p-1 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
              <div className="p-4 bg-slate-950 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">Specs Database Preview</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search database..."
                    disabled
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-500 w-40 placeholder:text-slate-600 cursor-not-allowed"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Preview List */}
              <div className="divide-y divide-slate-800 bg-slate-900/50">
                {previewEntries.map((device, idx) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono border border-slate-700">
                          {device.category}
                        </span>
                        <span className="text-xs text-blue-400 font-semibold">{device.brand}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">{device.model}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-sm">
                        {device.specs.processor} • {device.specs.ramStorage} • {device.specs.display}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
                      <div className="text-sm font-bold text-amber-400 font-mono">{device.priceRange}</div>
                      <div className="flex items-center gap-1 text-[10px] text-green-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{device.status.replace("Available ", "")}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-slate-950/80 border-t border-slate-900 text-center">
                <p className="text-xs text-slate-500">
                  Showing 3 of {siteData.wiki.length} devices in catalog. Filters: Brand, Model, Category, Price Range.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

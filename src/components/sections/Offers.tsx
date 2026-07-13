"use client";

import React from "react";
import { siteData } from "../../../content/site-data";
import { Gift, Calendar, Sparkles, PhoneCall, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function Offers() {
  return (
    <section
      id="offers"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-900"
    >
      {/* Decorative festive overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 fill-amber-400/20" />
            <span>Seasonal Promotions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Active Festive Discounts & Deals
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            We offer regular exchange upgrades, school/college student benefits, and local holiday specials in Bilimora.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/20 hover:border-amber-500/40 transition-all hover:shadow-xl hover:shadow-amber-500/5 relative flex flex-col justify-between overflow-hidden group gold-glow"
            >
              {/* Highlight Tag */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Tag className="w-3 h-3" />
                <span>{offer.tag}</span>
              </div>

              <div>
                {/* Offer Icon */}
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono mb-2">
                  {offer.discount}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {offer.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              {/* Validity & CTA */}
              <div className="pt-6 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Validity: {offer.validity}</span>
                </div>

                <a
                  href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Bluemoon Gallery, I would like to check availability and claim the "${offer.title}" offer.`
                  )}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md shadow-amber-500/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Claim Offer Now</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regular Update Note */}
        <div className="text-center mt-12">
          <p className="text-xs sm:text-sm text-slate-500">
            *Offers are updated regularly based on seasonal availability. Call or visit the shop to check for today's active deals.
          </p>
        </div>
      </div>
    </section>
  );
}

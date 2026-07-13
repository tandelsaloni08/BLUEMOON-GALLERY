import React from "react";
import { siteData } from "../../../content/site-data";

export default function Brands() {
  return (
    <section className="py-12 bg-slate-950 border-y border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
          Premium Brands We Sell, Buy, & Refurbish
        </p>

        {/* Brands Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
          {siteData.brands.map((brand) => (
            <div
              key={brand}
              className="px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm sm:text-base hover:text-white hover:border-slate-700 hover:bg-slate-800/80 transition-all cursor-default select-none font-mono"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

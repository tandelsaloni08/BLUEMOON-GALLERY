"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import { siteData, WikiEntry } from "../../../content/site-data";
import { Search, SlidersHorizontal, BookOpen, ArrowLeft, ArrowUpRight, ShieldCheck, Cpu, HardDrive, Battery, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WikiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");

  const categories = ["All", "Mobile", "Laptop", "Tablet"];
  const brands = useMemo(() => {
    const uniqueBrands = new Set(siteData.wiki.map((item) => item.brand));
    return ["All", ...Array.from(uniqueBrands)];
  }, []);

  const filteredEntries = useMemo(() => {
    return siteData.wiki.filter((item) => {
      const matchesSearch =
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.processor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.ramStorage.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesBrand =
        selectedBrand === "All" || item.brand === selectedBrand;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrand]);

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen py-12 relative pb-28 sm:pb-32 lg:pb-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </Link>
          </div>

          {/* Page Title & Intro */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-semibold text-xs sm:text-sm mb-4">
                <BookOpen className="w-4 h-4" />
                <span>Bluemoon Free Spec Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                Phone & Laptop Specs Hub
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Compare specifications, verify release details, and check estimated price ranges for Apple, Realme, Oppo, Vivo, HP, Lenovo, and Dell systems.
              </p>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 mb-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search Bar */}
              <div className="relative md:col-span-6 lg:col-span-8">
                <input
                  type="text"
                  placeholder="Search model, brand, spec, or processor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-slate-700 transition-all text-sm sm:text-base"
                />
                <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>

              {/* Category Dropdown (Mobile) / Filter (Desktop) */}
              <div className="md:col-span-3 lg:col-span-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Dropdown */}
              <div className="md:col-span-3 lg:col-span-2">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="All">All Brands</option>
                  {brands.filter((b) => b !== "All").map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Badges Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mr-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Quick Filters:</span>
              </span>
              
              {/* Category buttons */}
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat === "All" ? "All Tech" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredEntries.map((device) => (
                <motion.div
                  key={device.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-mono border border-slate-700">
                        {device.category}
                      </span>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{device.brand}</span>
                    </div>

                    {/* Model & price */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{device.model}</h3>
                      <div className="text-lg font-bold text-amber-400 font-mono">{device.priceRange}</div>
                    </div>

                    {/* Specs breakdown */}
                    <div className="space-y-3 pt-4 border-t border-slate-800/80 mb-6 text-xs text-slate-300">
                      {/* Processor */}
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="line-clamp-1"><strong>CPU:</strong> {device.specs.processor}</span>
                      </div>
                      
                      {/* RAM/Storage */}
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="line-clamp-1"><strong>RAM/ROM:</strong> {device.specs.ramStorage}</span>
                      </div>

                      {/* Display */}
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="line-clamp-1"><strong>Display:</strong> {device.specs.display}</span>
                      </div>

                      {/* Battery */}
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="line-clamp-1"><strong>Battery:</strong> {device.specs.battery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Buy-back / Refurb status & enquire CTA */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{device.status.replace("Available ", "")}</span>
                    </div>

                    <a
                      href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Bluemoon Gallery, I am checking the specification wiki for "${device.brand} ${device.model}" and wanted to enquire about its price and stock availability.`
                      )}`}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-lg transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Check Stock</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-green-400" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty Results state */}
          {filteredEntries.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg mb-4">No matching devices found in specifications encyclopedia.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBrand("All");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-sm font-semibold rounded-xl"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <MobileContactBar />
    </>
  );
}

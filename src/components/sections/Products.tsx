"use client";

import React from "react";
import Link from "next/link";
import { siteData } from "../../../content/site-data";
import { Smartphone, Laptop, Tablet, MessageSquare, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<any>> = {
  Smartphone: Smartphone,
  Laptop: Laptop,
  Tablet: Tablet,
};

const getCategoryRoute = (id: string) => {
  if (id === "mobiles") return "/products/mobile";
  return `/products/${id}`;
};

export default function Products() {
  return (
    <section id="products" className="py-20 lg:py-28 bg-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Explore Our Product Categories
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            We offer competitive prices on both brand-new products and certified, locally backed refurbished electronics.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.productCategories.map((cat, idx) => {
            const IconComponent = iconMap[cat.iconName] || Smartphone;
            const route = getCategoryRoute(cat.id);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  <Link href={route} className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1 mb-4">
                    {/* Category Icon */}
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600/20 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Title & Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700">
                        {cat.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-4.5 h-4.5 text-slate-500 group-hover:text-blue-300 transition-colors" />
                    </h3>
                  </Link>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
                    {cat.description}
                  </p>
                </div>

                {/* Call-to-actions */}
                <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
                  <Link
                    href={route}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all text-center mb-1 shadow-md shadow-blue-600/10"
                  >
                    <span>Browse Online Store</span>
                  </Link>

                  <a
                    href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Bluemoon Gallery, I am interested in looking at your collection of ${cat.name}. Please share details.`
                    )}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white text-sm font-semibold rounded-xl transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 text-green-400" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

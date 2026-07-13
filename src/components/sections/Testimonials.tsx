"use client";

import React, { useRef, useState, useEffect } from "react";
import { siteData } from "../../../content/site-data";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const index = Math.round(scrollLeft / clientWidth);
        setActiveSlide(index);
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-900/40 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              What Our Customers Say
            </h2>
            <p className="text-base sm:text-lg text-slate-400">
              Read authentic feedback from local customers in Bilimora, Gandevi, and Chikhli.
            </p>
          </div>
          
          {/* Slider Controls (Mobile only, hidden on desktop grid) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Grid Layout (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {siteData.testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-500/10 pointer-events-none" />
              
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed mb-6">
                  \"{t.text}\"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-900 pt-4 text-xs mt-auto">
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-slate-500">{t.location}</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-600/10 border border-blue-500/20 text-blue-400 font-semibold font-mono">
                  {t.serviceUsed}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Carousel (Visible on Mobile) */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {siteData.testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full shrink-0 snap-start snap-always p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                    \"{t.text}\"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 pt-4 text-xs mt-auto">
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-slate-500">{t.location}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-600/10 border border-blue-500/20 text-blue-400 font-semibold font-mono text-[10px]">
                    {t.serviceUsed}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {siteData.testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const clientWidth = scrollRef.current.clientWidth;
                    scrollRef.current.scrollTo({ left: idx * clientWidth, behavior: "smooth" });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeSlide === idx ? "bg-blue-500" : "bg-slate-800"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

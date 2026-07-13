"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { siteData } from "../../../content/site-data";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-6">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-400">
            Have questions about warranties, buy-back prices, or specifications? Check out our quick guide.
          </p>
        </div>

        {/* Radix Accordion */}
        <Accordion.Root type="single" collapsible className="w-full space-y-4">
          {siteData.faqs.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 transition-colors duration-300 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between p-5 text-left font-semibold text-white hover:bg-slate-800/30 transition-all group outline-none">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0 ml-4" />
                </Accordion.Trigger>
              </Accordion.Header>
              
              <Accordion.Content className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden text-sm sm:text-base text-slate-400 bg-slate-950/20">
                <div className="p-5 pt-2 leading-relaxed border-t border-slate-800/40">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { siteData } from "../../../content/site-data";

export default function MobileContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 lg:hidden p-3 shadow-2xl pb-[calc(12px+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {/* Call Target */}
        <a
          href={`tel:${siteData.business.contactNumber}`}
          className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Call Bluemoon Gallery"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Target */}
        <a
          href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
            siteData.business.whatsappPrefilledMessage
          )}`}
          className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-green-600 active:bg-green-700 text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire on WhatsApp"
        >
          <MessageCircle className="w-4.5 h-4.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

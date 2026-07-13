"use client";

import React from "react";
import { siteData } from "../../../content/site-data";
import { MapPin, Phone, MessageSquare, Clock, User } from "lucide-react";

export default function LocationContact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-900/20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Visit Us or Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Conveniently located in Bilimora, Gujarat. Drop by our store for instant valuation or send an enquiry now.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block - Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Shop Information
              </h3>

              {/* Owner */}
              <div className="flex items-start gap-4 text-sm sm:text-base text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Owner</div>
                  <div className="font-semibold text-white">{siteData.business.owner}</div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 text-sm sm:text-base text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Address</div>
                  <p className="leading-relaxed">{siteData.business.addressFull}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 text-sm sm:text-base text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Hours</div>
                  <p className="leading-relaxed">{siteData.business.hours}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 text-sm sm:text-base text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Call for Enquiries</div>
                  <a
                    href={`tel:${siteData.business.contactNumber}`}
                    className="font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    {siteData.business.contactNumber}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 text-sm sm:text-base text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">WhatsApp Message</div>
                  <a
                    href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
                      siteData.business.whatsappPrefilledMessage
                    )}`}
                    className="font-bold text-white hover:text-green-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send Direct Message
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-8 text-xs text-slate-500">
              *Come visit us to view pre-owned mobile models, exchange older units or get on-the-spot cash valuations.
            </div>
          </div>

          {/* Right Block - Interactive Google Map container */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden min-h-[300px] sm:min-h-[400px] relative">
            <iframe
              src={siteData.business.googleMapsEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bluemoon Gallery Store Location Map"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { siteData } from "../../../content/site-data";
import { Moon, Phone, MessageSquare, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <Link href="#home" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/30">
                <Moon className="w-4.5 h-4.5 text-blue-400 fill-blue-400/20" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Bluemoon <span className="text-blue-400">Gallery</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Bilimora's premier electronics retail shop since 2005. Selling, buying, and refurbishing top quality mobiles, laptops, and tablets.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href={siteData.business.socialLinks.facebook}
                className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Facebook Page"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href={siteData.business.socialLinks.instagram}
                className="p-2 rounded-lg bg-slate-900 hover:bg-pink-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Instagram Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Refurbish Process
                </a>
              </li>
              <li>
                <a href="#wiki" className="hover:text-white transition-colors">
                  Phone/Laptop Wiki
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">
                  Festive Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">Contact Info</h3>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <span>{siteData.business.addressFull}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={`tel:${siteData.business.contactNumber}`} className="hover:text-white transition-colors">
                {siteData.business.contactNumber}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <MessageSquare className="w-4 h-4 text-green-400 shrink-0" />
              <a
                href={`https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
                  siteData.business.whatsappPrefilledMessage
                )}`}
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Shop Hours</h3>
            <p className="text-sm leading-relaxed mb-2">
              {siteData.business.hours}
            </p>
            <p className="text-xs text-slate-500">
              *Hours may vary during public and local holidays. Feel free to enquire on WhatsApp.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} {siteData.business.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Owner: <strong className="text-slate-300">{siteData.business.owner}</strong></span>
            <span>•</span>
            <span>Bilimora, Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

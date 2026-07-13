"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteData } from "../../../content/site-data";
import { Menu, X, Phone, Moon, ShoppingCart, User, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/#products" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Wiki", href: "/wiki" },
  { label: "Offers", href: "/#offers" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Lockup */}
          <Link
            href="/#home"
            className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/30 group-hover:bg-blue-600/20 transition-colors">
              <Moon className="w-5 h-5 text-blue-400 fill-blue-400/20 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
              Bluemoon <span className="text-blue-400">Gallery</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-md hover:bg-slate-800/50 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Button, Cart Icon & Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2.5 text-slate-300 hover:text-white rounded-xl bg-slate-900/60 border border-slate-800/60 hover:bg-slate-800 transition-all"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center border border-slate-950">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Admin link */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/20 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Admin Dash</span>
              </Link>
            )}

            {/* Signout Button if user is logged in */}
            {user ? (
              <button
                onClick={logout}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
            )}

            <a
              href={`tel:${siteData.business.contactNumber}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all hover:scale-102 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {siteData.business.contactNumber}</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-slate-950/98 border-l border-slate-800 p-6 flex flex-col h-full lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-white text-lg flex items-center gap-2">
                  <Moon className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                  Bluemoon Gallery
                </span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-3 flex-1 overflow-y-auto pr-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="px-4 py-3 text-base font-bold text-amber-300 rounded-lg bg-amber-500/10 border border-amber-500/20"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-slate-800 mt-auto flex flex-col gap-3">
                {user && (
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="py-3 text-center text-sm font-semibold text-red-400 hover:text-red-300"
                  >
                    Sign Out ({user.name})
                  </button>
                )}

                <a
                  href={`tel:${siteData.business.contactNumber}`}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {siteData.business.contactNumber}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

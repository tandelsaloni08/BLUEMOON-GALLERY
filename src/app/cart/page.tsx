"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Plus, Minus, Tag, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const {
    cartItems,
    subtotal,
    total,
    couponDiscount,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponCode.trim()) return;

    const success = applyCoupon(couponCode);
    if (success) {
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code. Try 'DIWALI2026' or 'MEGA20'");
    }
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen py-12 relative pb-28 sm:pb-32 lg:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-6">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                Add premium mobile phones, tablets, or laptops to your cart to see them here.
              </p>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Item list - Col Span 7 */}
              <div className="lg:col-span-7 space-y-4">
                {cartItems.map((item) => {
                  const discountTotal = item.discountPrice * item.quantity;
                  const originalTotal = item.price * item.quantity;
                  const hasDiscount = item.price > item.discountPrice;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-4 sm:gap-6 items-start"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-850 shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Details block */}
                      <div className="flex-1 flex flex-col justify-between min-h-[80px] sm:min-h-[96px]">
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <span className="px-2 py-0.5 rounded bg-slate-850 text-slate-400 text-[9px] font-mono border border-slate-800 uppercase">
                              {item.condition}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-500 hover:text-red-400 p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-white leading-tight mb-1">
                            {item.name}
                          </h3>
                          
                          <div className="text-xs text-slate-500 font-mono">
                            {item.ram && item.storage ? `${item.ram} / ${item.storage}` : ""}
                          </div>
                        </div>

                        {/* Qty and price line */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                          {/* Qty Selector */}
                          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Item Price */}
                          <div className="text-right">
                            <div className="text-base font-extrabold text-white font-mono">
                              ₹{discountTotal.toLocaleString("en-IN")}
                            </div>
                            {hasDiscount && (
                              <div className="text-xs text-slate-500 line-through font-mono">
                                ₹{originalTotal.toLocaleString("en-IN")}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Continue Shopping button */}
                <div className="pt-2">
                  <Link
                    href="/#products"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Right Order Summary - Col Span 5 */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                    Order Summary
                  </h2>

                  {/* Pricing elements */}
                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                      <span className="font-mono text-white font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-400 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-4 h-4 shrink-0" />
                          <span>Coupon Discount ({appliedCoupon})</span>
                        </span>
                        <span className="font-mono">
                          - ₹{(subtotal * couponDiscount).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400">
                      <span>Shipping Delivery</span>
                      <span className="text-green-400 font-bold uppercase text-xs">Free Delivery</span>
                    </div>

                    <div className="border-t border-slate-800/80 pt-4 flex justify-between text-base font-extrabold text-white">
                      <span>Total Price</span>
                      <span className="font-mono text-amber-400">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Coupon Application input */}
                  <div className="pt-2 border-t border-slate-800/85">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="text-xs text-green-400">
                          <strong>{appliedCoupon}</strong> Applied successfully! ({(couponDiscount * 100)}% OFF)
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-xs font-bold text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Coupon (e.g. DIWALI2026)"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all border border-slate-750"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <div className="text-xs text-red-400 font-semibold">{couponError}</div>
                        )}
                      </form>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <div className="pt-2">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-600/10"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4.5 h-4.5" />
                    </Link>
                  </div>
                </div>

                {/* Trust Signups */}
                <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-500/10 flex gap-3 text-xs text-slate-400">
                  <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-300 block mb-0.5">Shop-Backed Local Guarantee</strong>
                    Each refurbished model is quality certified. Free exchanges and easy warranty returns are supported in Bilimora.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <MobileContactBar />
    </>
  );
}

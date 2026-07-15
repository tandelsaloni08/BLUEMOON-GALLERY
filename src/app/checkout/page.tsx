"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CreditCard, Send, Lock, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const checkoutSchema = z.object({
  customerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Enter a valid 10-digit phone number." }).max(12),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(10, { message: "Please specify complete street details." }),
  city: z.string().min(2, { message: "City must be specified." }),
  state: z.string().min(2, { message: "State must be specified." }),
  pincode: z.string().min(6, { message: "Enter a valid 6-digit Pincode." }).max(6),
  paymentMethod: z.enum(["COD", "UPI", "Card"], {
    message: "Please select a payment option.",
  }),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, total, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      address: "",
      city: "Bilimora",
      state: "Gujarat",
      pincode: "396321",
      paymentMethod: "COD",
    },
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  const onSubmit = async (data: CheckoutData) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        ...data,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.discountPrice,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Order placement failed.");
      }

      const completedOrder = await res.json();

      // Clear the local cart
      clearCart();

      // Save order metadata to session storage for the success screen
      sessionStorage.setItem("last_order", JSON.stringify(completedOrder));
      
      // Redirect
      router.push(`/order-success?orderId=${completedOrder.orderId}`);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to process order. Check server/Mock DB logs.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-400">
        Redirecting...
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen py-12 relative pb-28 sm:pb-32 lg:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-6">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cart</span>
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
            Complete Your Purchase
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Section - Col Span 7 */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3">
                  Delivery Details
                </h2>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Customer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Monti Shah"
                      {...register("customerName")}
                      className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder:text-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                        errors.customerName ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                      }`}
                    />
                    {errors.customerName && (
                      <span className="text-[11px] text-red-400 font-semibold">{errors.customerName.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9023089521"
                      {...register("phone")}
                      className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder:text-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                        errors.phone ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-400 font-semibold">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                {/* Email address */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. customer@gmail.com"
                    {...register("email")}
                    className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder:text-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                      errors.email ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-400 font-semibold">{errors.email.message}</span>
                  )}
                </div>

                {/* Street address */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Delivery Address</label>
                  <textarea
                    rows={3}
                    placeholder="Shop, Building Name, Street details..."
                    {...register("address")}
                    className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder:text-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none ${
                      errors.address ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-red-400 font-semibold">{errors.address.message}</span>
                  )}
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">City</label>
                    <input
                      type="text"
                      {...register("city")}
                      className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                        errors.city ? "border-red-500/50" : "border-slate-800"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">State</label>
                    <input
                      type="text"
                      {...register("state")}
                      className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                        errors.state ? "border-red-500/50" : "border-slate-800"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Pincode</label>
                    <input
                      type="text"
                      placeholder="e.g. 396321"
                      {...register("pincode")}
                      className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder:text-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                        errors.pincode ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                      }`}
                    />
                    {errors.pincode && (
                      <span className="text-[11px] text-red-400 font-semibold">{errors.pincode.message}</span>
                    )}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Payment Method</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "COD", label: "Cash on Delivery" },
                      { value: "UPI", label: "UPI / QR Code" },
                      { value: "Card", label: "Debit/Credit Card" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer select-none hover:border-slate-700 transition-all"
                      >
                        <input
                          type="radio"
                          value={opt.value}
                          {...register("paymentMethod")}
                          className="text-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-white">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-semibold">
                    {submitError}
                  </div>
                )}

                {/* Submit Trigger */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2.5 w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-600/10"
                  >
                    <Send className="w-4.5 h-4.5" />
                    <span>{submitting ? "Processing Order..." : "Confirm & Place Order"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Summary Sidebar - Col Span 5 */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>Items in Order</span>
                <span className="text-xs text-slate-500 font-mono">({cartItems.length} categories)</span>
              </h2>

              {/* Minimized cart list */}
              <div className="divide-y divide-slate-850/60 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                        <p className="text-slate-500 text-[10px]">
                          Qty: <strong>{item.quantity}</strong> • {item.condition}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-slate-300 font-bold shrink-0">
                      ₹{(item.discountPrice * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Billing totals */}
              <div className="border-t border-slate-800/80 pt-4 space-y-2.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-green-400 font-bold uppercase text-[10px]">Free Shipping</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white border-t border-slate-850 pt-3">
                  <span>Grand Total</span>
                  <span className="font-mono text-amber-400">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Secure lock info */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2.5 text-[11px] text-slate-500">
                <Lock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>SSL Encrypted Transaction Security verified.</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <MobileContactBar />
    </>
  );
}

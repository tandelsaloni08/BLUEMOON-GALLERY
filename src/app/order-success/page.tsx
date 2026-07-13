"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import { CheckCircle2, ShoppingBag, MapPin, Phone, CreditCard, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams ? searchParams.get("orderId") : "";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Hydrate order details from sessionStorage if matches current orderId
    const cachedOrder = sessionStorage.getItem("last_order");
    if (cachedOrder) {
      try {
        const parsed = JSON.parse(cachedOrder);
        if (parsed.orderId === orderId) {
          setOrder(parsed);
        }
      } catch (e) {
        console.error("Failed to parse cached order", e);
      }
    }
  }, [orderId]);

  return (
    <>
      <Header />

      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen py-12 relative flex items-center justify-center pb-28 sm:pb-32 lg:pb-16">
        <div className="max-w-2xl w-full px-4 sm:px-6 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8 text-center"
          >
            {/* Checked Icon bubble */}
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto mb-2">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Success title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Order Confirmed!</h1>
              <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                Thank you for shopping with Bluemoon Gallery. Your order has been registered in our database.
              </p>
            </div>

            {/* Order Details box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 text-left space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <span className="text-slate-500 font-medium">Order ID</span>
                <span className="font-mono text-blue-400 font-bold tracking-wider">{orderId || "BMG-UNKNOWN"}</span>
              </div>

              {order && (
                <>
                  {/* Customer details */}
                  <div className="flex items-start justify-between gap-4 border-b border-slate-850 pb-3">
                    <span className="text-slate-500 font-medium shrink-0">Deliver To</span>
                    <div className="text-right text-slate-300">
                      <div className="font-bold text-white">{order.customerName}</div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 justify-end">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{order.address}</span>
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                    <span className="text-slate-500 font-medium">Phone</span>
                    <span className="text-slate-300 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{order.phone}</span>
                    </span>
                  </div>

                  {/* Payment option */}
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                    <span className="text-slate-500 font-medium">Payment Option</span>
                    <span className="text-slate-300 flex items-center gap-1 capitalize">
                      <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                      <span>{order.paymentMethod}</span>
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                    <span className="text-slate-500 font-medium">Estimated Delivery</span>
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>In 2–4 Business Days</span>
                    </span>
                  </div>

                  {/* Grand total */}
                  <div className="flex items-center justify-between pt-1 text-sm sm:text-base font-extrabold text-white">
                    <span>Total Amount</span>
                    <span className="font-mono text-amber-400 font-extrabold">₹{order.total.toLocaleString("en-IN")}</span>
                  </div>
                </>
              )}
            </div>

            {/* Back action triggers */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                href="/#products"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/10"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>Continue Shopping</span>
              </Link>
              
              <Link
                href="/"
                className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all text-center"
              >
                Go back Home
              </Link>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
      <MobileContactBar />
    </>
  );
}

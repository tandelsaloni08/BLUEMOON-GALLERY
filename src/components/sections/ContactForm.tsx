"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { siteData } from "../../../content/site-data";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid 10-digit phone number." })
    .max(12, { message: "Please enter a valid phone number." }),
  interest: z.enum(
    ["buy-new", "sell-old", "laptop", "tablet", "general"],
    { message: "Please select a category of interest." }
  ),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const interestLabels: Record<string, string> = {
  "buy-new": "Buy New Phone",
  "sell-old": "Sell My Phone",
  laptop: "Buy/Sell Laptop",
  tablet: "Buy/Sell Tablet",
  general: "General Enquiry",
};

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      interest: "general",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API Call / Validation delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Log to console for future CRM/Backend wiring
    console.log("Enquiry Form Submitted:", data);
    
    // TODO: Wire up real backend integration here (e.g. Formspree, Resend, or API route)
    // Example: fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(data) })
    
    setSubmittedData(data);
    setIsSuccess(true);
    reset();
  };

  const handleWhatsAppRedirect = () => {
    if (!submittedData) return;

    const formattedMessage = `Hello Bluemoon Gallery,
I have sent an enquiry from your website:
*Name:* ${submittedData.name}
*Phone:* ${submittedData.phone}
*Interested In:* ${interestLabels[submittedData.interest]}
*Message:* ${submittedData.message}`;

    const waUrl = `https://wa.me/${siteData.business.whatsappNumber}?text=${encodeURIComponent(
      formattedMessage
    )}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Send an Enquiry / Request Quote
          </h2>
          <p className="text-base text-slate-400">
            Fill in your requirements below. We will review them and get back to you, or you can send them directly on WhatsApp.
          </p>
        </div>

        {/* Form Box */}
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Row: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-300">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Rajesh Patel"
                      {...register("name")}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.name ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-400 font-semibold">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-300">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      {...register("phone")}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.phone ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-xs text-red-400 font-semibold">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                {/* Interest Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="interest" className="text-sm font-semibold text-slate-300">
                    What are you interested in?
                  </label>
                  <select
                    id="interest"
                    {...register("interest")}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="buy-new">Buy New Flagship/Smartphones</option>
                    <option value="sell-old">Sell/Exchange My Old Phone</option>
                    <option value="laptop">Buy/Sell Laptops (Dell, HP, Lenovo)</option>
                    <option value="tablet">Buy/Sell Tablets & iPads</option>
                    <option value="general">General Store Enquiry</option>
                  </select>
                  {errors.interest && (
                    <span className="text-xs text-red-400 font-semibold">{errors.interest.message}</span>
                  )}
                </div>

                {/* Message Box */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-300">
                    Your Requirements / Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe what specs, models, or brands you are looking to buy or sell..."
                    {...register("message")}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                      errors.message ? "border-red-500/50" : "border-slate-800 hover:border-slate-700"
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400 font-semibold">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-6 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Enquiry Received!</h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
                  Thank you for reaching out. We have logged your request. For the fastest response, send these details directly to us on WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all shadow-md shadow-green-600/10"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                    <span>Send on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold text-sm transition-all border border-slate-800"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

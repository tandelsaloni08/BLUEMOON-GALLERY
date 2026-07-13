# Bluemoon Gallery Landing Page

A production-grade, SEO-optimized, and fully responsive marketing landing page for **Bluemoon Gallery** – a mobile, laptop, and tablet retail shop based in Bilimora, Gujarat, India.

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## Technical Stack & Features

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Custom color scheme: deep slate/midnight primary, silver/moonlight secondary, gold/amber accent)
- **Components:** Radix UI primitives (`@radix-ui/react-accordion` for accessible FAQs)
- **Animations:** Framer Motion (scroll reveals, micro-interactions, mobile drawer transitions)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod (client-side validation with WhatsApp redirect compilation)
- **SEO & Performance:** Full Metadata API integration, schema.org JSON-LD structured data for regional search indexing (`LocalBusiness`/`ElectronicsStore`), dynamic `sitemap.xml`, and crawler-friendly `robots.txt`

---

## File Structure

```text
bluemoon-gallery/
├── app/
│   ├── layout.tsx         # Global layout with SEO settings & JSON-LD schema
│   ├── page.tsx           # Composite landing page mounting all sections
│   ├── wiki/page.tsx      # Filterable & searchable specs catalog page
│   ├── sitemap.ts         # Dynamically generated sitemap.xml
│   ├── robots.ts          # Search engine crawler policies
│   └── globals.css        # Global CSS, Tailwind import, & glassmorphism utilities
├── components/
│   ├── layout/            # Layout modules (Header, Footer, Mobile bottom bar)
│   └── sections/          # Content sections (Hero, Brands, Products, Offers, Form, etc.)
├── content/
│   └── site-data.ts       # Central source of truth for all copy & specs database
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production

```bash
npm run build
npm start
```

---

## How to Edit Site Copy & Data

All editable business details, products, specifications catalog, testimonials, and active offers are centralized in:
👉 **[content/site-data.ts](file:///c:/Users/Dell/OneDrive/Desktop/internship/content/site-data.ts)**

Editing this file will immediately update the content across the main page and the specs wiki page without needing to touch layout or component code.

---

## Pre-Launch TODO Checklist

Before deploying this website live for the client, verify and replace the placeholder items marked with `// TODO:` comment tags in the codebase:

- [ ] **Exact Address:** Confirm the physical shop address in `siteData.business.addressFull` inside `site-data.ts`.
- [ ] **Google Maps Pin:** Replace the Google Maps iframe URL in `siteData.business.googleMapsEmbedUrl` inside `site-data.ts` with the exact pinned coordinates of the physical shop.
- [ ] **Business Hours:** Validate and update the retail hours in `siteData.business.hours` inside `site-data.ts`.
- [ ] **Social Media Links:** Swap the placeholder `#` hrefs in `siteData.business.socialLinks` with actual Facebook and Instagram page links.
- [ ] **Real Testimonials:** Replace the placeholder Indian reviews with real customer testimonials.
- [ ] **Real Offers:** Update the seasonal deals (like the Diwali discount card) to reflect current promotions.
- [ ] **Contact Form Endpoint:** Wire up the submit logic in `ContactForm.tsx` to a real email service, database, or API handler (e.g. Resend, Formspree).
- [ ] **Google Analytics Tracking ID:** Set the `NEXT_PUBLIC_GA_ID` environment variable in your production host (e.g. Vercel dashboard) to inject your Google Analytics tag automatically.

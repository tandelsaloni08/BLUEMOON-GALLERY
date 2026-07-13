export interface WikiEntry {
  id: string;
  brand: string;
  model: string;
  category: 'Mobile' | 'Laptop' | 'Tablet';
  specs: {
    display: string;
    processor: string;
    ramStorage: string;
    battery: string;
    camera?: string; // Optional for laptops
    os: string;
  };
  priceRange: string;
  popularity: 'High' | 'Medium' | 'Low';
  status: 'Available New & Refurbished' | 'Available Refurbished Only' | 'Available New Only';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface OfferItem {
  id: string;
  title: string;
  discount: string;
  validity: string;
  description: string;
  tag: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  serviceUsed: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteData {
  business: {
    name: string;
    owner: string;
    locationShort: string;
    addressFull: string; // TODO: Replace with exact shop address
    establishedYear: number;
    dailyCustomers: string;
    contactNumber: string;
    whatsappNumber: string;
    whatsappPrefilledMessage: string;
    hours: string; // TODO: Confirm exact business hours
    googleMapsEmbedUrl: string; // TODO: Replace with exact pinned coordinates link if available
    socialLinks: {
      facebook: string;
      instagram: string;
    };
  };
  statistics: {
    yearsInBusiness: number;
    dailyRecurringCustomers: number;
    approxDevicesSold: string;
    approxDevicesRefurbished: string;
  };
  brands: string[];
  productCategories: {
    id: string;
    name: string;
    description: string;
    iconName: string;
    badge: string;
  }[];
  services: ServiceItem[];
  buyRefurbishProcess: StepItem[];
  wiki: WikiEntry[];
  offers: OfferItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
}

export const siteData: SiteData = {
  business: {
    name: "Bluemoon Gallery",
    owner: "Monti Shah",
    locationShort: "Bilimora, Gujarat",
    // TODO: Replace with exact street address
    addressFull: "Bluemoon Gallery, Near Railway Station Road, Opposite Town Hall, Bilimora, Gujarat 396321, India",
    establishedYear: 2005,
    dailyCustomers: "45+",
    contactNumber: "+919023089521",
    whatsappNumber: "919023089521",
    whatsappPrefilledMessage: "Hello Bluemoon Gallery, I am visiting your website and would like to enquire about your products/services.",
    // TODO: Confirm exact shop hours
    hours: "Monday – Saturday: 10:00 AM – 8:30 PM (Sunday Closed)",
    // TODO: Replace with exact coordinate maps embed once shop exact location is obtained
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14930.932856262955!2d72.95543167191197!3d20.680459529949605!2m3!1f0!2f0!3f0!3m2!1i1024!2i725!4f13.1!3m3!1m2!1s0x3be0ee307d853e5d%3A0xe21f4228965cc50b!2sBilimora%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    socialLinks: {
      facebook: "#", // TODO: Replace with real Facebook page link
      instagram: "#" // TODO: Replace with real Instagram page link
    }
  },
  statistics: {
    yearsInBusiness: 21, // since 2005 (in 2026)
    dailyRecurringCustomers: 45,
    approxDevicesSold: "25,000+",
    approxDevicesRefurbished: "8,500+"
  },
  brands: ["Apple", "Realme", "Oppo", "Vivo", "Samsung", "Xiaomi", "OnePlus", "HP", "Lenovo", "Dell"],
  productCategories: [
    {
      id: "mobiles",
      name: "Mobile Phones",
      description: "Premium selection of brand new flagship phones and quality-inspected refurbished iPhones, Realme, Oppo, Vivo, and Samsung devices.",
      iconName: "Smartphone",
      badge: "New & Refurbished Available"
    },
    {
      id: "laptops",
      name: "Laptops",
      description: "Performant business, student, and gaming laptops from Dell, HP, Lenovo, and Apple. Fully optimized for high productivity and speed.",
      iconName: "Laptop",
      badge: "High Performance Guaranteed"
    },
    {
      id: "tablets",
      name: "Tablets",
      description: "Versatile iPads and Android tablets for sketching, online classes, and entertainment. Complete with warranty and check certificates.",
      iconName: "Tablet",
      badge: "Affordable Tech Deals"
    }
  ],
  services: [
    {
      id: "sell",
      title: "Latest Device Sales",
      description: "Get the newest mobile phones, laptops, and tablets from top brands with official warranties and full support.",
      iconName: "ShoppingBag"
    },
    {
      id: "buyback",
      title: "Instant Buy-Back",
      description: "Sell your old, used phones directly to us. Walk out with cash or instant store credit for your next upgrade.",
      iconName: "RefreshCw"
    },
    {
      id: "refurbish",
      title: "Certified Refurbishment",
      description: "We professionally inspect, repair, and certify pre-owned devices, passing down massive savings to you safely.",
      iconName: "ShieldCheck"
    },
    {
      id: "discounts",
      title: "Festive Discounts",
      description: "Enjoy special promotional offers, exchange bonuses, and seasonal discounts during Diwali, Eid, New Year, and more.",
      iconName: "Percent"
    },
    {
      id: "wiki",
      title: "Phone & Laptop Spec Wiki",
      description: "Consult our extensive, browsable database of tech specifications and comparisons to choose the perfect model.",
      iconName: "BookOpen"
    }
  ],
  buyRefurbishProcess: [
    {
      number: 1,
      title: "Device Evaluation",
      description: "Bring in your old phone, tablet, or laptop. We conduct a fast, transparent 20-point diagnostic check on-the-spot."
    },
    {
      number: 2,
      title: "Fair Valuation Offer",
      description: "We offer you competitive market pricing based on the device's diagnostic score. Get paid in cash or credit immediately."
    },
    {
      number: 3,
      title: "Expert Refurbishing",
      description: "Our technicians replace worn components (like batteries or screens) with genuine parts and perform full system checks."
    },
    {
      number: 4,
      title: "Eco-Friendly Resale",
      description: "The refurbished device is backed by our local warranty and sold at a budget-friendly price point, reducing electronic waste."
    }
  ],
  wiki: [
    {
      id: "iphone-15",
      brand: "Apple",
      model: "iPhone 15",
      category: "Mobile",
      specs: {
        display: "6.1\" Super Retina XDR OLED, 120hz (Pro)",
        processor: "A16 Bionic / A17 Pro",
        ramStorage: "128GB / 256GB / 512GB",
        battery: "3349 mAh (typical), 15W MagSafe",
        camera: "48MP Main + 12MP Ultra-wide, 12MP TrueDepth front",
        os: "iOS 17 (upgradable to iOS 18)"
      },
      priceRange: "₹65,000 - ₹79,900",
      popularity: "High",
      status: "Available New & Refurbished"
    },
    {
      id: "iphone-13-refurb",
      brand: "Apple",
      model: "iPhone 13 (Refurbished)",
      category: "Mobile",
      specs: {
        display: "6.1\" Super Retina XDR OLED",
        processor: "A15 Bionic",
        ramStorage: "4GB RAM, 128GB / 256GB Storage",
        battery: "3240 mAh, 20W fast charging",
        camera: "Dual 12MP Main + 12MP Ultra-wide, 12MP Front",
        os: "iOS 15 (upgradable)"
      },
      priceRange: "₹34,500 - ₹39,900",
      popularity: "High",
      status: "Available Refurbished Only"
    },
    {
      id: "realme-gt-5",
      brand: "Realme",
      model: "GT 5 Neo",
      category: "Mobile",
      specs: {
        display: "6.74\" AMOLED, 144Hz Refresh Rate",
        processor: "Snapdragon 8+ Gen 1",
        ramStorage: "8GB/12GB RAM, 256GB Storage",
        battery: "5000 mAh, 150W SuperVOOC Charge",
        camera: "50MP Main (OIS) + 8MP + 2MP, 16MP Front",
        os: "Android 13 (Realme UI 4.0)"
      },
      priceRange: "₹29,999 - ₹34,999",
      popularity: "Medium",
      status: "Available New & Refurbished"
    },
    {
      id: "realme-12-pro",
      brand: "Realme",
      model: "Realme 12 Pro+ 5G",
      category: "Mobile",
      specs: {
        display: "6.7\" Curved OLED, 120Hz",
        processor: "Snapdragon 7s Gen 2",
        ramStorage: "8GB/12GB RAM, 128/256GB Storage",
        battery: "5000 mAh, 67W SuperVOOC Charge",
        camera: "50MP + 64MP Periscope Portrait + 8MP",
        os: "Android 14 (Realme UI 5.0)"
      },
      priceRange: "₹28,500 - ₹32,000",
      popularity: "High",
      status: "Available New & Refurbished"
    },
    {
      id: "oppo-reno-11",
      brand: "Oppo",
      model: "Reno 11 Pro 5G",
      category: "Mobile",
      specs: {
        display: "6.7\" 3D Curved AMOLED, 120Hz",
        processor: "MediaTek Dimensity 8200",
        ramStorage: "12GB RAM, 256GB Storage",
        battery: "4600 mAh, 80W SuperVOOC",
        camera: "50MP Main (OIS) + 32MP Telephoto + 8MP",
        os: "Android 14 (ColorOS 14)"
      },
      priceRange: "₹36,000 - ₹39,999",
      popularity: "High",
      status: "Available New & Refurbished"
    },
    {
      id: "oppo-a79",
      brand: "Oppo",
      model: "Oppo A79 5G",
      category: "Mobile",
      specs: {
        display: "6.72\" FHD+ Sunlight Display, 90Hz",
        processor: "MediaTek Dimensity 6020",
        ramStorage: "8GB RAM, 128GB Storage",
        battery: "5000 mAh, 33W SUPERVOOC",
        camera: "50MP AI Dual Camera + 2MP Depth, 8MP Front",
        os: "Android 13 (ColorOS 13.1)"
      },
      priceRange: "₹17,999 - ₹19,999",
      popularity: "Medium",
      status: "Available New & Refurbished"
    },
    {
      id: "vivo-v30",
      brand: "Vivo",
      model: "V30 Pro 5G",
      category: "Mobile",
      specs: {
        display: "6.78\" 3D Curved AMOLED, 120Hz",
        processor: "MediaTek Dimensity 8200",
        ramStorage: "8GB/12GB RAM, 256GB/512GB Storage",
        battery: "5000 mAh, 80W FlashCharge",
        camera: "50MP ZEISS Professional Portrait + 50MP Wide + 50MP Selfie",
        os: "Android 14 (Funtouch OS 14)"
      },
      priceRange: "₹38,000 - ₹44,999",
      popularity: "High",
      status: "Available New & Refurbished"
    },
    {
      id: "vivo-y200",
      brand: "Vivo",
      model: "Vivo Y200e 5G",
      category: "Mobile",
      specs: {
        display: "6.67\" AMOLED, 120Hz Refresh Rate",
        processor: "Snapdragon 4 Gen 2",
        ramStorage: "6GB/8GB RAM, 128GB Storage",
        battery: "5000 mAh, 44W FlashCharge",
        camera: "50MP Portrait Camera + 2MP Flicker Camera",
        os: "Android 14 (Funtouch OS 14)"
      },
      priceRange: "₹18,500 - ₹20,500",
      popularity: "Medium",
      status: "Available New & Refurbished"
    },
    {
      id: "ipad-air-5",
      brand: "Apple",
      model: "iPad Air 5th Gen (M1)",
      category: "Tablet",
      specs: {
        display: "10.9\" Liquid Retina display with True Tone",
        processor: "Apple M1 Chip",
        ramStorage: "8GB RAM, 64GB / 256GB Storage",
        battery: "28.6 Wh, up to 10 hours web surfing",
        camera: "12MP Wide back, 12MP Ultra-wide front (Center Stage)",
        os: "iPadOS 15 (upgradable to iPadOS 18)"
      },
      priceRange: "₹48,999 - ₹61,900",
      popularity: "High",
      status: "Available New & Refurbished"
    },
    {
      id: "samsung-s9-fe",
      brand: "Samsung",
      model: "Galaxy Tab S9 FE",
      category: "Tablet",
      specs: {
        display: "10.9\" IPS LCD, 90Hz Refresh Rate",
        processor: "Exynos 1380",
        ramStorage: "6GB/8GB RAM, 128GB/256GB Storage",
        battery: "8000 mAh, 45W fast charging",
        camera: "8MP Back, 12MP Ultra-wide Front",
        os: "Android 13 (One UI 5.1)"
      },
      priceRange: "₹32,999 - ₹38,999",
      popularity: "Medium",
      status: "Available New & Refurbished"
    },
    {
      id: "ipad-9-refurb",
      brand: "Apple",
      model: "iPad 9th Gen (Refurbished)",
      category: "Tablet",
      specs: {
        display: "10.2\" Retina display with True Tone",
        processor: "A13 Bionic",
        ramStorage: "3GB RAM, 64GB Storage",
        battery: "32.4 Wh battery, up to 10 hours",
        camera: "8MP Back camera, 12MP FaceTime HD front camera",
        os: "iPadOS 15 (upgradable)"
      },
      priceRange: "₹18,500 - ₹21,500",
      popularity: "High",
      status: "Available Refurbished Only"
    },
    {
      id: "hp-15s",
      brand: "HP",
      model: "HP 15s Ryzen 5",
      category: "Laptop",
      specs: {
        display: "15.6\" FHD Micro-edge, anti-glare display",
        processor: "AMD Ryzen 5 5500U",
        ramStorage: "8GB/16GB DDR4 RAM, 512GB PCIe SSD",
        battery: "3-cell, 41 Wh Li-ion, fast charge",
        os: "Windows 11 Home"
      },
      priceRange: "₹38,500 - ₹43,000",
      popularity: "High",
      status: "Available New & Refurbished"
    },
    {
      id: "lenovo-ideapad-3",
      brand: "Lenovo",
      model: "IdeaPad 3 Core i3",
      category: "Laptop",
      specs: {
        display: "15.6\" FHD (1920x1080) TN 250nits",
        processor: "Intel Core i3-1115G4",
        ramStorage: "8GB RAM, 512GB SSD",
        battery: "2-cell, 38 Wh, up to 5 hours battery life",
        os: "Windows 11 Home"
      },
      priceRange: "₹31,990 - ₹34,500",
      popularity: "Medium",
      status: "Available New & Refurbished"
    },
    {
      id: "macbook-air-m1",
      brand: "Apple",
      model: "MacBook Air M1 (Refurbished)",
      category: "Laptop",
      specs: {
        display: "13.3\" Retina Display with P3 Wide Color",
        processor: "Apple M1 Chip (8-core CPU)",
        ramStorage: "8GB Unified Memory, 256GB SSD",
        battery: "49.9 Wh, up to 15 hours wireless web",
        os: "macOS Big Sur (upgradable)"
      },
      priceRange: "₹49,999 - ₹54,500",
      popularity: "High",
      status: "Available Refurbished Only"
    },
    {
      id: "dell-inspiron-15",
      brand: "Dell",
      model: "Inspiron 15 3520",
      category: "Laptop",
      specs: {
        display: "15.6\" FHD (1920x1080) 120Hz display",
        processor: "Intel Core i5-1235U",
        ramStorage: "8GB/16GB RAM, 512GB SSD",
        battery: "3-cell, 41 Wh battery, express charge",
        os: "Windows 11 Home"
      },
      priceRange: "₹45,999 - ₹49,999",
      popularity: "Medium",
      status: "Available New & Refurbished"
    }
  ],
  offers: [
    {
      id: "diwali-dhamaka",
      title: "Festive Diwali Dhamaka",
      discount: "Up to 15% OFF",
      validity: "Limited time during Diwali season",
      description: "Special flat discounts on selected models of Realme, Oppo, and Vivo smartphones. Free tempered glass and premium back cover with every purchase.",
      tag: "Seasonal Mega Deal"
    },
    {
      id: "exchange-bonus",
      title: "Smartphone Exchange Bonus",
      discount: "Extra ₹2,500 Value",
      validity: "Ongoing Offer",
      description: "Bring in your old working smartphone and get an additional exchange bonus of up to ₹2,500 on top of its evaluated buy-back price towards any new or refurbished mobile.",
      tag: "Exchange Special"
    },
    {
      id: "student-laptop",
      title: "Back to School / Student Special",
      discount: "Flat ₹3,000 OFF",
      validity: "Valid with Student ID",
      description: "Special laptop discounts for school and college students in Bilimora. Applicable on refurbished and brand new Lenovo, Dell, and HP laptops.",
      tag: "Student Exclusive"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Rajesh Patel",
      location: "Bilimora, Gujarat",
      rating: 5,
      text: "Bought a refurbished iPhone 13 from Bluemoon Gallery last year. The battery health was 95% and the phone looks brand new. Monti Shah explained the 20-point refurbishing process clearly. Highly recommend!",
      serviceUsed: "Bought Refurbished iPhone"
    },
    {
      id: "t2",
      name: "Sneha Shah",
      location: "Gandevi, Gujarat",
      rating: 5,
      text: "Sold my old Oppo phone here and got instant cash within 15 minutes. The valuation was very transparent and much better than online trade-in platforms. Best mobile shop near Bilimora.",
      serviceUsed: "Sold Old Device"
    },
    {
      id: "t3",
      name: "Amit Desai",
      location: "Bilimora, Gujarat",
      rating: 5,
      text: "I was confused about which laptop to buy for my son's college. Their Phone/Laptop Spec Wiki was extremely helpful, and Monti Shah personally guided us to get the HP Ryzen 5 laptop within our budget.",
      serviceUsed: "Laptop Purchase"
    },
    {
      id: "t4",
      name: "Meera Naik",
      location: "Chikhli, Gujarat",
      rating: 4,
      text: "Great experience. Bought a brand new Realme phone during the Diwali offer. Got a discount and free accessories. Excellent customer service and very friendly staff.",
      serviceUsed: "Festive Discount Deal"
    }
  ],
  faqs: [
    {
      id: "faq1",
      question: "Do you provide a warranty on refurbished phones and laptops?",
      answer: "Yes, every refurbished phone and laptop purchased from Bluemoon Gallery comes with our local shop-backed warranty (typically 3 to 6 months depending on the model) covering functional defects. We also provide a verification certificate."
    },
    {
      id: "faq2",
      question: "How do you calculate the buy-back price of my old phone?",
      answer: "We perform a thorough 20-point diagnostic check on-the-spot, checking screen condition, battery health, buttons, cameras, and connectivity. Based on the evaluation and current market value, we provide a fair, transparent offer instantly."
    },
    {
      id: "faq3",
      question: "Which brands do you deal in?",
      answer: "We sell, buy, and refurbish all major brands including Apple (iPhones & iPads), Realme, Oppo, Vivo, Samsung, Xiaomi, and OnePlus. For laptops, we deal in Dell, HP, Lenovo, Asus, and Apple MacBooks."
    },
    {
      id: "faq4",
      question: "Where is Bluemoon Gallery located?",
      answer: "We are located in Bilimora, Gujarat, India. Our shop is easily accessible, located near the Railway Station Road. You can find our exact location on the interactive Google Map in our Contact section."
    },
    {
      id: "faq5",
      question: "Do you offer EMI or installment payment options?",
      answer: "Yes, we support easy EMI transactions through major credit cards and local finance partners (like Bajaj Finserv) at the shop. Please visit us with your documents (Aadhaar, PAN) to verify eligibility."
    },
    {
      id: "faq6",
      question: "Is the Phone & Laptop Wiki database free to use?",
      answer: "Absolutely! The Wiki is a free resource we offer online and in-store to help our customers compare specifications, check price ranges, and make informed tech decisions before making a purchase."
    }
  ]
};

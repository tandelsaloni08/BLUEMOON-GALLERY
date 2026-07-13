"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import { useCart } from "@/context/CartContext";
import {
  Search,
  ShoppingCart,
  Zap,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShieldCheck,
  Cpu,
  HardDrive
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductType {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  brand: string;
  ram: string;
  storage: string;
  condition: string;
  warranty: string;
  price: number;
  discountPrice: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
}

const ITEMS_PER_PAGE = 6;

export default function CategoryProductsPage() {
  const params = useParams();
  const router = useRouter();
  const rawCategory = (params?.category as string) || "mobile";
  
  // map route categories to backend schema categories
  const categoryMapped = useMemo(() => {
    const cat = rawCategory.toLowerCase();
    if (cat === "mobile") return "mobile";
    if (cat === "laptops") return "laptops";
    if (cat === "tablets") return "tablets";
    return cat;
  }, [rawCategory]);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters State
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number>(150000);
  const [sortOption, setSortOption] = useState<string>("featured");
  
  // Page number
  const [currentPage, setCurrentPage] = useState(1);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  const { addToCart } = useCart();

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("bluemoon_wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist:", e);
      }
    }
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${categoryMapped}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryMapped]);

  // Derive unique brands in current collection
  const availableBrands = useMemo(() => {
    const brands = new Set(products.map((p) => p.brand));
    return Array.from(brands);
  }, [products]);

  // Toggle wishlist
  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("bluemoon_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  // Filtered & Sorted products list
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Brands checkbox
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Condition selector
    if (selectedCondition !== "all") {
      result = result.filter(
        (p) => p.condition.toLowerCase() === selectedCondition.toLowerCase()
      );
    }

    // Price range slider
    result = result.filter((p) => p.discountPrice <= priceRange);

    // Sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.discountPrice - a.discountPrice);
    }

    return result;
  }, [products, search, selectedBrands, selectedCondition, priceRange, sortOption]);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedBrands, selectedCondition, priceRange, sortOption]);

  // Paginated chunk
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [processedProducts, currentPage]);

  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE) || 1;

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleBuyNow = (product: ProductType) => {
    const productId = product._id || product.id || "";
    addToCart({
      id: productId,
      name: product.name,
      brand: product.brand,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
      condition: product.condition,
      storage: product.storage,
      ram: product.ram
    }, 1);
    router.push("/checkout");
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen py-12 relative pb-28 sm:pb-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* breadcrumb */}
          <div className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-blue-400 capitalize">{rawCategory} Shop</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight capitalize mb-10">
            {rawCategory} Collection
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Filter sidebar (Col Span 3) */}
            <div className="lg:col-span-3 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                  <span>Filters</span>
                </h2>
                {(search || selectedBrands.length > 0 || selectedCondition !== "all" || sortOption !== "featured") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedBrands([]);
                      setSelectedCondition("all");
                      setPriceRange(150000);
                      setSortOption("featured");
                    }}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search models..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Brands</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1 no-scrollbar">
                    {availableBrands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Condition Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Condition</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {["all", "New", "Refurbished"].map((cond) => (
                    <button
                      key={cond}
                      onClick={() => setSelectedCondition(cond)}
                      className={`py-1 text-[10px] font-bold rounded capitalize transition-all ${
                        selectedCondition === cond
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="font-semibold uppercase tracking-wider">Max Price</label>
                  <span className="font-mono text-amber-400 font-bold">₹{priceRange.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="150000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Sorting */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Sort By</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Relevant</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid Area (Col Span 9) */}
            <div className="lg:col-span-9">
              {loading ? (
                <div className="text-center py-24">
                  <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-400 text-sm">Loading product catalog...</p>
                </div>
              ) : error ? (
                <div className="text-center py-24 text-red-400 bg-slate-900 border border-slate-800 rounded-2xl">
                  {error}
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="text-center py-24 text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
                  No products match your active search or filters.
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => {
                      const productId = product._id || product.id || "";
                      const hasDiscount = product.price > product.discountPrice;
                      const isWishlisted = wishlist.includes(productId);

                      return (
                        <motion.div
                          key={productId}
                          layout
                          className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl relative overflow-hidden group"
                        >
                          {/* Top floating actions */}
                          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              product.condition === "New"
                                ? "bg-blue-600/10 border-blue-500/20 text-blue-400"
                                : "bg-purple-600/10 border-purple-500/20 text-purple-400"
                            }`}>
                              {product.condition}
                            </span>
                            
                            <button
                              onClick={() => toggleWishlist(productId)}
                              className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-slate-400 hover:text-red-500 hover:scale-105 active:scale-95 transition-all"
                              aria-label="Toggle Wishlist"
                            >
                              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                            </button>
                          </div>

                          {/* Product Image */}
                          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-850 flex items-center justify-center">
                            {/* Unsplash/Mock Image Handler */}
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.stock <= 0 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-red-400 uppercase tracking-widest">
                                Out of Stock
                              </div>
                            )}
                          </div>

                          {/* Product details */}
                          <div>
                            <div className="text-xs text-slate-500 font-mono mb-1">{product.brand}</div>
                            <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                              {product.name}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-400">
                              <div className="flex items-center gap-0.5 text-amber-400">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                              </div>
                              <span className="font-bold text-slate-300">{product.rating}</span>
                              <span>•</span>
                              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                                {product.stock > 0 ? `${product.stock} left` : "0 stock"}
                              </span>
                            </div>

                            {/* Storage & Processor info snippet */}
                            <div className="flex flex-wrap gap-2 mb-4 text-[10px] text-slate-400 border-y border-slate-800/40 py-2.5">
                              <span className="flex items-center gap-1">
                                <HardDrive className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                                <span>{product.ram}/{product.storage}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                                <span className="line-clamp-1">{product.warranty.replace("Warranty", "")}</span>
                              </span>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-2">
                              {product.description}
                            </p>
                          </div>

                          {/* Prices & Actions */}
                          <div>
                            <div className="flex items-baseline gap-2 mb-4">
                              <span className="text-xl font-extrabold text-white font-mono">
                                ₹{product.discountPrice.toLocaleString("en-IN")}
                              </span>
                              {hasDiscount && (
                                <span className="text-xs text-slate-500 line-through font-mono">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() =>
                                  addToCart({
                                    id: productId,
                                    name: product.name,
                                    brand: product.brand,
                                    price: product.price,
                                    discountPrice: product.discountPrice,
                                    image: product.image,
                                    condition: product.condition,
                                    storage: product.storage,
                                    ram: product.ram
                                  })
                                }
                                disabled={product.stock <= 0}
                                className="flex items-center justify-center gap-1 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950 text-xs font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <ShoppingCart className="w-3.5 h-3.5 text-blue-400" />
                                <span>Add</span>
                              </button>

                              <button
                                onClick={() => handleBuyNow(product)}
                                disabled={product.stock <= 0}
                                className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-xs font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Zap className="w-3.5 h-3.5 text-amber-300" />
                                <span>Buy Now</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Pagination control */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-900">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <span className="text-xs font-mono text-slate-400">
                        Page <strong className="text-white">{currentPage}</strong> of {totalPages}
                      </span>

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <MobileContactBar />
    </>
  );
}

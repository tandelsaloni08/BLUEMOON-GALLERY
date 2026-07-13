"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import { useAuth } from "@/context/AuthContext";
import {
  Lock,
  Plus,
  Trash2,
  Edit,
  Package,
  FileText,
  AlertCircle,
  CheckCircle,
  Truck,
  HelpCircle
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

interface OrderType {
  _id?: string;
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  total: number;
  paymentMethod: string;
  orderStatus: string;
  orderDate?: string;
  createdAt?: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default function AdminDashboard() {
  const { token, user, isAdmin, login } = useAuth();
  
  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Tab state: "products" or "orders"
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  // Admin Data states
  const [products, setProducts] = useState<ProductType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Add Product form state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  
  const [prodForm, setProdForm] = useState({
    name: "",
    category: "mobile",
    brand: "",
    ram: "8GB",
    storage: "128GB",
    condition: "New",
    warranty: "1 Year Brand Warranty",
    price: "",
    discountPrice: "",
    description: "",
    image: "",
    stock: "10",
  });
  
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Load Admin Dashboard Data
  useEffect(() => {
    if (isAdmin && token) {
      loadDashboardData();
    }
  }, [isAdmin, token]);

  const loadDashboardData = async () => {
    setDataLoading(true);
    setFetchError("");
    try {
      // Fetch Products
      const prodRes = await fetch("/api/products");
      if (!prodRes.ok) throw new Error("Failed to fetch products");
      const prodData = await prodRes.json();
      setProducts(prodData);

      // Fetch Orders with Bearer Auth
      const ordRes = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!ordRes.ok) throw new Error("Failed to fetch orders");
      const ordData = await ordRes.json();
      setOrders(ordData);
    } catch (err: any) {
      setFetchError(err.message || "Failed to load dashboard statistics.");
    } finally {
      setDataLoading(false);
    }
  };

  // Handle Admin Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login credentials failed.");
      }

      const { token: jwtToken, user: userDetails } = await res.json();

      if (userDetails.role !== "admin") {
        throw new Error("Access Denied: This account is not authorized as Admin.");
      }

      login(jwtToken, userDetails);
    } catch (err: any) {
      setLoginError(err.message || "Something went wrong.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Add/Edit Product Submission
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSubmitting(true);

    const { name, category, brand, price, discountPrice, image, stock } = prodForm;
    if (!name || !category || !brand || !price || !discountPrice || !image || !stock) {
      setFormError("Please fill out all required fields.");
      setFormSubmitting(false);
      return;
    }

    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `/api/products/${editingProduct._id || editingProduct.id}`
        : "/api/products";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prodForm),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to process product details.");
      }

      // Reload
      await loadDashboardData();
      
      // Reset form
      setIsAddingProduct(false);
      setEditingProduct(null);
      setProdForm({
        name: "",
        category: "mobile",
        brand: "",
        ram: "8GB",
        storage: "128GB",
        condition: "New",
        warranty: "1 Year Brand Warranty",
        price: "",
        discountPrice: "",
        description: "",
        image: "",
        stock: "10",
      });
    } catch (err: any) {
      setFormError(err.message || "An error occurred.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Product handler
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete product.");
    }
  };

  // Edit Product trigger
  const handleEditClick = (product: ProductType) => {
    setEditingProduct(product);
    setProdForm({
      name: product.name,
      category: product.category,
      brand: product.brand,
      ram: product.ram,
      storage: product.storage,
      condition: product.condition,
      warranty: product.warranty,
      price: product.price.toString(),
      discountPrice: product.discountPrice.toString(),
      description: product.description,
      image: product.image,
      stock: product.stock.toString(),
    });
    setIsAddingProduct(true);
  };

  // Update Order Status handler
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update order status.");
    }
  };

  // Render Login Gate
  if (!isAdmin) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen py-12 flex items-center justify-center relative">
          <div className="max-w-md w-full px-4 sm:px-6 relative z-10">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard Access</h1>
                <p className="text-xs text-slate-500 mt-1">Please sign in with credentials from Monti Shah.</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@bluemoon.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Security Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-755 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-semibold">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/10"
                >
                  {loginLoading ? "Verifying..." : "Verify Administrator Rights"}
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen py-12 relative pb-28 sm:pb-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header block */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Console</h1>
              <p className="text-xs sm:text-sm text-slate-400">Welcome back, <strong>{user?.name || "Monti Shah"}</strong>.</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProdForm({
                    name: "",
                    category: "mobile",
                    brand: "",
                    ram: "8GB",
                    storage: "128GB",
                    condition: "New",
                    warranty: "1 Year Brand Warranty",
                    price: "",
                    discountPrice: "",
                    description: "",
                    image: "",
                    stock: "10",
                  });
                  setIsAddingProduct(true);
                }}
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>

              <button
                onClick={loadDashboardData}
                className="px-4.5 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Refresh Data
              </button>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex border-b border-slate-800 gap-4 mb-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-3 text-sm font-semibold border-b-2 px-2 transition-all ${
                activeTab === "products"
                  ? "border-blue-500 text-white"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4.5 h-4.5" />
                <span>Products Stock ({products.length})</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`py-3 text-sm font-semibold border-b-2 px-2 transition-all ${
                activeTab === "orders"
                  ? "border-blue-500 text-white"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5" />
                <span>Client Orders ({orders.length})</span>
              </span>
            </button>
          </div>

          {/* Load error */}
          {fetchError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-semibold rounded-xl mb-6">
              {fetchError}
            </div>
          )}

          {/* Main admin panels */}
          <div className="relative">
            {dataLoading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400 text-sm">Syncing console data...</p>
              </div>
            ) : activeTab === "products" ? (
              /* Products stock manager view */
              <div className="grid grid-cols-1 gap-6">
                <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                        <th className="py-4 px-4">Item</th>
                        <th className="py-4 px-4">Category</th>
                        <th className="py-4 px-4">Brand</th>
                        <th className="py-4 px-4">Condition</th>
                        <th className="py-4 px-4">Price (Discount)</th>
                        <th className="py-4 px-4 text-center">Stock</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/60 text-slate-300">
                      {products.map((p) => {
                        const pid = p._id || p.id || "";
                        return (
                          <tr key={pid} className="hover:bg-slate-850/30 transition-colors">
                            <td className="py-3 px-4 font-semibold text-white">{p.name}</td>
                            <td className="py-3 px-4 capitalize">{p.category}</td>
                            <td className="py-3 px-4 font-mono">{p.brand}</td>
                            <td className="py-3 px-4 font-mono">{p.condition}</td>
                            <td className="py-3 px-4 font-mono font-bold text-amber-400">
                              ₹{p.discountPrice.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                                p.stock <= 3 ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
                              }`}>
                                {p.stock}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditClick(p)}
                                  className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                                  title="Edit Product"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(pid)}
                                  className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-red-400"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Client Orders view */
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
                    No orders have been submitted yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => {
                      const oid = o._id || o.orderId;
                      const dateObj = o.createdAt ? new Date(o.createdAt) : o.orderDate ? new Date(o.orderDate) : null;
                      const dateString = dateObj ? dateObj.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }) : "N/A";

                      return (
                        <div key={oid} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                          {/* Order metadata line */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3.5 text-xs">
                            <div>
                              <span className="font-mono text-blue-400 font-bold text-sm tracking-wider mr-2">
                                {o.orderId}
                              </span>
                              <span className="text-slate-500">{dateString}</span>
                            </div>
                            
                            {/* Status controls */}
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded font-bold mr-2 text-[10px] ${
                                o.orderStatus === "Delivered"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : o.orderStatus === "Shipped"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                                {o.orderStatus}
                              </span>

                              <select
                                value={o.orderStatus}
                                onChange={(e) => handleUpdateOrderStatus(o.orderId, e.target.value)}
                                className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 focus:outline-none cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </div>
                          </div>

                          {/* Order content detail */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                            {/* Shipping details */}
                            <div>
                              <h4 className="font-bold text-white mb-2">Customer Info</h4>
                              <div className="space-y-1.5 text-slate-400">
                                <div>Name: <strong className="text-slate-200">{o.customerName}</strong></div>
                                <div>Phone: <strong className="text-slate-200">{o.phone}</strong></div>
                                <div>Email: <span className="text-slate-300">{o.email}</span></div>
                                <div>Address: <span className="text-slate-300">{o.address}</span></div>
                              </div>
                            </div>

                            {/* Item breakdown & Billing */}
                            <div>
                              <h4 className="font-bold text-white mb-2">Items Bought</h4>
                              <div className="space-y-2 border-b border-slate-800 pb-3 mb-3">
                                {o.items.map((item, index) => (
                                  <div key={index} className="flex justify-between text-slate-400 text-xs">
                                    <span>
                                      {item.name} <strong className="text-slate-300">x{item.quantity}</strong>
                                    </span>
                                    <span className="font-mono text-slate-200">
                                      ₹{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex items-center justify-between text-xs sm:text-sm">
                                <span className="text-slate-500">Payment: <strong>{o.paymentMethod}</strong></span>
                                <span className="font-bold text-amber-400 font-mono text-base">
                                  Total: ₹{o.total.toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Slide-in Add Product Form Gate overlay */}
      <AnimatePresence>
        {isAddingProduct && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Form Sheet container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-slate-900 border-l border-slate-800 p-6 flex flex-col h-full overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-850 mb-6">
                <h3 className="text-lg font-bold text-white">
                  {editingProduct ? `Edit ${editingProduct.name}` : "Add New Catalog Product"}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <XIcon />
                </button>
              </div>

              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-semibold rounded-lg mb-4">
                  {formError}
                </div>
              )}

              <form onSubmit={handleProductSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-400">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                    placeholder="e.g. iPhone 15 Pro Max"
                  />
                </div>

                {/* Grid Category, Brand, Condition */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">Category *</label>
                    <select
                      value={prodForm.category}
                      onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-slate-300 cursor-pointer"
                    >
                      <option value="mobile">Mobiles</option>
                      <option value="laptops">Laptops</option>
                      <option value="tablets">Tablets</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">Brand *</label>
                    <input
                      type="text"
                      required
                      value={prodForm.brand}
                      onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                      placeholder="e.g. Apple"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">Condition *</label>
                    <select
                      value={prodForm.condition}
                      onChange={(e) => setProdForm({ ...prodForm, condition: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-slate-300 cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Refurbished">Refurbished</option>
                    </select>
                  </div>
                </div>

                {/* RAM / Storage / Warranty */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">RAM</label>
                    <input
                      type="text"
                      value={prodForm.ram}
                      onChange={(e) => setProdForm({ ...prodForm, ram: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                      placeholder="e.g. 8GB"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">Storage</label>
                    <input
                      type="text"
                      value={prodForm.storage}
                      onChange={(e) => setProdForm({ ...prodForm, storage: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                      placeholder="e.g. 128GB"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">Warranty</label>
                    <input
                      type="text"
                      value={prodForm.warranty}
                      onChange={(e) => setProdForm({ ...prodForm, warranty: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                      placeholder="e.g. 1 Year Brand"
                    />
                  </div>
                </div>

                {/* Price & Discount price */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">M.R.P. Price *</label>
                    <input
                      type="number"
                      required
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                      placeholder="75000"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">Discount Price *</label>
                    <input
                      type="number"
                      required
                      value={prodForm.discountPrice}
                      onChange={(e) => setProdForm({ ...prodForm, discountPrice: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                      placeholder="65000"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-slate-400">Stock Qty *</label>
                    <input
                      type="number"
                      required
                      value={prodForm.stock}
                      onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                      placeholder="10"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-400">Product Description</label>
                  <textarea
                    rows={3}
                    value={prodForm.description}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white resize-none"
                    placeholder="Provide highlights..."
                  />
                </div>

                {/* Image URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-400">Product Image URL *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <span className="text-[10px] text-slate-500">Provide an absolute image path. Or base64 code.</span>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl text-xs transition-all"
                  >
                    {formSubmitting ? "Submitting..." : editingProduct ? "Save Changes" : "Create Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all border border-slate-750"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <MobileContactBar />
    </>
  );
}

function XIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

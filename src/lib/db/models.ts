import mongoose, { Schema } from "mongoose";

// Product Schema
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "mobile", "laptops", "tablets"
    brand: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    condition: { type: String, required: true }, // "New" or "Refurbished"
    warranty: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

// User Schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // "user" or "admin"
  },
  { timestamps: true }
);

// Order Schema
const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, // "COD", "UPI", "Card"
    orderStatus: { type: String, default: "Pending" }, // "Pending", "Confirmed", "Shipped", "Delivered"
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export { ProductSchema, UserSchema, OrderSchema };

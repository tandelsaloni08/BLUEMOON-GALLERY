import { NextResponse } from "next/server";
import { dbConnect, readMockDb, writeMockDb } from "@/lib/db/dbConnect";
import { Product } from "@/lib/db/models";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conn = await dbConnect();

    if (conn) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product);
    } else {
      const db = readMockDb();
      const product = db.products.find((p: any) => p.id === id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product);
    }
  } catch (err: any) {
    console.error("GET Product Detail Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: Admin authorization required" }, { status: 403 });
    }

    const updates = await req.json();
    const conn = await dbConnect();

    // Sanitize updates
    if (updates.price) updates.price = Number(updates.price);
    if (updates.discountPrice) updates.discountPrice = Number(updates.discountPrice);
    if (updates.stock !== undefined) updates.stock = Number(updates.stock);
    if (updates.rating) updates.rating = Number(updates.rating);

    if (conn) {
      const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedProduct) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(updatedProduct);
    } else {
      const db = readMockDb();
      const idx = db.products.findIndex((p: any) => p.id === id);
      if (idx === -1) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      db.products[idx] = {
        ...db.products[idx],
        ...updates,
      };

      writeMockDb(db);
      return NextResponse.json(db.products[idx]);
    }
  } catch (err: any) {
    console.error("PUT Product Error:", err);
    return NextResponse.json({ error: err.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: Admin authorization required" }, { status: 403 });
    }

    const conn = await dbConnect();

    if (conn) {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Product deleted successfully" });
    } else {
      const db = readMockDb();
      const initialLength = db.products.length;
      db.products = db.products.filter((p: any) => p.id !== id);

      if (db.products.length === initialLength) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      writeMockDb(db);
      return NextResponse.json({ message: "Product deleted successfully" });
    }
  } catch (err: any) {
    console.error("DELETE Product Error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete product" }, { status: 500 });
  }
}

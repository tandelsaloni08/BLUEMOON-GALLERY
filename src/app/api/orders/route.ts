import { NextResponse } from "next/server";
import { dbConnect, readMockDb, writeMockDb } from "@/lib/db/dbConnect";
import { Order, Product } from "@/lib/db/models";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: Admin authorization required" }, { status: 403 });
    }

    const conn = await dbConnect();

    if (conn) {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return NextResponse.json(orders);
    } else {
      const db = readMockDb();
      // Sort orders by orderDate descending
      const sortedOrders = [...db.orders].sort(
        (a: any, b: any) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      return NextResponse.json(sortedOrders);
    }
  } catch (err: any) {
    console.error("GET Orders Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      items,
    } = await req.json();

    if (
      !customerName ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !paymentMethod ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
    }

    // Generate Order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BMG-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    // Calculate total and verify stock
    let calculatedTotal = 0;
    const orderItems: any[] = [];

    const conn = await dbConnect();

    if (conn) {
      // MongoDB Transaction simulation
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });
        }
        if (product.stock < item.quantity) {
          return NextResponse.json(
            { error: `Insufficient stock for ${product.name}. Available: ${product.stock}` },
            { status: 400 }
          );
        }

        // Decrement stock
        product.stock -= item.quantity;
        await product.save();

        calculatedTotal += product.discountPrice * item.quantity;
        orderItems.push({
          productId: product._id.toString(),
          name: product.name,
          quantity: item.quantity,
          price: product.discountPrice,
        });
      }

      const newOrder = await Order.create({
        orderId,
        customerName,
        phone,
        email,
        address: `${address}, ${city}, ${state} - ${pincode}`,
        city,
        state,
        pincode,
        total: calculatedTotal,
        paymentMethod,
        orderStatus: "Pending",
        items: orderItems,
      });

      return NextResponse.json(newOrder);
    } else {
      // Mock DB Mode
      const db = readMockDb();

      for (const item of items) {
        const productIdx = db.products.findIndex((p: any) => p.id === item.productId);
        if (productIdx === -1) {
          return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });
        }

        const product = db.products[productIdx];
        if (product.stock < item.quantity) {
          return NextResponse.json(
            { error: `Insufficient stock for ${product.name}. Available: ${product.stock}` },
            { status: 400 }
          );
        }

        // Decrement stock
        db.products[productIdx].stock -= item.quantity;

        calculatedTotal += product.discountPrice * item.quantity;
        orderItems.push({
          productId: product.id,
          name: product.name,
          quantity: item.quantity,
          price: product.discountPrice,
        });
      }

      const newOrder = {
        orderId,
        customerName,
        phone,
        email,
        address: `${address}, ${city}, ${state} - ${pincode}`,
        city,
        state,
        pincode,
        total: calculatedTotal,
        paymentMethod,
        orderStatus: "Pending",
        orderDate: new Date().toISOString(),
        items: orderItems,
      };

      db.orders.push(newOrder);
      writeMockDb(db);

      return NextResponse.json(newOrder);
    }
  } catch (err: any) {
    console.error("POST Order Error:", err);
    return NextResponse.json({ error: err.message || "Failed to process order" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { dbConnect, readMockDb, writeMockDb } from "@/lib/db/dbConnect";
import { Order } from "@/lib/db/models";
import { getAuthUser } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // id can represent the mongo _id or the BMG-XXXX Order ID
    const user = getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: Admin authorization required" }, { status: 403 });
    }

    const { orderStatus } = await req.json();
    if (!orderStatus) {
      return NextResponse.json({ error: "Missing orderStatus field" }, { status: 400 });
    }

    const conn = await dbConnect();

    if (conn) {
      // Find by _id or custom orderId string
      const order = await Order.findOneAndUpdate(
        { $or: [{ _id: id }, { orderId: id }] },
        { orderStatus },
        { new: true }
      );
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json(order);
    } else {
      // Mock DB Mode
      const db = readMockDb();
      const idx = db.orders.findIndex((o: any) => o.orderId === id);
      if (idx === -1) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      db.orders[idx].orderStatus = orderStatus;
      writeMockDb(db);
      return NextResponse.json(db.orders[idx]);
    }
  } catch (err: any) {
    console.error("PUT Order Status Error:", err);
    return NextResponse.json({ error: err.message || "Failed to update order status" }, { status: 500 });
  }
}

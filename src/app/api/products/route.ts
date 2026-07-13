import { NextResponse } from "next/server";
import { dbConnect, readMockDb, writeMockDb } from "@/lib/db/dbConnect";
import { Product } from "@/lib/db/models";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const conn = await dbConnect();
    const url = new URL(req.url);

    // Parsing Query Parameters
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";
    const brand = url.searchParams.get("brand") || "";
    const condition = url.searchParams.get("condition") || "";
    const minPrice = parseFloat(url.searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(url.searchParams.get("maxPrice") || "9999999");
    const sort = url.searchParams.get("sort") || ""; // "price-asc" or "price-desc"

    if (conn) {
      // MongoDB Query Object
      const query: any = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      if (category && category !== "all") {
        query.category = category.toLowerCase();
      }

      if (brand && brand !== "all") {
        query.brand = { $regex: new RegExp(`^${brand}$`, "i") };
      }

      if (condition && condition !== "all") {
        query.condition = { $regex: new RegExp(`^${condition}$`, "i") };
      }

      query.discountPrice = { $gte: minPrice, $lte: maxPrice };

      let productQuery = Product.find(query);

      if (sort === "price-asc") {
        productQuery = productQuery.sort({ discountPrice: 1 });
      } else if (sort === "price-desc") {
        productQuery = productQuery.sort({ discountPrice: -1 });
      }

      const products = await productQuery;
      return NextResponse.json(products);
    } else {
      // Mock DB Query Filtering
      const db = readMockDb();
      let list = [...db.products];

      if (search) {
        const queryLower = search.toLowerCase();
        list = list.filter(
          (p: any) =>
            p.name.toLowerCase().includes(queryLower) ||
            p.brand.toLowerCase().includes(queryLower) ||
            p.description.toLowerCase().includes(queryLower)
        );
      }

      if (category && category !== "all") {
        list = list.filter((p: any) => p.category.toLowerCase() === category.toLowerCase());
      }

      if (brand && brand !== "all") {
        list = list.filter((p: any) => p.brand.toLowerCase() === brand.toLowerCase());
      }

      if (condition && condition !== "all") {
        list = list.filter((p: any) => p.condition.toLowerCase() === condition.toLowerCase());
      }

      list = list.filter((p: any) => p.discountPrice >= minPrice && p.discountPrice <= maxPrice);

      if (sort === "price-asc") {
        list.sort((a: any, b: any) => a.discountPrice - b.discountPrice);
      } else if (sort === "price-desc") {
        list.sort((a: any, b: any) => b.discountPrice - a.discountPrice);
      }

      return NextResponse.json(list);
    }
  } catch (err: any) {
    console.error("GET Products Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: Admin authorization required" }, { status: 403 });
    }

    const {
      name,
      category,
      brand,
      ram,
      storage,
      condition,
      warranty,
      price,
      discountPrice,
      description,
      image,
      stock,
      rating,
    } = await req.json();

    if (!name || !category || !brand || !price || !discountPrice || !image || stock === undefined) {
      return NextResponse.json({ error: "Missing required product fields" }, { status: 400 });
    }

    const conn = await dbConnect();

    const productPayload = {
      name,
      category: category.toLowerCase(),
      brand,
      ram: ram || "N/A",
      storage: storage || "N/A",
      condition: condition || "New",
      warranty: warranty || "Shop Warranty",
      price: Number(price),
      discountPrice: Number(discountPrice),
      description,
      image,
      stock: Number(stock),
      rating: Number(rating || 4.5),
    };

    if (conn) {
      // MongoDB Create
      const newProduct = await Product.create(productPayload);
      return NextResponse.json(newProduct);
    } else {
      // Mock DB Create
      const db = readMockDb();
      const newProduct = {
        id: "p_" + Date.now(),
        ...productPayload,
      };

      db.products.push(newProduct);
      writeMockDb(db);
      return NextResponse.json(newProduct);
    }
  } catch (err: any) {
    console.error("POST Product Error:", err);
    return NextResponse.json({ error: err.message || "Failed to create product" }, { status: 500 });
  }
}

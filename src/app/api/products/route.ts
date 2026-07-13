import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const category = searchParams.get("category") || "";
  const auctionType = searchParams.get("auctionType") || "";
  const priceMin = parseInt(searchParams.get("priceMin") || "0");
  const priceMax = parseInt(searchParams.get("priceMax") || "999999");
  const location = searchParams.get("location") || "";
  const condition = searchParams.get("condition") || "";
  const auctionHouses = searchParams.get("auctionHouses") || "";
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "new-arrival";

  let filtered = [...products];

  if (category && category.toUpperCase() !== "ALL") {
    filtered = filtered.filter(
      (p) => p.category.toUpperCase() === category.toUpperCase()
    );
  }

  if (auctionType && auctionType !== "all") {
    filtered = filtered.filter((p) => p.action === auctionType);
  }

  filtered = filtered.filter(
    (p) => p.starting >= priceMin && p.starting <= priceMax
  );

  if (location && location !== "all") {
    filtered = filtered.filter(
      (p) => p.location.toLowerCase() === location.toLowerCase()
    );
  }

  if (condition) {
    const conditions = condition.split(",").filter(Boolean);
    if (conditions.length > 0) {
      filtered = filtered.filter((p) =>
        conditions.includes(p.condition.toLowerCase())
      );
    }
  }

  if (auctionHouses) {
    const houses = auctionHouses.split(",").filter(Boolean);
    if (houses.length > 0) {
      filtered = filtered.filter((p) => houses.includes(p.auctionHouse));
    }
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.auctionHouse.toLowerCase().includes(searchLower)
    );
  }

  switch (sortBy) {
    case "price-low-high":
      filtered.sort((a, b) => a.starting - b.starting);
      break;
    case "price-high-low":
      filtered.sort((a, b) => b.starting - a.starting);
      break;
    case "ending-soon":
      filtered.sort((a, b) => {
        const getMinutes = (t: string) => {
          const parts = t.match(/(\d+)d:(\d+)h:(\d+)sec/);
          if (!parts) return 0;
          return (
            parseInt(parts[1]) * 1440 + parseInt(parts[2]) * 60 + parseInt(parts[3])
          );
        };
        return getMinutes(a.time) - getMinutes(b.time);
      });
      break;
    case "new-arrival":
    default:
      break;
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    products: paginatedProducts,
    total,
    page,
    totalPages,
  });
}

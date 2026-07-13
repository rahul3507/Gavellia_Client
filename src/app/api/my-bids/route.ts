import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";
import { ProductData, BidItem } from "@/types/allTypes";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tab = searchParams.get("tab") || "active";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const allProducts = products as ProductData[];

  const activeBids: BidItem[] = allProducts
    .filter((p) => p.action === "live" || p.action === "upcoming")
    .slice(0, 15)
    .map((p, i) => ({
      id: i + 1,
      title: p.title,
      lot: `#${p.id}`,
      image: p.img[0],
      myBid: p.highestBid - Math.floor(Math.random() * 100),
      isHighest: i % 3 !== 1,
      status: i % 3 === 1 ? "Outbid" : "Winning",
      time: p.time,
    }));

  const wonBids: BidItem[] = allProducts
    .filter((p) => p.action === "timed")
    .slice(0, 5)
    .map((p, i) => ({
      id: 100 + i,
      title: p.title,
      lot: `#${p.id}`,
      image: p.img[0],
      myBid: p.highestBid,
      isHighest: true,
      status: "Winner" as const,
      time: p.time,
      finalAmount: p.highestBid,
    }));

  const lostBids: BidItem[] = allProducts
    .filter((p) => p.bids > 10)
    .slice(0, 8)
    .map((p, i) => ({
      id: 200 + i,
      title: p.title,
      lot: `#${p.id}`,
      image: p.img[0],
      myBid: p.highestBid - 200,
      isHighest: false,
      status: "Lost" as const,
      time: p.time,
    }));

  const tabData: Record<string, BidItem[]> = {
    active: activeBids,
    won: wonBids,
    lost: lostBids,
  };

  const currentBids = tabData[tab] || activeBids;
  const total = currentBids.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedBids = currentBids.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    activeBids,
    wonBids,
    lostBids,
    currentBids: paginatedBids,
    tabCounts: {
      active: activeBids.length,
      won: wonBids.length,
      lost: lostBids.length,
    },
    total,
    page,
    totalPages,
  });
}

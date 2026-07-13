import { NextResponse } from "next/server";
import products from "@/data/products.json";
import { ProductData } from "@/types/allTypes";

export async function GET() {
  const allProducts = products as ProductData[];

  const liveProducts = allProducts.filter((p) => p.action === "live");
  const upcomingProducts = allProducts.filter((p) => p.action === "upcoming");
  const timedProducts = allProducts.filter((p) => p.action === "timed");

  const totalBids = allProducts.reduce((sum, p) => sum + p.bids, 0);
  const totalSpent = allProducts
    .filter((p) => p.action === "timed")
    .reduce((sum, p) => sum + p.highestBid, 0);

  const stats = {
    currentlyBidding: liveProducts.length,
    saved: upcomingProducts.length,
    needsPayment: timedProducts.length,
    spent: totalSpent,
  };

  const inspiredByBids = allProducts
    .filter((p) => p.bids > 0)
    .sort((a, b) => b.bids - a.bids)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.img[0],
      timeLeft: p.time,
      startingPrice: p.starting,
      bids: p.bids,
      highestBid: p.highestBid,
    }));

  const liveAuctionStartingSoon = upcomingProducts.slice(0, 4).map((p) => ({
    id: p.id,
    title: p.title,
    image: p.img[0],
    date: `Starts in ${p.time}`,
  }));

  const recentActivity = [
    {
      id: 1,
      type: "outbid" as const,
      title: `You were outbid on ${liveProducts[0]?.title || "Vintage Rolex"}`,
      detail: `Current bid £${liveProducts[0]?.highestBid?.toLocaleString() || "2,100"}`,
      time: "2 hr ago",
    },
    {
      id: 2,
      type: "won" as const,
      title: `You won ${timedProducts[0]?.title || "Abstract Painting"}`,
      detail: `Final bid £${timedProducts[0]?.highestBid?.toLocaleString() || "2,100"}`,
      time: "2 hr ago",
    },
    {
      id: 3,
      type: "new" as const,
      title: "New item matching your interests",
      detail: upcomingProducts[0]?.title || "Omega Seamaster",
      time: "2 hr ago",
    },
  ];

  return NextResponse.json({
    stats,
    inspiredByBids,
    liveAuctionStartingSoon,
    recentActivity,
  });
}

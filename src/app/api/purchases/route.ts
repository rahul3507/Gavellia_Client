import { NextResponse } from "next/server";
import products from "@/data/products.json";
import { ProductData, PurchaseItem } from "@/types/allTypes";

export async function GET() {
  const allProducts = products as ProductData[];

  const toPay: PurchaseItem[] = allProducts
    .filter((p) => p.action === "timed")
    .slice(0, 5)
    .map((p, i) => ({
      id: i + 1,
      title: p.title,
      lot: `#${p.id}`,
      image: p.img[0],
      myBid: p.highestBid,
      auctionWonDate: "17 Sep, 2025",
      paymentDueDate: "19 Sep, 2025",
      amount: p.highestBid,
      status: "to-pay" as const,
    }));

  const toShip: PurchaseItem[] = allProducts
    .filter((p) => p.action === "live")
    .slice(0, 3)
    .map((p, i) => ({
      id: 100 + i,
      title: p.title,
      lot: `#${p.id}`,
      image: p.img[0],
      myBid: p.highestBid,
      auctionWonDate: "10 Sep, 2025",
      paymentDueDate: "12 Sep, 2025",
      amount: p.highestBid,
      status: "to-ship" as const,
    }));

  const inTransit: PurchaseItem[] = allProducts
    .filter((p) => p.action === "upcoming")
    .slice(0, 4)
    .map((p, i) => ({
      id: 200 + i,
      title: p.title,
      lot: `#${p.id}`,
      image: p.img[0],
      myBid: p.highestBid,
      auctionWonDate: "05 Sep, 2025",
      paymentDueDate: "07 Sep, 2025",
      amount: p.highestBid,
      status: "in-transit" as const,
    }));

  const completed: PurchaseItem[] = allProducts
    .filter((p) => p.bids > 20)
    .slice(0, 6)
    .map((p, i) => ({
      id: 300 + i,
      title: p.title,
      lot: `#${p.id}`,
      image: p.img[0],
      myBid: p.highestBid,
      auctionWonDate: "01 Sep, 2025",
      paymentDueDate: "03 Sep, 2025",
      amount: p.highestBid,
      status: "completed" as const,
    }));

  return NextResponse.json({
    toPay,
    toShip,
    inTransit,
    completed,
    tabCounts: {
      toPay: toPay.length,
      toShip: toShip.length,
      inTransit: inTransit.length,
      completed: completed.length,
    },
  });
}

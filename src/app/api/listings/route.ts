import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";
import { ProductData, Listing, Participant } from "@/types/allTypes";

const unsplashProfiles = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
];

const names = [
  "Guy Hawkins",
  "Eleanor Pena",
  "Robert Fox",
  "Sarah Johnson",
  "Michael Chen",
  "Emma Wilson",
  "James Brown",
  "Olivia Davis",
];

function generateParticipants(count: number): Participant[] {
  return Array.from({ length: count }, (_, i) => ({
    name: names[i % names.length],
    avatar: unsplashProfiles[i % unsplashProfiles.length],
    bid: 8250 - i * 250,
  }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tab = searchParams.get("tab") || "timed";
  const id = searchParams.get("id");

  const allProducts = products as ProductData[];

  if (id) {
    const product = allProducts.find((p) => p.id === id);
    if (!product) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const listing: Listing = {
      id: product.id,
      title: product.title,
      image: product.img[0],
      timeLeft: product.time,
      startingPrice: product.starting,
      bids: product.bids,
      highestBid: product.highestBid,
      status: product.action === "timed" ? "timed" : product.action === "live" ? "live" : "sold",
    };

    const listingDetail = {
      ...listing,
      category: product.category,
      condition: product.condition,
      description: product.description,
      auctionHouse: product.auctionHouse,
      participants: generateParticipants(Math.min(product.bids, 7)),
    };

    return NextResponse.json({ listing: listingDetail });
  }

  const timedListings: Listing[] = allProducts
    .filter((p) => p.action === "timed")
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.img[0],
      timeLeft: p.time,
      startingPrice: p.starting,
      bids: p.bids,
      highestBid: p.highestBid,
      status: "timed" as const,
    }));

  const liveListings: Listing[] = allProducts
    .filter((p) => p.action === "live")
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.img[0],
      timeLeft: p.time,
      startingPrice: p.starting,
      bids: p.bids,
      highestBid: p.highestBid,
      status: "live" as const,
    }));

  const soldListings: Listing[] = allProducts
    .filter((p) => p.bids > 30)
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.img[0],
      timeLeft: p.time,
      startingPrice: p.starting,
      bids: p.bids,
      highestBid: p.highestBid,
      status: "sold" as const,
    }));

  const draftListings: Listing[] = allProducts
    .filter((p) => p.action === "upcoming")
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.img[0],
      timeLeft: p.time,
      startingPrice: p.starting,
      bids: p.bids,
      highestBid: p.highestBid,
      status: "draft" as const,
    }));

  const allListings = [...timedListings, ...liveListings, ...soldListings, ...draftListings];

  const tabData: Record<string, Listing[]> = {
    timed: timedListings,
    live: liveListings,
    sold: soldListings,
    draft: draftListings,
  };

  const filteredListings = tabData[tab] || timedListings;

  return NextResponse.json({
    listings: filteredListings,
    allListings,
    tabCounts: {
      timed: timedListings.length,
      live: liveListings.length,
      sold: soldListings.length,
      draft: draftListings.length,
    },
  });
}

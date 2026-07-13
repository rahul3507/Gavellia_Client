/** @format */

export interface SlideData {
  title: string;
  oldPrice: number;
  price: number;
  planfor: string;
}

export interface ProductData {
  id: string;
  title: string;
  time: string;
  starting: number;
  bids: number;
  highestBid: number;
  img: string[];
  action: "timed" | "upcoming" | "live";
  category: string;
  condition: string;
  location: string;
  auctionHouse: string;
  description: string;
  features: string[];
  color?: string;
  gender?: string;
}

export interface FilterState {
  auctionType: string;
  priceRange: number[];
  location: string;
  categories: string[];
  condition: string[];
  auctionHouses: string[];
  searchQuery: string;
}

export interface ProductsResponse {
  products: ProductData[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  auctionType?: string;
  priceMin?: number;
  priceMax?: number;
  location?: string;
  condition?: string[];
  auctionHouses?: string[];
  search?: string;
  sortBy?: string;
}

// Overview Types
export interface OverviewStats {
  currentlyBidding: number;
  saved: number;
  needsPayment: number;
  spent: number;
}

export interface InspiredByBidProduct {
  id: string;
  title: string;
  image: string;
  timeLeft: string;
  startingPrice: number;
  bids: number;
  highestBid: number;
}

export interface LiveAuctionItem {
  id: string;
  title: string;
  image: string;
  date: string;
}

export interface RecentActivityItem {
  id: number;
  type: "outbid" | "won" | "new";
  title: string;
  detail: string;
  time: string;
}

export interface OverviewResponse {
  stats: OverviewStats;
  inspiredByBids: InspiredByBidProduct[];
  liveAuctionStartingSoon: LiveAuctionItem[];
  recentActivity: RecentActivityItem[];
}

// My Bids Types
export type BidTab = "active" | "won" | "lost";

export interface BidItem {
  id: number;
  title: string;
  lot: string;
  image: string;
  myBid: number;
  isHighest: boolean;
  status: "Winning" | "Outbid" | "Winner" | "Lost";
  time: string;
  finalAmount?: number;
}

export interface MyBidsResponse {
  activeBids: BidItem[];
  wonBids: BidItem[];
  lostBids: BidItem[];
  tabCounts: {
    active: number;
    won: number;
    lost: number;
  };
  totalPages: number;
}

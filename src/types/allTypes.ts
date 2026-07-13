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

// Purchases Types
export type PurchaseTab = "to-pay" | "to-ship" | "in-transit" | "completed";

export interface PurchaseItem {
  id: number;
  title: string;
  lot: string;
  image: string;
  myBid: number;
  auctionWonDate: string;
  paymentDueDate: string;
  amount: number;
  status: PurchaseTab;
}

export interface PurchasesResponse {
  toPay: PurchaseItem[];
  toShip: PurchaseItem[];
  inTransit: PurchaseItem[];
  completed: PurchaseItem[];
  tabCounts: {
    toPay: number;
    toShip: number;
    inTransit: number;
    completed: number;
  };
}

// Listing Management Types
export type ListingTabType = "timed" | "live" | "sold" | "draft";

export interface Listing {
  id: string;
  title: string;
  image: string;
  timeLeft: string;
  startingPrice: number;
  bids: number;
  highestBid: number;
  status: ListingTabType;
}

export interface ListingDetail {
  id: string;
  title: string;
  image: string;
  timeLeft: string;
  startingPrice: number;
  bids: number;
  highestBid: number;
  status: ListingTabType;
  category: string;
  condition: string;
  description: string;
  auctionHouse: string;
  participants: Participant[];
}

export interface Participant {
  name: string;
  avatar: string;
  bid: number;
}

export interface ListingsResponse {
  listings: Listing[];
  tabCounts: {
    timed: number;
    live: number;
    sold: number;
    draft: number;
  };
}

export interface ListingDetailResponse {
  listing: ListingDetail;
}

// Create Lot Types
export interface FileUpload {
  name: string;
  size: number;
  progress: number;
  complete: boolean;
  file?: File;
  previewUrl?: string;
}

export interface Step {
  number: number;
  title: string;
}

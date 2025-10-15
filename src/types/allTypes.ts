/** @format */

export interface SlideData {
  title: string;
  oldPrice: number;
  price: number;
  planfor: string;
}

export interface ProductData {
  title: string;
  time: string;
  starting: number;
  bids: number;
  highestBid: number;
  img: string[];
  action: "timed" | "upcoming" | "live";
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

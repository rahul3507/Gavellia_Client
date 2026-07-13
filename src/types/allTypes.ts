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

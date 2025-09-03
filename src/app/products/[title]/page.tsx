/** @format */
"use client";
import { product } from "@/data/productData";
import { Heart, Package, Truck } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductDetailsProps {
  params: {
    title: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const [selectedBid, setSelectedBid] = useState<string>("");

  // Decode the URL title and find the matching product
  const decodedTitle = decodeURIComponent(params.title);
  const productData = product.find(
    (item) =>
      item.title.toLowerCase().replace(/\s+/g, "-") ===
      decodedTitle.toLowerCase()
  );

  if (!productData) {
    notFound();
  }

  // Generate 5 bid options starting from highest bid + 10, incrementing by 10
  const generateBidOptions = () => {
    const startingBid = productData.highestBid + 10;
    return Array.from({ length: 5 }, (_, index) => startingBid + index * 10);
  };

  const bidOptions = generateBidOptions();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image Carousel */}
        <div className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {productData.img.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${productData.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2 justify-center">
            {productData.img.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-500"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {productData.img.length > 4 && (
              <div className="w-16 h-16 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-sm text-gray-600">
                +{productData.img.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <Package className="w-4 h-4" />
            <span>Fashion</span>
            <span>/</span>
            <span>Jacket</span>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl font-bold text-gray-900 uppercase">
            {productData.title}
          </h1>

          {/* Product Features */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Premium cowhide with natural patina
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Original zippers & quilted lining
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Minimal wear (small scuff on left sleeve)
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Size 42 (fits 40-44 chest)
            </div>
          </div>

          {/* Product Info Tags */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Used Condition</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-black rounded-full"></div>
              <span className="text-sm text-gray-600">Black Color</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Ship from USA</span>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center text-lg font-semibold text-red-600">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            {productData.time} left
          </div>

          {/* Bid Information */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
            <div>
              <span className="text-sm text-gray-500 block">Starting</span>
              <span className="text-lg font-semibold">
                £{productData.starting}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block">Bids</span>
              <span className="text-lg font-semibold">
                {productData.bids} bidder
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block">Highest bid</span>
              <span className="text-lg font-semibold">
                £{productData.highestBid}
              </span>
            </div>
          </div>

          {/* Bidding Section */}
          <div className="space-y-4">
            <div className="flex space-x-3">
              <Select value={selectedBid} onValueChange={setSelectedBid}>
                <SelectTrigger className="flex-1 h-12">
                  <SelectValue placeholder="£ Enter Amount" />
                </SelectTrigger>
                <SelectContent>
                  {bidOptions.map((bidAmount) => (
                    <SelectItem key={bidAmount} value={bidAmount.toString()}>
                      £{bidAmount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-black hover:bg-gray-800 text-white h-12 px-8">
                REQUEST TO BID
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
            >
              <Heart className="w-4 h-4 mr-2" />
              Add to Watchlist
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              This exceptional vintage leather motorcycle jacket from the 1980s
              showcases premium black cowhide with a beautifully developed
              natural patina. The jacket retains all its original hardware,
              including heavy-duty zippers and snaps, with the distinctive
              quilted lining intact. Measuring a true size 42 (fitting chest
              sizes 40-44), it displays only minor wear - just a small scuff on
              the left sleeve that adds character. Currently at £
              {productData.highestBid} with {productData.bids} bids placed, this
              auction ends in just {productData.time} from the starting bid of £
              {productData.starting}. Originally worn fewer than 10 times and
              carefully stored in climate-controlled conditions, this
              collector-quality piece comes with authenticity verification.
              Perfect for vintage fashion enthusiasts or motorcycle collectors
              seeking genuine 1980s style, this jacket offers worldwide shipping
              at £15 within the UK or £35 internationally. Don&apos;t miss this
              rare opportunity to own a perfectly preserved piece of biker
              heritage.
            </p>
          </div>

          {/* Auction House Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                <span className="font-bold text-sm">KH</span>
              </div>
              <div>
                <h4 className="font-semibold">Kubli Haus</h4>
                <p className="text-sm text-gray-600">
                  New York, NY, United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

/** @format */
"use client";
import { product } from "@/data/productData";
import { Check, Eye, Package, Plane, Tag } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
interface ProductDetailsProps {
  params: Promise<{
    title: string;
  }>;
}
const ProductLive: React.FC<ProductDetailsProps> = ({ params }) => {
  const resolvedParams = use(params);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  // Decode the URL title and find the matching product
  const decodedTitle = decodeURIComponent(resolvedParams.title);
  const productData = product.find(
    (item) =>
      item.title.toLowerCase().replace(/\s+/g, "-") ===
      decodedTitle.toLowerCase()
  );

  if (!productData) {
    notFound();
  }

  // Track carousel changes
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // Generate 5 bid options starting from highest bid + 10, incrementing by 10

  const totalImages = productData.img.length;
  return (
    <div className="px-2 md:px-4 max-h-[90vh] flex flex-col justify-center">
      <div className="py-2 md:py-4  w-full max-w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 w-full min-w-0">
          {/* Left Column - live streaming */}
          <div className="col-span-1 lg:col-span-2 2xl:col-span-3 border-2">
            <video
              src="/videoplayback.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Column - Product Details */}
          <div className="col-span-1 lg:col-span-1 2xl:col-span-1 w-full min-w-0 max-w-full">
            <ScrollArea className="h-[88vh] pr-4 w-full">
              <div className="space-y-4 mb-4 w-full max-w-full overflow-hidden">
                <div className="relative w-full">
                  <Carousel
                    className="w-full bg-card-bg max-w-full"
                    setApi={setApi}
                  >
                    <CarouselContent>
                      {productData.img.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative h-96 w-full rounded-lg overflow-hidden justify-center items-center flex">
                            <Image
                              src={image}
                              alt={`${productData.title} - Image ${index + 1}`}
                              loading="lazy"
                              width={400}
                              height={400}
                              className="object-cover p-6 sm:p-8 max-w-full max-h-full"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {/* Custom positioned navigation buttons and counter */}
                    <div className="absolute  bottom-6  left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                      <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
                      <div className="flex items-center space-x-1">
                        <span className="text-black text-sm font-medium bg-white/90 px-3 py-1 rounded-full shadow-sm">
                          {currentSlide + 1}/{totalImages}
                        </span>
                      </div>
                      <CarouselNext className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 mt-7 h-0.5 bg-gray-300">
                      {/* Individual segments for each image */}
                      <div className="flex h-full">
                        {Array.from({ length: totalImages }).map((_, index) => (
                          <div
                            key={index}
                            className={`flex-1 h-full transition-all duration-300 ease-in-out ${
                              index <= currentSlide
                                ? "bg-black"
                                : "bg-transparent"
                            }`}
                            style={{
                              marginRight:
                                index < totalImages - 1 ? "1px" : "0",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Carousel>

                  {/* Progress line with segments - constrained width */}
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 justify-center ">
                  {productData.img.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                        currentSlide === index
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-blue-500"
                      }`}
                      onClick={() => {
                        if (api) {
                          api.scrollTo(index);
                        }
                      }}
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

              <div className="space-y-4 w-full max-w-full overflow-hidden">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-primary/50 space-x-2 w-full min-w-0">
                  <Package className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Fashion</span>
                  <span>/</span>
                  <span className="truncate">Jacket</span>
                </div>

                {/* Product Title */}
                <h1 className="text-lg md:text-xl font-bold text-primary uppercase w-full break-words">
                  {productData.title}
                </h1>

                {/* Product Features */}
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-primary/50">
                    <Check className="w-4 h-4  mr-2" />
                    Premium cowhide with natural patina
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary/50">
                    <Check className="w-4 h-4  mr-2" />
                    Original zippers & quilted lining
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary/50">
                    <Check className="w-4 h-4  mr-2" />
                    Minimal wear (small scuff on left sleeve)
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary/50">
                    <Check className="w-4 h-4  mr-2" />
                    Size 42 (fits 40-44 chest)
                  </div>
                </div>

                {/* Product Info Tags */}
                <div className="grid grid-cols-3 gap-0 w-full min-w-0">
                  <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 justify-center items-start min-w-0">
                    <Tag className="w-4 h-4" />
                    <span className="text-xs truncate w-full">
                      Used Condition
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 border-l-2 border-r-2 justify-center items-start min-w-0">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs truncate w-full">Black Color</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 justify-center items-start min-w-0">
                    <Plane className="w-4 h-4" />
                    <span className="text-xs truncate w-full">
                      Ship from USA
                    </span>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center text-xs md:text-sm font-semibold text-primary/50">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  {productData.time} left
                </div>

                {/* Bid Information */}
                <div className="flex gap-4 w-full min-w-0 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary/50 block">
                      Starting
                    </span>
                    <span className="text-sm font-medium text-primary truncate block">
                      £{productData.starting}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary/50 block">Bids</span>
                    <span className="text-sm font-medium text-primary truncate block">
                      {productData.bids} bidder
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary/50 block">
                      Highest bid
                    </span>
                    <span className="text-sm font-medium text-primary truncate block">
                      £{productData.highestBid}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3 w-full max-w-full overflow-hidden">
                  <h3 className="text-sm md:text-lg font-medium text-primary">
                    Description
                  </h3>
                  <p className="text-primary/50 text-xs md:text-sm leading-relaxed break-words">
                    This exceptional vintage leather motorcycle jacket from the
                    1980s showcases premium black cowhide with a beautifully
                    developed natural patina. The jacket retains all its
                    original hardware, including heavy-duty zippers and snaps,
                    with the distinctive quilted lining intact. Measuring a true
                    size 42 (fitting chest sizes 40-44), it displays only minor
                    wear - just a small scuff on the left sleeve that adds
                    character. Currently at £{productData.highestBid} with{" "}
                    {productData.bids} bids placed, this auction ends in just{" "}
                    {productData.time} from the starting bid of £
                    {productData.starting}. Originally worn fewer than 10 times
                    and carefully stored in climate-controlled conditions, this
                    collector-quality piece comes with authenticity
                    verification. Perfect for vintage fashion enthusiasts or
                    motorcycle collectors seeking genuine 1980s style, this
                    jacket offers worldwide shipping at £15 within the UK or £35
                    internationally. Don&apos;t miss this rare opportunity to
                    own a perfectly preserved piece of biker heritage.
                  </p>
                </div>

                {/* Auction House Info */}
                <div className="w-full max-w-full overflow-hidden">
                  <div className="flex items-center space-x-3 w-full min-w-0">
                    <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border flex-shrink-0">
                      <Image
                        src="/playstore.png"
                        alt="Kubli Haus"
                        width={48}
                        height={48}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-lg text-primary truncate">
                        Kubli Haus
                      </h4>
                      <p className="text-sm text-primary/50 truncate">
                        New York, NY, United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLive;

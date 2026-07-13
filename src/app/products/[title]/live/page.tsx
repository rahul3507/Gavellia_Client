/** @format */
"use client";
import { Check, Eye, Package, Plane, Tag } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import BidSheet from "@/components/ProductsComponents/bidSheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/feature/productsSlice";

interface ProductDetailsProps {
  params: Promise<{
    title: string;
  }>;
}

const ProductLive: React.FC<ProductDetailsProps> = ({ params }) => {
  const resolvedParams = use(params);
  const dispatch = useAppDispatch();
  const { selectedProduct: productData, productLoading } = useAppSelector(
    (state) => state.products
  );

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  const decodedTitle = decodeURIComponent(resolvedParams.title);

  useEffect(() => {
    dispatch(fetchProductById(decodedTitle));
  }, [dispatch, decodedTitle]);

  useEffect(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  if (productLoading) {
    return (
      <div className="px-2 md:px-4 max-h-[90vh] flex flex-col justify-center items-center">
        <div className="animate-pulse space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-200 h-96 rounded" />
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded w-3/4" />
              <div className="bg-gray-200 h-4 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return null;
  }

  const totalImages = productData.img.length;

  const conditionLabel = (c: string) => {
    switch (c) {
      case "new": return "New Condition";
      case "used": return "Used Condition";
      case "restored": return "Restored Condition";
      case "forparts": return "For Parts";
      default: return c;
    }
  };

  const locationLabel = (l: string) => {
    switch (l) {
      case "usa": return "Ship from USA";
      case "uk": return "Ship from UK";
      case "europe": return "Ship from Europe";
      default: return l;
    }
  };

  return (
    <div className="px-2 md:px-4 max-h-[90vh] flex flex-col justify-center">
      <div className="py-2 md:py-4 w-full max-w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 w-full min-w-0">
          {/* Left Column - live streaming */}
          <div className="col-span-1 lg:col-span-2 2xl:col-span-3 border-2">
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Column - Product Details */}
          <div className="col-span-1 lg:col-span-1 2xl:col-span-1 w-full min-w-0 max-w-full">
            <ScrollArea className="h-[88vh] pr-4 w-full">
              <div className="space-y-4 mb-4 w-full max-w-full overflow-hidden">
                <div className="relative w-full">
                  <Carousel className="w-full bg-card-bg max-w-full" setApi={setApi}>
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

                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                      <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
                      <div className="flex items-center space-x-1">
                        <span className="text-black text-sm font-medium bg-white/90 px-3 py-1 rounded-full shadow-sm">
                          {currentSlide + 1}/{totalImages}
                        </span>
                      </div>
                      <CarouselNext className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 mt-7 h-0.5 bg-gray-300">
                      <div className="flex h-full">
                        {Array.from({ length: totalImages }).map((_, index) => (
                          <div
                            key={index}
                            className={`flex-1 h-full transition-all duration-300 ease-in-out ${
                              index <= currentSlide ? "bg-black" : "bg-transparent"
                            }`}
                            style={{
                              marginRight: index < totalImages - 1 ? "1px" : "0",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Carousel>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 justify-center">
                  {productData.img.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                        currentSlide === index
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-blue-500"
                      }`}
                      onClick={() => {
                        if (api) api.scrollTo(index);
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
                  <span className="truncate">{productData.category}</span>
                  <span>/</span>
                  <span className="truncate">{productData.title.split(" ")[0]}</span>
                </div>

                {/* Product Title */}
                <h1 className="text-lg md:text-xl font-bold text-primary uppercase w-full break-words">
                  {productData.title}
                </h1>

                {/* Product Features */}
                <div className="space-y-2">
                  {productData.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-xs md:text-sm text-primary/50">
                      <Check className="w-4 h-4 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Product Info Tags */}
                <div className="grid grid-cols-3 gap-0 w-full min-w-0">
                  <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 justify-center items-start min-w-0">
                    <Tag className="w-4 h-4" />
                    <span className="text-xs truncate w-full">{conditionLabel(productData.condition)}</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 border-l-2 border-r-2 justify-center items-start min-w-0">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs truncate w-full">{productData.color || "Multi"}</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 justify-center items-start min-w-0">
                    <Plane className="w-4 h-4" />
                    <span className="text-xs truncate w-full">{locationLabel(productData.location)}</span>
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
                    <span className="text-xs text-primary/50 block">Starting</span>
                    <span className="text-sm font-medium text-primary truncate block">
                      £{productData.starting.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary/50 block">Bids</span>
                    <span className="text-sm font-medium text-primary truncate block">
                      {productData.bids} bidder{productData.bids !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary/50 block">Highest bid</span>
                    <span className="text-sm font-medium text-primary truncate block">
                      £{productData.highestBid.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3 w-full max-w-full overflow-hidden">
                  <h3 className="text-sm md:text-lg font-medium text-primary">Description</h3>
                  <p className="text-primary/50 text-xs md:text-sm leading-relaxed break-words">
                    {productData.description}
                  </p>
                </div>

                {/* Auction House Info */}
                <div className="w-full max-w-full overflow-hidden">
                  <div className="flex items-center space-x-3 w-full min-w-0">
                    <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border flex-shrink-0">
                      <Image
                        src="/playstore.png"
                        alt={productData.auctionHouse}
                        width={48}
                        height={48}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-lg text-primary truncate">
                        {productData.auctionHouse}
                      </h4>
                      <p className="text-sm text-primary/50 truncate">
                        {productData.location === "usa"
                          ? "New York, NY, United States"
                          : productData.location === "uk"
                          ? "London, United Kingdom"
                          : "Paris, France"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-full overflow-hidden mt-8 space-y-3 mb-12">
                  <div className="w-full flex justify-between border-b border-gray-200 pb-4">
                    <div className="text-xs">Lot 1/14</div>
                    <div className="text-green-600 font-semibold text-xs">IN PROGRESS</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="text-gray-600 text-xs">Current Bid</div>
                    <div className="text-gray-900 text-base">0 Bids</div>
                  </div>

                  <div className="text-3xl font-semibold text-gray-800">N/A</div>

                  <div className="text-gray-600 mt-4 text-base">The bid is not yours</div>
                  <div className="flex space-x-4 mt-4">
                    <BidSheet
                      bidAmount={300}
                      onConfirm={() => console.log("Bid confirmed for £300")}
                      onCancel={() => console.log("Bid cancelled")}
                    >
                      <Button className="bg-black text-white px-6 py-2 rounded-none flex-1">
                        BID £300
                      </Button>
                    </BidSheet>
                    <Button className="bg-gray-200 text-black px-6 py-2 rounded-none flex-1">
                      SWITCH TO NEXT BID
                    </Button>
                  </div>
                  <div className="text-gray-600 text-sm mt-2">All bids are binding.</div>
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

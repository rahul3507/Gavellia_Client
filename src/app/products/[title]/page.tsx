/** @format */
"use client";
import { ArrowRight, Check, Eye, Package, Plane, Tag } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, use } from "react";
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
import { type CarouselApi } from "@/components/ui/carousel";
import ProductCard from "@/components/common/ProductCard";
import ParticipateModal from "@/components/ProductsComponents/perticipateModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/feature/productsSlice";

interface ProductDetailsProps {
  params: Promise<{
    title: string;
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const resolvedParams = use(params);
  const dispatch = useAppDispatch();
  const { selectedProduct: productData, relatedProducts, productLoading } =
    useAppSelector((state) => state.products);

  const [selectedBid, setSelectedBid] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false);

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
      <div className="w-full flex flex-col justify-center items-center py-20">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg" />
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded w-3/4" />
              <div className="bg-gray-200 h-4 rounded w-1/2" />
              <div className="bg-gray-200 h-4 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return null;
  }

  const generateBidOptions = () => {
    const startingBid = productData.highestBid + 10;
    return Array.from({ length: 5 }, (_, index) => startingBid + index * 10);
  };

  const bidOptions = generateBidOptions();
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
    <div className="w-full flex flex-col justify-center">
      <div className="py-2 md:py-4 m-10 md:m-0 md:mr-24 lg:mr-28 xl:mr-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Left Column - Image Carousel */}
          <div className="space-y-4">
            <div className="relative">
              <Carousel className="w-full bg-card-bg" setApi={setApi}>
                <CarouselContent>
                  {productData.img.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square rounded-lg overflow-hidden justify-center items-center flex">
                        <Image
                          src={image}
                          alt={`${productData.title} - Image ${index + 1}`}
                          loading="lazy"
                          width={600}
                          height={600}
                          className="object-cover p-12 sm:p-18"
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

          {/* Right Column - Product Details */}
          <div className="space-y-4 md:space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-primary/50 space-x-2">
              <Package className="w-4 h-4" />
              <span>{productData.category}</span>
              <span>/</span>
              <span>{productData.title.split(" ")[0]}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-xl md:text-3xl xl:text-4xl font-bold text-primary uppercase">
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
            <div className="grid grid-cols-3">
              <div className="flex flex-col space-y-2 text-primary bg-card-bg p-2 md:p-5 justify-center items-start">
                <Tag className="w-4 h-4" />
                <span className="text-xs md:text-sm">{conditionLabel(productData.condition)}</span>
              </div>
              <div className="flex flex-col space-y-2 text-primary bg-card-bg p-2 md:p-5 border-l-2 border-r-2 justify-center items-start">
                <Eye className="w-4 h-4" />
                <span className="text-xs md:text-sm">{productData.color || "Multi"}</span>
              </div>
              <div className="flex flex-col space-y-2 text-primary bg-card-bg p-2 md:p-5 justify-center items-start">
                <Plane className="w-4 h-4" />
                <span className="text-xs md:text-sm">{locationLabel(productData.location)}</span>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center text-xs md:text-sm font-semibold text-primary/50">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              {productData.time} left
            </div>

            {/* Bid Information */}
            <div className="flex gap-6">
              <div>
                <span className="text-xs md:text-sm text-primary/50 block">Starting</span>
                <span className="text-sm md:text-base font-medium text-primary">
                  £{productData.starting.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs md:text-sm text-primary/50 block">Bids</span>
                <span className="text-sm md:text-base font-medium text-primary">
                  {productData.bids} bidder{productData.bids !== 1 ? "s" : ""}
                </span>
              </div>
              <div>
                <span className="text-xs md:text-sm text-primary/50 block">Highest bid</span>
                <span className="text-sm md:text-base font-medium text-primary">
                  £{productData.highestBid.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Bidding Section */}
            <div className="pb-5 border-b">
              {productData.action === "timed" ? (
                <div className="flex space-x-3">
                  <Select value={selectedBid} onValueChange={setSelectedBid}>
                    <SelectTrigger className="flex-1 h-12 cursor-pointer">
                      <SelectValue placeholder="£ Enter Amount" />
                    </SelectTrigger>
                    <SelectContent>
                      {bidOptions.map((bidAmount) => (
                        <SelectItem
                          key={bidAmount}
                          value={bidAmount.toString()}
                          className="cursor-pointer"
                        >
                          £{bidAmount.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="bg-primary hover:bg-primary/90 rounded-none text-white px-8">
                    REQUEST TO BID
                  </Button>
                </div>
              ) : (
                <div className="flex w-full">
                  <Button
                    className={`w-full text-white text-center py-5 rounded-none ${
                      productData.action === "upcoming"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-black/90"
                    }`}
                    disabled={productData.action === "upcoming"}
                    onClick={() => {
                      if (productData.action === "live") {
                        setIsParticipateModalOpen(true);
                      }
                    }}
                  >
                    {productData.action === "upcoming"
                      ? "Auction Starting Soon"
                      : "Join the LIVE streaming auction"}{" "}
                    <ArrowRight />
                  </Button>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm md:text-lg font-medium text-primary">Description</h3>
              <p className="text-primary/50 text-xs md:text-sm leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Auction House Info */}
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border">
                  <Image
                    src="/playstore.png"
                    alt={productData.auctionHouse}
                    width={48}
                    height={48}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-xl text-primary">
                    {productData.auctionHouse}
                  </h4>
                  <p className="text-sm text-primary/50">
                    {productData.location === "usa"
                      ? "New York, NY, United States"
                      : productData.location === "uk"
                      ? "London, United Kingdom"
                      : "Paris, France"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Be Interested Section */}
      <div className="mt-0 md:mt-8 px-4 md:px-8 lg:px-12">
        <h2 className="text-sm text-primary mb-2">You Might Interest</h2>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 mb-12">
              {relatedProducts.map((productItem, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <ProductCard productData={productItem} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute mr-[-32px] bottom-3 right-0 transform -translate-x-1/2 flex items-center space-x-4">
              <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
              <CarouselNext className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
            </div>
          </Carousel>
        </div>
      </div>

      <ParticipateModal
        open={isParticipateModalOpen}
        onOpenChange={setIsParticipateModalOpen}
        productTitle={productData.title}
      />
    </div>
  );
};

export default ProductDetails;

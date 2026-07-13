"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

interface LiveProductCarouselProps {
  images: string[];
  title: string;
}

const LiveProductCarousel = ({ images, title }: LiveProductCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const totalImages = images.length;

  React.useEffect(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      <div className="relative w-full">
        <Carousel className="w-full bg-card-bg max-w-full" setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-96 w-full rounded-lg overflow-hidden justify-center items-center flex">
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
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
        {images.slice(0, 4).map((image, index) => (
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
        {images.length > 4 && (
          <div className="w-16 h-16 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-sm text-gray-600">
            +{images.length - 4}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveProductCarousel;

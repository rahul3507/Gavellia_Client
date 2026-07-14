"use client";

import React, { useEffect, use } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/feature/productsSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import LiveStream from "./LiveStream";
import LiveProductCarousel from "./LiveProductCarousel";
import LiveProductInfo from "./LiveProductInfo";
import LiveBidSection from "./LiveBidSection";

interface ProductDetailsLivePageProps {
  params: Promise<{
    title: string;
  }>;
}

const ProductDetailsLivePage: React.FC<ProductDetailsLivePageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const dispatch = useAppDispatch();
  const { selectedProduct: productData, productLoading } = useAppSelector(
    (state) => state.products
  );

  const decodedTitle = decodeURIComponent(resolvedParams.title);

  useEffect(() => {
    dispatch(fetchProductById(decodedTitle));
  }, [dispatch, decodedTitle]);

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
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-[70vh] px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Product Not Found</h1>
          <p className="text-gray-500 text-sm max-w-md">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary text-white px-6 py-2 rounded-none text-sm hover:bg-primary/90 transition-colors"
          >
            BROWSE PRODUCTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-4 max-h-[90vh] flex flex-col justify-center">
      <div className="py-2 md:py-4 w-full max-w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 w-full min-w-0">
          <LiveStream />

          <div className="col-span-1 lg:col-span-1 2xl:col-span-1 w-full min-w-0 max-w-full">
            <ScrollArea className="h-[88vh] pr-4 w-full">
              <LiveProductCarousel
                images={productData.img}
                title={productData.title}
              />

              <LiveProductInfo product={productData} />

              <LiveBidSection />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLivePage;

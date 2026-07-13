"use client";

import React, { useState, useEffect, use } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductById } from "@/redux/feature/productsSlice";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInfo from "./ProductInfo";
import BidSection from "./BidSection";
import ProductDescription from "./ProductDescription";
import RelatedProducts from "./RelatedProducts";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import ParticipateModal from "@/components/ProductsPageComponents/perticipateModal";
import { type CarouselApi } from "@/components/ui/carousel";

interface ProductDetailsProps {
  params: Promise<{
    title: string;
  }>;
}

const ProductDetailsPage: React.FC<ProductDetailsProps> = ({ params }) => {
  const resolvedParams = use(params);
  const dispatch = useAppDispatch();
  const { selectedProduct: productData, relatedProducts, productLoading } =
    useAppSelector((state) => state.products);

  const [api, setApi] = useState<CarouselApi>();
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false);

  const decodedTitle = decodeURIComponent(resolvedParams.title);

  useEffect(() => {
    dispatch(fetchProductById(decodedTitle));
  }, [dispatch, decodedTitle]);

  if (productLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!productData) {
    return null;
  }

  return (
    <div className="w-full flex flex-col justify-center min-h-[90vh]">
      <div className="py-2 md:py-4 m-10 md:m-0 md:mr-24 lg:mr-28 xl:mr-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Left Column - Image Carousel */}
          <ProductImageCarousel
            images={productData.img}
            title={productData.title}
            api={api}
            setApi={setApi}
          />

          {/* Right Column - Product Details */}
          <div className="space-y-4 md:space-y-6">
            <ProductInfo
              category={productData.category}
              title={productData.title}
              features={productData.features}
              condition={productData.condition}
              color={productData.color ?? ""}
              location={productData.location}
            />

            <BidSection
              product={productData}
              onOpenModal={() => setIsParticipateModalOpen(true)}
            />

            <ProductDescription
              description={productData.description}
              auctionHouse={productData.auctionHouse}
              location={productData.location}
            />
          </div>
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />

      <ParticipateModal
        open={isParticipateModalOpen}
        onOpenChange={setIsParticipateModalOpen}
        productTitle={productData.title}
      />
    </div>
  );
};

export default ProductDetailsPage;

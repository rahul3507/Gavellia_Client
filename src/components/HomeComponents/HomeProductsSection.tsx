import React, { Suspense, useEffect } from 'react'
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProducts } from '@/redux/feature/productsSlice';
import ProductCard from '../common/ProductCard';

const ProductsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-gray-200 h-[300px] rounded" />
        <div className="p-4 space-y-2">
          <div className="bg-gray-200 h-4 rounded w-3/4" />
          <div className="bg-gray-200 h-3 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const ProductsContent = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 5 }));
  }, [dispatch]);

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
      {products.slice(0, 5).map((productItem, index) => {
        let visibilityClass = "";

        if (index === 0) {
          visibilityClass = "";
        } else if (index === 1) {
          visibilityClass = "hidden sm:block";
        } else if (index === 2) {
          visibilityClass = "hidden md:block";
        } else if (index === 3) {
          visibilityClass = "hidden xl:block";
        } else if (index === 4) {
          visibilityClass = "hidden 2xl:block";
        }

        return (
          <ProductCard
            key={productItem.id}
            productData={productItem}
            className={visibilityClass}
          />
        );
      })}
    </div>
  );
};

const HomeProductsSection = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <Link
          href="/products"
          className="text-primary hover:text-primary/70 text-xs md:text-sm underline cursor-pointer "
        >
          SHOW ALL
        </Link>
      </div>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsContent />
      </Suspense>
    </div>
  )
}

export default HomeProductsSection

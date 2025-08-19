"use client";

import { useEffect, useState } from "react";
import { PRODUCTS_KEY, readLocalStorage, LocalStorageProduct } from "@/lib/storage";
import ProductDetail from "./ProductDetail";
import { ProductCardSkeleton } from "@/components/custom-components/loading-skeleton";

interface ProductPageClientProps {
  productId: number;
}

export default function ProductPageClient({ productId }: ProductPageClientProps) {
  const [product, setProduct] = useState<LocalStorageProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const products = readLocalStorage<LocalStorageProduct[]>(PRODUCTS_KEY, []);
    const foundProduct = products.find((p) => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            <div>
              <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductCardSkeleton />
          <div className="space-y-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-muted-foreground text-2xl">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <a 
            href="/products" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}

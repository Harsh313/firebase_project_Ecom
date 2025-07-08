'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Loader2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Product } from '@/lib/types';

const VIEWED_PRODUCTS_STORAGE_KEY = 'chich-threads-viewed-products';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart, loading: isCartLoading } = useCart();

  useEffect(() => {
    if (product) {
      try {
        const viewedProductsRaw = localStorage.getItem(VIEWED_PRODUCTS_STORAGE_KEY);
        const viewedProducts: string[] = viewedProductsRaw ? JSON.parse(viewedProductsRaw) : [];
        
        const updatedViewed = new Set([product.name, ...viewedProducts]);
        
        localStorage.setItem(VIEWED_PRODUCTS_STORAGE_KEY, JSON.stringify(Array.from(updatedViewed).slice(0, 10)));
      } catch (error) {
        console.error("Failed to update viewed products in localStorage", error);
      }
    }
  }, [product]);

  const handleAddToCart = async () => {
    await addToCart(product);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={src}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint="clothing fashion"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mt-2">₹{product.price.toFixed(2)}</p>
          <Separator className="my-6" />
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          <Button onClick={handleAddToCart} size="lg" className="mt-8 w-full md:w-auto" disabled={isCartLoading}>
            {isCartLoading ? <Loader2 className="mr-2 animate-spin" /> : <ShoppingCart className="mr-2" />}
            Add to Cart
          </Button>

          <div className="mt-10">
            <h2 className="text-2xl font-bold font-headline mb-4">Reviews</h2>
            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <p className="ml-2 font-semibold">{review.author}</p>
                  </div>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                </div>
              ))) : (
                <p className='text-muted-foreground'>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

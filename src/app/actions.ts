'use server';

import { recommendProduct } from '@/ai/flows/product-recommendation';
import type { RecommendProductOutput } from '@/ai/flows/product-recommendation';
import { addProduct as addProductToDb } from '@/lib/products';
import type { Product } from '@/lib/types';

export async function getProductRecommendation( 
  { browsingHistory }: { browsingHistory: string }
): Promise<RecommendProductOutput> {
  try {
    const recommendation = await recommendProduct({ browsingHistory });
    return recommendation;
  } catch (error) {
    console.error("Error getting product recommendation:", error);
    throw new Error("Failed to get product recommendation.");
  }
}

export async function addProduct(
  productData: Omit<Product, 'id' | 'reviews'>
): Promise<{ success: boolean; productId?: string; error?: string }> {
  try {
    const productId = await addProductToDb(productData);
    return { success: true, productId };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, error: "Failed to add product." };
  }
}

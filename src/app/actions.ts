'use server';

import { recommendProduct } from '@/ai/flows/product-recommendation';
import type { RecommendProductOutput } from '@/ai/flows/product-recommendation';

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

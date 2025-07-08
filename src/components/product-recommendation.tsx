'use client';

import { useState } from 'react';
import { getProductRecommendation } from '@/app/actions';
import type { RecommendProductOutput } from '@/ai/flows/product-recommendation';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VIEWED_PRODUCTS_STORAGE_KEY = 'chich-threads-viewed-products';

export default function ProductRecommendation() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendProductOutput | null>(null);
  const { toast } = useToast();

  const handleSuggestClick = async () => {
    setIsLoading(true);
    try {
      const viewedProductsRaw = localStorage.getItem(VIEWED_PRODUCTS_STORAGE_KEY);
      const viewedProducts = viewedProductsRaw ? JSON.parse(viewedProductsRaw) : [];
      
      if (viewedProducts.length === 0) {
        toast({
            variant: "destructive",
            title: "Not enough history",
            description: "Please browse some products first to get a recommendation.",
        });
        setIsLoading(false);
        return;
      }
      
      const browsingHistory = viewedProducts.join(', ');
      const result = await getProductRecommendation({ browsingHistory });
      setRecommendation(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "We couldn't generate a recommendation. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleSuggestClick} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Get AI Suggestion
      </Button>

      <AlertDialog open={!!recommendation} onOpenChange={() => setRecommendation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Our Recommendation For You!</AlertDialogTitle>
            <AlertDialogDescription>
                Based on your browsing history, we think you'll love this:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <h3 className="font-bold text-lg text-primary">{recommendation?.productName}</h3>
            <p className="text-muted-foreground mt-2">{recommendation?.reason}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setRecommendation(null)}>Got it, thanks!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

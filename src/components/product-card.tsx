import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] w-full overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={800}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="clothing fashion"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
          <CardDescription className="mt-1 text-sm h-10 overflow-hidden">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-base font-bold text-primary">₹{product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

import { getProducts } from '@/lib/products';
import ProductCard from '@/components/product-card';
import ProductRecommendation from '@/components/product-recommendation';

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          New Arrivals
        </h1>
        <ProductRecommendation />
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">Please check your Firebase setup and ensure you have items in the 'products' collection.</p>
        </div>
      )}
    </div>
  );
}

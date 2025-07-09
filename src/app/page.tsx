import { getProducts } from '@/lib/products';
import ProductCard from '@/components/product-card';
import Hero from '@/components/hero';

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            New Arrivals
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Check out the latest additions to our collection. Fresh styles are waiting for you.
          </p>
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
            <p className="text-muted-foreground">Please check back later or add your own products!</p>
          </div>
        )}
      </div>
    </>
  );
}

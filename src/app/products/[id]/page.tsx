import { getProductById } from '@/lib/products';
import ProductDetailClient from '@/components/product-detail-client';

type ProductDetailPageProps = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}

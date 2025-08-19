import ProductPageClient from "@/app/products/[id]/ProductPageClient";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductPageClient productId={parseInt(id)} />;
}

import Layout from "@/components/layout";
import { extractCategorySummaries, fetchProductsFromApi } from "@/lib/api";
import ProductClient from "./ProductClient";

export default async function ProductsPage() {
  const products = await fetchProductsFromApi();
  const categories = extractCategorySummaries(products).sort((a, b) => a.name.localeCompare(b.name));

  // Map fakestore fields to our local storage product shape
  const initialProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.image,
    thumbnail: p.image,
    stock: p.rating?.count ?? 0,
    rating: p.rating?.rate ?? 0,
  }));

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <ProductClient initialProducts={initialProducts} initialCategories={categories} />
        </div>
      </div>
    </Layout>
  );
}

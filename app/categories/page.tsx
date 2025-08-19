import Layout from "@/components/layout";
import { extractCategorySummaries, fetchProductsFromApi } from "@/lib/api";
import CategoryClient from "./CategoryClient";

export default async function CategoriesPage() {
  const products = await fetchProductsFromApi();
  const categories = extractCategorySummaries(products).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <CategoryClient initialCategories={categories} />
        </div>
      </div>
    </Layout>
  );
}

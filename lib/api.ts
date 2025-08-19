export type FakestoreProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export type CategorySummary = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  productCount: number;
};

export async function fetchProductsFromApi(): Promise<FakestoreProduct[]> {
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
    // next: { revalidate: 0 }, // explicit no revalidation
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data = (await response.json()) as FakestoreProduct[];
  return Array.isArray(data) ? data : [];
}

export async function fetchCategoriesFromApi(): Promise<string[]> {
  const response = await fetch("https://fakestoreapi.com/products/categories", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  const data = (await response.json()) as string[];
  return Array.isArray(data) ? data : [];
}

export function extractCategorySummaries(products: FakestoreProduct[]): CategorySummary[] {
  const nameToCount = new Map<string, number>();
  for (const product of products) {
    const name = product.category ?? "uncategorized";
    nameToCount.set(name, (nameToCount.get(name) ?? 0) + 1);
  }

  const now = new Date().toISOString();
  return Array.from(nameToCount.entries()).map(([name, count]) => ({
    id: name,
    name,
    description: `${name} category`,
    createdAt: now,
    productCount: count,
  }));
}



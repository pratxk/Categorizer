export type LocalStorageProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images?: string[];
  thumbnail?: string;
  stock?: number;
  rating?: number;
  image?: string; // compatibility with fakestore shape
  isLocal?: boolean; // mark items created locally
};

export type LocalStorageCategory = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  productCount: number;
  isLocal?: boolean;
};

// Keys
export const PRODUCTS_KEY = "products";
export const CATEGORIES_KEY = "categories";

export function readLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeLocalStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function mergeProducts(existing: LocalStorageProduct[], incoming: LocalStorageProduct[]): LocalStorageProduct[] {
  const idToProduct = new Map<number, LocalStorageProduct>();
  for (const p of existing) idToProduct.set(p.id, p);
  for (const p of incoming) {
    const previous = idToProduct.get(p.id);
    idToProduct.set(p.id, { ...p, ...previous }); // keep local overrides (like isLocal) while updating fields
  }
  return Array.from(idToProduct.values());
}

export function mergeCategories(existing: LocalStorageCategory[], incoming: LocalStorageCategory[]): LocalStorageCategory[] {
  const idToCategory = new Map<string, LocalStorageCategory>();
  for (const c of existing) idToCategory.set(c.id, c);
  for (const c of incoming) {
    const previous = idToCategory.get(c.id);
    idToCategory.set(c.id, { ...c, ...previous });
  }
  return Array.from(idToCategory.values());
}



"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES_KEY, LocalStorageCategory, LocalStorageProduct, PRODUCTS_KEY, mergeCategories, mergeProducts, readLocalStorage, writeLocalStorage } from "@/lib/storage";
import ProductForm from "@/components/custom-components/product-form";
import { ProductFormData } from "@/lib/validation";
import { ConfirmDialog } from "@/components/custom-components/confirm-dialog";
import { DataTable } from "@/components/custom-components/data-table";
import { SearchFilter } from "@/components/custom-components/search-filter";
import { Pagination } from "@/components/custom-components/pagination";
import { ProductCard } from "@/components/custom-components/product-card";
import { ProductCardSkeleton } from "@/components/custom-components/loading-skeleton";

type Props = {
  initialProducts: LocalStorageProduct[];
  initialCategories: LocalStorageCategory[];
};

export default function ProductClient({ initialProducts, initialCategories }: Props) {
  const [products, setProducts] = useState<LocalStorageProduct[]>([]);
  const [categories, setCategories] = useState<LocalStorageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<LocalStorageProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<LocalStorageProduct | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Initialize and merge localStorage with incoming server data
  useEffect(() => {
    const savedProducts = readLocalStorage<LocalStorageProduct[]>(PRODUCTS_KEY, []);
    const mergedProducts = mergeProducts(savedProducts, initialProducts);
    writeLocalStorage(PRODUCTS_KEY, mergedProducts);
    setProducts(mergedProducts);

    const savedCategories = readLocalStorage<LocalStorageCategory[]>(CATEGORIES_KEY, []);
    const mergedCategories = mergeCategories(savedCategories, initialCategories);
    writeLocalStorage(CATEGORIES_KEY, mergedCategories);
    setCategories(mergedCategories);

    setLoading(false);
  }, [initialProducts, initialCategories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = (product.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description || "").toLowerCase().includes(searchTerm.toLowerCase());
      const name = product.category || "uncategorized";
      const matchesCategory = selectedCategory === "all" || name === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPageItems = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount, page]);

  function handleAddProduct(data: ProductFormData) {
    const newProduct: LocalStorageProduct = {
      id: Date.now(),
      title: data.title,
      description: data.description || "",
      price: data.price,
      category: data.category === "all" ? "uncategorized" : data.category,
      images: data.imageUrl ? [data.imageUrl] : [],
      thumbnail: data.imageUrl || undefined,
      stock: 100,
      rating: 0,
      isLocal: true,
    };

    const next = [newProduct, ...products];
    setProducts(next);
    writeLocalStorage(PRODUCTS_KEY, next);
    setIsAddDialogOpen(false);
    toast.success("Product added successfully");
  }

  function handleEditProduct(data: ProductFormData) {
    if (!editingProduct) return;

    const updated: LocalStorageProduct = {
      ...editingProduct,
      title: data.title,
      description: data.description || "",
      price: data.price,
      category: data.category === "all" ? "uncategorized" : data.category,
      thumbnail: data.imageUrl,
      images: data.imageUrl ? [data.imageUrl] : [],
      isLocal: true,
    };

    const next = products.map((p) => (p.id === editingProduct.id ? updated : p));
    setProducts(next);
    writeLocalStorage(PRODUCTS_KEY, next);
    setEditingProduct(null);
    setIsEditDialogOpen(false);
    toast.success("Product updated successfully");
  }

  function handleDeleteProduct() {
    if (!deletingProduct) return;
    const next = products.filter((p) => p.id !== deletingProduct.id);
    setProducts(next);
    writeLocalStorage(PRODUCTS_KEY, next);
    setDeletingProduct(null);
    setIsDeleteDialogOpen(false);
    toast.success("Product deleted successfully");
  }

  function openEditDialog(product: LocalStorageProduct) {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  }

  function openDeleteDialog(product: LocalStorageProduct) {
    setDeletingProduct(product);
    setIsDeleteDialogOpen(true);
  }

  const tableColumns = [
    {
      key: "product",
      label: "Product",
      render: (value: unknown, product: LocalStorageProduct) => (
        <div className="flex items-center space-x-3">
          {product.thumbnail || product.image ? (
            <img 
              src={(product.thumbnail || product.image) as string} 
              alt={product.title} 
              className="w-10 h-10 rounded object-cover ring-1 ring-border" 
            />
          ) : (
            <div className="w-10 h-10 rounded bg-muted ring-1 ring-border" />
          )}
          <div>
            <a 
              href={`/products/${product.id}`}
              className="font-medium hover:text-primary hover:underline cursor-pointer"
            >
              {product.title}
            </a>
            <div className="text-sm text-muted-foreground truncate max-w-xs">{product.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value: unknown, product: LocalStorageProduct) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {product.category || "uncategorized"}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (value: unknown, product: LocalStorageProduct) => (
        <span className="font-medium">${product.price}</span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (value: unknown, product: LocalStorageProduct) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          (product.stock ?? 0) > 0 
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        }`}>
          {product.stock ?? 0}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (value: unknown, product: LocalStorageProduct) => {
        const rating = typeof product.rating === "number" 
          ? product.rating 
          : product.rating ? (product.rating as { rate: number }).rate : 0;
        return (
          <div className="flex items-center">
            <span className="text-sm">{rating}</span>
            <span className="text-yellow-500 ml-1">★</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Products Management</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            Table
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product with all necessary details.</DialogDescription>
              </DialogHeader>
              <ProductForm
                categories={categories}
                onSubmit={handleAddProduct}
                onCancel={() => setIsAddDialogOpen(false)}
                submitText="Add Product"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        placeholder="Search products..."
        resultCount={filteredProducts.length}
        resultLabel="products"
      />

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found</p>
            </div>
          ) : viewMode === "table" ? (
            <>
              <DataTable
                columns={tableColumns}
                data={currentPageItems}
                onEdit={openEditDialog}
                onDelete={openDeleteDialog}
              />
              <Pagination
                currentPage={page}
                totalPages={pageCount}
                onPageChange={setPage}
                className="mt-4"
              />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentPageItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                  />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={pageCount}
                onPageChange={setPage}
                className="mt-6"
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the product information.</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              initialData={{
                title: editingProduct.title || "",
                description: editingProduct.description || "",
                price: editingProduct.price || 0,
                category: editingProduct.category || "all",
                imageUrl: (editingProduct.thumbnail || editingProduct.image || "") as string,
              }}
              categories={categories}
              onSubmit={handleEditProduct}
              onCancel={() => setIsEditDialogOpen(false)}
              submitText="Update Product"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${deletingProduct?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteProduct}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}



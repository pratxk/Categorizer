"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Edit, Trash2, Star } from "lucide-react";
import { LocalStorageProduct, LocalStorageCategory, PRODUCTS_KEY, CATEGORIES_KEY, readLocalStorage, writeLocalStorage } from "@/lib/storage";
import ProductForm from "@/components/custom-components/product-form";
import { ProductFormData } from "@/lib/validation";
import { ConfirmDialog } from "@/components/custom-components/confirm-dialog";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductDetailProps {
  product: LocalStorageProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<LocalStorageProduct>(product);
  const [categories, setCategories] = useState<LocalStorageCategory[]>([]);

  useEffect(() => {
    const savedCategories = readLocalStorage<LocalStorageCategory[]>(CATEGORIES_KEY, []);
    setCategories(savedCategories);
  }, []);

  const imageUrl = currentProduct.thumbnail || currentProduct.image || currentProduct.images?.[0];
  const rating = typeof currentProduct.rating === "number" 
    ? currentProduct.rating 
    : currentProduct.rating ? (currentProduct.rating as any).rate : 0;

  const handleEditProduct = (data: ProductFormData) => {
    const updated: LocalStorageProduct = {
      ...currentProduct,
      title: data.title,
      description: data.description || "",
      price: data.price,
      category: data.category === "all" ? "uncategorized" : data.category,
      thumbnail: data.imageUrl,
      images: data.imageUrl ? [data.imageUrl] : [],
      isLocal: true,
    };

    const products = readLocalStorage<LocalStorageProduct[]>(PRODUCTS_KEY, []);
    const next = products.map((p) => (p.id === currentProduct.id ? updated : p));
    writeLocalStorage(PRODUCTS_KEY, next);
    setCurrentProduct(updated);
    setIsEditDialogOpen(false);
    toast.success("Product updated successfully");
  };

  const handleDeleteProduct = () => {
    const products = readLocalStorage<LocalStorageProduct[]>(PRODUCTS_KEY, []);
    const next = products.filter((p) => p.id !== currentProduct.id);
    writeLocalStorage(PRODUCTS_KEY, next);
    setIsDeleteDialogOpen(false);
    toast.success("Product deleted successfully");
    router.push("/products");
  };

  return (
    <div className="space-y-6 mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{currentProduct.title}</h1>
            <p className="text-muted-foreground">Product Details</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <Card>
          <CardContent className="p-6">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={currentProduct.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-muted flex items-center justify-center rounded-lg">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{currentProduct.title}</h3>
                <p className="text-muted-foreground mt-2">{currentProduct.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">
                  ${currentProduct.price}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{rating}</span>
                  </div>
                  <Badge variant="outline">{currentProduct.category || "uncategorized"}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stock</label>
                  <div className="mt-1">
                    <Badge variant={currentProduct.stock && currentProduct.stock > 0 ? "default" : "destructive"}>
                      {currentProduct.stock || 0} units
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge variant={currentProduct.stock && currentProduct.stock > 0 ? "default" : "destructive"}>
                      {currentProduct.stock && currentProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Product ID</label>
                  <p className="mt-1 font-mono text-sm">{currentProduct.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="mt-1">
                    <Badge variant="secondary">
                      {currentProduct.isLocal ? "Local" : "External"}
                    </Badge>
                  </p>
                </div>
              </div>
              
              {currentProduct.images && currentProduct.images.length > 1 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Additional Images</label>
                  <div className="mt-2 flex space-x-2 overflow-x-auto">
                    {currentProduct.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${currentProduct.title} - Image ${index + 2}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the product information.</DialogDescription>
          </DialogHeader>
          <ProductForm
            initialData={{
              title: currentProduct.title || "",
              description: currentProduct.description || "",
              price: currentProduct.price || 0,
              category: currentProduct.category || "all",
              imageUrl: (currentProduct.thumbnail || currentProduct.image || "") as string,
            }}
            categories={categories}
            onSubmit={handleEditProduct}
            onCancel={() => setIsEditDialogOpen(false)}
            submitText="Update Product"
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${currentProduct.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteProduct}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}

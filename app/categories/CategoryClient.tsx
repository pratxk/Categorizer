"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES_KEY, LocalStorageCategory, writeLocalStorage, readLocalStorage, mergeCategories } from "@/lib/storage";
import CategoryForm from "@/components/custom-components/category-form";
import { CategoryFormData } from "@/lib/validation";
import { ConfirmDialog } from "@/components/custom-components/confirm-dialog";
import { DataTable } from "@/components/custom-components/data-table";
import { SearchFilter } from "@/components/custom-components/search-filter";
import { TableSkeleton } from "@/components/custom-components/loading-skeleton";

type Props = {
  initialCategories: LocalStorageCategory[];
};

export default function CategoryClient({ initialCategories }: Props) {
  const [categories, setCategories] = useState<LocalStorageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<LocalStorageCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<LocalStorageCategory | null>(null);

  useEffect(() => {
    const saved = readLocalStorage<LocalStorageCategory[]>(CATEGORIES_KEY, []);
    const merged = mergeCategories(saved, initialCategories);
    writeLocalStorage(CATEGORIES_KEY, merged);
    setCategories(merged);
    setLoading(false);
  }, [initialCategories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      (category.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  function handleAddCategory(data: CategoryFormData) {
    const newCategory: LocalStorageCategory = {
      id: data.name.trim(),
      name: data.name.trim(),
      description: data.description || "",
      createdAt: new Date().toISOString(),
      productCount: 0,
      isLocal: true,
    };
    const next = [...categories, newCategory];
    setCategories(next);
    writeLocalStorage(CATEGORIES_KEY, next);
    setIsAddDialogOpen(false);
    toast.success("Category added successfully");
  }

  function handleEditCategory(data: CategoryFormData) {
    if (!editingCategory) return;
    
    const next = categories.map((c) =>
      c.id === editingCategory.id ? { 
        ...c, 
        name: data.name.trim(), 
        description: data.description || "", 
        isLocal: true 
      } : c
    );
    setCategories(next);
    writeLocalStorage(CATEGORIES_KEY, next);
    setEditingCategory(null);
    setIsEditDialogOpen(false);
    toast.success("Category updated successfully");
  }

  function handleDeleteCategory() {
    if (!deletingCategory) return;
    const next = categories.filter((c) => c.id !== deletingCategory.id);
    setCategories(next);
    writeLocalStorage(CATEGORIES_KEY, next);
    setDeletingCategory(null);
    setIsDeleteDialogOpen(false);
    toast.success("Category deleted successfully");
  }

  function openEditDialog(category: LocalStorageCategory) {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  }

  function openDeleteDialog(category: LocalStorageCategory) {
    setDeletingCategory(category);
    setIsDeleteDialogOpen(true);
  }

  const tableColumns = [
    {
      key: "name",
      label: "Name",
      render: (value: unknown, category: LocalStorageCategory) => (
        <span className="font-medium">{category.name}</span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (value: unknown, category: LocalStorageCategory) => (
        <span className="text-muted-foreground">{category.description}</span>
      ),
    },
    {
      key: "productCount",
      label: "Products",
      render: (value: unknown, category: LocalStorageCategory) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {category.productCount}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: unknown, category: LocalStorageCategory) => (
        <span className="text-sm text-muted-foreground">
          {new Date(category.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Categories Management</h2>
          <p className="text-muted-foreground">Organize your products with categories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category for organizing your products.</DialogDescription>
            </DialogHeader>
            <CategoryForm
              onSubmit={handleAddCategory}
              onCancel={() => setIsAddDialogOpen(false)}
              submitText="Add Category"
            />
          </DialogContent>
        </Dialog>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search categories..."
        resultCount={filteredCategories.length}
        resultLabel="categories"
      />

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your product categories</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton />
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No categories found</p>
            </div>
          ) : (
            <DataTable
              columns={tableColumns}
              data={filteredCategories}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category information.</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              initialData={{
                name: editingCategory.name,
                description: editingCategory.description,
              }}
              onSubmit={handleEditCategory}
              onCancel={() => setIsEditDialogOpen(false)}
              submitText="Update Category"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Category"
        description={`Are you sure you want to delete "${deletingCategory?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteCategory}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}



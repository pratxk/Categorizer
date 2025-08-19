"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorySchema, CategoryFormData } from "@/lib/validation";

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitText?: string;
}

export default function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitText = "Save Category",
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  const handleFormSubmit = (data: CategoryFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter category name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Enter category description"
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
}

import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  price: z.number().min(0, "Price must be positive").max(999999, "Price is too high"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  description: z.string().max(200, "Description must be less than 200 characters").optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;

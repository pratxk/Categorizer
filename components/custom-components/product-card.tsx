import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { LocalStorageProduct } from "@/lib/storage";
import Link from "next/link";

interface ProductCardProps {
  product: LocalStorageProduct;
  onEdit: (product: LocalStorageProduct) => void;
  onDelete: (product: LocalStorageProduct) => void;
  showActions?: boolean;
}

export function ProductCard({ 
  product, 
  onEdit, 
  onDelete, 
  showActions = true 
}: ProductCardProps) {
  const imageUrl = product.thumbnail || product.image || product.images?.[0];
  const rating = typeof product.rating === "number" 
    ? product.rating 
    : product.rating ? (product.rating as any).rate : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <Badge 
          variant={product.stock && product.stock > 0 ? "default" : "destructive"}
          className="absolute top-2 right-2"
        >
          {product.stock || 0} in stock
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">${product.price}</span>
            <Badge variant="outline">{product.category || "uncategorized"}</Badge>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-1">{rating}</span>
            <span className="text-yellow-500">★</span>
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-2">
          <div className="flex w-full space-x-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(product)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDelete(product)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

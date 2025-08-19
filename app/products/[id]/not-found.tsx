import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Product Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

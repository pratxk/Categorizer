import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (value: string) => void;
  categories?: Array<{ id: string; name: string }>;
  placeholder?: string;
  resultCount?: number;
  resultLabel?: string;
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = [],
  placeholder = "Search...",
  resultCount,
  resultLabel = "items",
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex items-center space-x-4">
        {onCategoryChange && categories.length > 0 && (
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {resultCount !== undefined && (
          <Badge variant="secondary">
            {resultCount} {resultLabel}
          </Badge>
        )}
      </div>
    </div>
  );
}

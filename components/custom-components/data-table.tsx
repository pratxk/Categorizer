import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (value: unknown, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showActions?: boolean;
  loading?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  showActions = true,
  loading = false,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-muted animate-pulse rounded" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-[250px] bg-muted animate-pulse rounded" />
              <div className="h-4 w-[200px] bg-muted animate-pulse rounded" />
            </div>
            <div className="h-4 w-[100px] bg-muted animate-pulse rounded" />
            <div className="h-4 w-[80px] bg-muted animate-pulse rounded" />
            <div className="h-4 w-[60px] bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
          {showActions && (onEdit || onDelete) && (
            <TableHead className="text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id || index} className="hover:bg-muted/50">
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.render
                  ? column.render((item as Record<string, unknown>)[column.key], item)
                  : String((item as Record<string, unknown>)[column.key] ?? '')}
              </TableCell>
            ))}
            {showActions && (onEdit || onDelete) && (
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

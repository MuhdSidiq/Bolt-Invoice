"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { InvoiceItem } from "@/lib/types";
import { products } from "@/lib/data";

interface InvoiceItemsListProps {
  items: InvoiceItem[];
  onRemoveItem?: (index: number) => void;
  readonly?: boolean;
}

export default function InvoiceItemsList({ items, onRemoveItem, readonly = false }: InvoiceItemsListProps) {
  const getProductSku = (productId?: string) => {
    if (!productId) return '';
    const product = products.find(p => p.id === productId);
    return product?.skuCode || '';
  };

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
            {!readonly && <TableHead className="w-[50px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{getProductSku(item.productId)}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
              <TableCell className="text-right">${(item.amount * item.quantity).toFixed(2)}</TableCell>
              {!readonly && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem?.(index)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={readonly ? 5 : 6} className="text-center">
                No items added
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
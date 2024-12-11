"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import { InvoiceItem } from "@/lib/types";

interface ProductSelectorProps {
  onAddItem: (item: InvoiceItem) => void;
  selectedProductIds: string[];
}

export default function ProductSelector({ onAddItem, selectedProductIds }: ProductSelectorProps) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Filter out already selected products
  const availableProducts = products.filter(p => 
    !selectedProductIds.includes(p.id)
  );

  const handleAddItem = () => {
    const product = availableProducts.find((p) => p.id === selectedProduct);
    if (!product) return;

    const item: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceId: "",
      description: product.name,
      quantity: quantity,
      amount: product.price,
      productId: product.id,
    };

    onAddItem(item);
    setSelectedProduct("");
    setQuantity(1);
  };

  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1">
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {availableProducts.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} - ${product.price.toFixed(2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-32">
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
      </div>
      <Button onClick={handleAddItem} disabled={!selectedProduct}>
        Add Product
      </Button>
    </div>
  );
}
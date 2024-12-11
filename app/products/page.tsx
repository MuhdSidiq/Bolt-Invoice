"use client";

import ProductList from "@/components/product/product-list";

export default function ProductsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Products</h1>
      </div>
      <ProductList />
    </div>
  );
}
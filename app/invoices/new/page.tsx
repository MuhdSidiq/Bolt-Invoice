"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductSelector from "@/components/invoice/product-selector";
import InvoiceItemsList from "@/components/invoice/invoice-items-list";
import { InvoiceItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import { invoices } from "@/lib/data";

export default function NewInvoicePage() {
  const router = useRouter();
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [studentId, setStudentId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const selectedProductIds = items.map(item => item.productId).filter(Boolean) as string[];

  const addItem = (item: InvoiceItem) => {
    setItems([...items, item]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.amount * item.quantity, 0);
  };

  const handleSubmit = () => {
    if (!studentId || !dueDate || items.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    const newInvoice = {
      id: Math.random().toString(36).substr(2, 9),
      issueDate: new Date(),
      dueDate: new Date(dueDate),
      studentId,
      invoiceNumber: `INV-${invoices.length + 1}`,
      status: 'pending' as const,
      discount: 0,
      subtotal: calculateTotal(),
      total: calculateTotal(),
      items: items.map(item => ({
        ...item,
        invoiceId: '',
      })),
      payments: [],
    };

    invoices.push(newInvoice);
    router.push('/invoices');
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Create New Invoice</h1>
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add Products</h2>
          <ProductSelector 
            onAddItem={addItem}
            selectedProductIds={selectedProductIds}
          />
          <InvoiceItemsList items={items} onRemoveItem={removeItem} />
          
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push('/invoices')}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Invoice</Button>
        </div>
      </div>
    </div>
  );
}
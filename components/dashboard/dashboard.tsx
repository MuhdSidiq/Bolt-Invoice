"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InvoiceList from "@/components/invoice/invoice-list";
import { invoices, products } from "@/lib/data";
import { getInvoiceStatusCounts, calculateTotalPendingAmount } from "@/lib/utils/invoice";
import { InvoiceTabs } from "@/components/invoice/invoice-tabs";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const statusCounts = getInvoiceStatusCounts(invoices);
  const pendingAmount = calculateTotalPendingAmount(invoices);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold mb-2">New Invoices</h2>
            <p className="text-3xl font-bold">{statusCounts.new}</p>
          </div>
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Pending Payment</h2>
            <p className="text-3xl font-bold">${pendingAmount.toFixed(2)}</p>
          </div>
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Products</h2>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Invoices</h2>
              <Link href="/invoices">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <InvoiceTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <InvoiceList limit={5} filterStatus={activeTab} />
        </div>
      </div>
    </div>
  );
}
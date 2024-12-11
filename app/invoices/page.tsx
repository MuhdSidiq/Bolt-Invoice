"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import InvoiceList from "@/components/invoice/invoice-list";
import { InvoiceTabs } from "@/components/invoice/invoice-tabs";

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Invoices</h1>
        <Link href="/invoices/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>
      <div className="mb-6">
        <InvoiceTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <InvoiceList filterStatus={activeTab} />
    </div>
  );
}
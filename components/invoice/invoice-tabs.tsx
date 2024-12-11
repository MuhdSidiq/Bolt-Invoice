"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InvoiceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function InvoiceTabs({ activeTab, onTabChange }: InvoiceTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Invoices</TabsTrigger>
        <TabsTrigger value="new/processing">New/Processing</TabsTrigger>
        <TabsTrigger value="paid">Paid</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
"use client";

import { Invoice } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaymentDialog } from "./payment-dialog";
import { invoices } from "@/lib/data";
import { format } from "date-fns";
import Link from "next/link";
import { Eye } from "lucide-react";

interface InvoiceListProps {
  limit?: number;
  filterStatus?: string;
}

export default function InvoiceList({ limit, filterStatus = "all" }: InvoiceListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "paid":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "overdue":
        return "bg-red-500";
      case "cancelled":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filterStatus === "all") return true;
    if (filterStatus === "new/processing") {
      return ["new", "pending", "overdue"].includes(invoice.status);
    }
    return invoice.status === filterStatus.toLowerCase();
  });

  const displayInvoices = limit ? filteredInvoices.slice(0, limit) : filteredInvoices;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{format(new Date(invoice.issueDate), "PP")}</TableCell>
              <TableCell>{format(new Date(invoice.dueDate), "PP")}</TableCell>
              <TableCell>${invoice.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Link href={`/invoices/${invoice.id}`}>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {['new', 'pending', 'overdue'].includes(invoice.status) && (
                    <PaymentDialog
                      invoiceId={invoice.id}
                      remainingAmount={invoice.total - invoice.payments.reduce((sum, p) => sum + p.amount, 0)}
                      onPaymentSubmit={(payment) => {
                        const invoice = invoices.find(inv => inv.id === payment.invoiceId);
                        if (!invoice) return;
                        invoice.payments.push({
                          ...payment,
                          id: Math.random().toString(36).substr(2, 9),
                        });
                        const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
                        invoice.status = totalPaid >= invoice.total ? 'paid' : 'pending';
                      }}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {displayInvoices.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
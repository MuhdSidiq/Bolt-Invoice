"use client";

import { Card } from "@/components/ui/card";
import { Invoice } from "@/lib/types";
import { PaymentDialog } from "./payment-dialog";
import { PaymentList } from "./payment-list";
import { Badge } from "@/components/ui/badge";
import InvoiceItemsList from "./invoice-items-list";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import Link from "next/link";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onPaymentSubmit: (invoiceId: string, amount: number) => void;
}

export function InvoiceDetails({ invoice, onPaymentSubmit }: InvoiceDetailsProps) {
  const totalPaid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remainingAmount = invoice.total - totalPaid;

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const handleDownloadPDF = () => {
    const pdfUrl = generateInvoicePDF(invoice);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `invoice-${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/invoices" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </Link>
        <Button onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Invoice #{invoice.invoiceNumber}</h2>
            <p className="text-gray-600">Student ID: {invoice.studentId}</p>
          </div>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Issue Date</p>
            <p className="font-medium">{format(invoice.issueDate, "PP")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="font-medium">{format(invoice.dueDate, "PP")}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Invoice Items</h3>
          <InvoiceItemsList items={invoice.items} readonly />
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span>${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount:</span>
            <span>${invoice.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${invoice.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Amount Paid:</span>
            <span>${totalPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600 font-bold">
            <span>Balance Due:</span>
            <span>${remainingAmount.toFixed(2)}</span>
          </div>
        </div>

        {remainingAmount > 0 && invoice.status !== 'cancelled' && (
          <div className="mt-6 flex justify-end">
            <PaymentDialog
              invoiceId={invoice.id}
              remainingAmount={remainingAmount}
              onPaymentSubmit={(payment) => onPaymentSubmit(payment.invoiceId, payment.amount)}
            />
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
        <PaymentList payments={invoice.payments} />
      </Card>
    </div>
  );
}
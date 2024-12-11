"use client";

import { Invoice } from "@/lib/types";
import { InvoiceDetails } from "./invoice-details";
import { invoices } from "@/lib/data";

interface InvoiceDetailsWrapperProps {
  invoice: Invoice;
}

export function InvoiceDetailsWrapper({ invoice: initialInvoice }: InvoiceDetailsWrapperProps) {
  const handlePaymentSubmit = (invoiceId: string, amount: number) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    if (!invoice) return;

    const payment = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceId,
      amount,
      paymentDate: new Date(),
      paymentMethod: "cash" as const,
      reference: "",
    };

    invoice.payments.push(payment);
    const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
    invoice.status = totalPaid >= invoice.total ? "paid" : "pending";
  };

  return <InvoiceDetails invoice={initialInvoice} onPaymentSubmit={handlePaymentSubmit} />;
}
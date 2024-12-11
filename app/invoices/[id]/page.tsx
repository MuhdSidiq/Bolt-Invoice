import { invoices } from "@/lib/data";
import { InvoiceDetailsWrapper } from "@/components/invoice/invoice-details-wrapper";
import { NotFound } from "@/components/not-found";

// This ensures all possible invoice IDs are pre-rendered at build time
export async function generateStaticParams() {
  return invoices.map((invoice) => ({
    id: invoice.id,
  }));
}

export default function InvoiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const invoice = invoices.find((inv) => inv.id === params.id);

  if (!invoice) {
    return <NotFound message="Invoice not found" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <InvoiceDetailsWrapper invoice={invoice} />
    </div>
  );
}
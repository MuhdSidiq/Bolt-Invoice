import { fetchInvoices, createInvoice, updateInvoice, createInvoiceItems, createPayment } from '../directus';
import { Invoice, InvoiceItem, Payment } from '../types';

export async function getInvoices(): Promise<Invoice[]> {
  return await fetchInvoices();
}

export async function createNewInvoice(
  invoice: Omit<Invoice, 'id'>,
  items: Omit<InvoiceItem, 'id' | 'invoiceId'>[],
): Promise<Invoice | null> {
  const newInvoice = await createInvoice(invoice);
  if (!newInvoice) return null;

  const invoiceItems = items.map(item => ({
    ...item,
    invoiceId: newInvoice.id,
  }));

  await createInvoiceItems(invoiceItems);
  return newInvoice;
}

export async function addPayment(
  invoiceId: string,
  payment: Omit<Payment, 'id'>,
): Promise<{ payment: Payment | null; updatedInvoice: Invoice | null }> {
  const newPayment = await createPayment(payment);
  if (!newPayment) return { payment: null, updatedInvoice: null };

  const invoice = (await fetchInvoices()).find(inv => inv.id === invoiceId);
  if (!invoice) return { payment: newPayment, updatedInvoice: null };

  const totalPaid = [...invoice.payments, newPayment]
    .reduce((sum, p) => sum + p.amount, 0);

  const updatedInvoice = await updateInvoice(invoiceId, {
    status: totalPaid >= invoice.total ? 'paid' : 'pending',
  });

  return { payment: newPayment, updatedInvoice };
}
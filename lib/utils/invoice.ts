import { Invoice } from '../types';

export function getInvoiceStatusCounts(invoices: Invoice[]) {
  return {
    new: invoices.filter(inv => inv.status === 'new').length,
    pending: invoices.filter(inv => inv.status === 'pending').length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
  };
}

export function calculateTotalPendingAmount(invoices: Invoice[]) {
  return invoices
    .filter(inv => ['new', 'pending', 'overdue'].includes(inv.status))
    .reduce((sum, inv) => sum + inv.total, 0);
}
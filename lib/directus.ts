import { createDirectus, rest, authentication, readItems, createItems, updateItems } from '@directus/sdk';
import type { AuthenticationData } from '@directus/sdk';
import { Product, Invoice, InvoiceItem, Payment } from './types';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

if (!directusUrl) {
  throw new Error('NEXT_PUBLIC_DIRECTUS_URL environment variable is not set');
}

export const directus = createDirectus(directusUrl)
  .with(authentication())
  .with(rest());

// Authentication
export async function login(email: string, password: string): Promise<AuthenticationData | null> {
  try {
    const auth = await directus.login(email, password);
    return auth;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await directus.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export async function refreshToken(): Promise<AuthenticationData | null> {
  try {
    const auth = await directus.refresh();
    return auth;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}

// Products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await directus.request(readItems('products'));
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Invoices
export async function fetchInvoices(): Promise<Invoice[]> {
  try {
    const invoices = await directus.request(readItems('invoices', {
      fields: ['*', 'items.*', 'payments.*'],
    }));
    return invoices.map(invoice => ({
      ...invoice,
      issueDate: new Date(invoice.issueDate),
      dueDate: new Date(invoice.dueDate),
      payments: invoice.payments.map(payment => ({
        ...payment,
        paymentDate: new Date(payment.paymentDate),
      })),
    }));
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

export async function createInvoice(invoice: Omit<Invoice, 'id'>): Promise<Invoice | null> {
  try {
    const newInvoice = await directus.request(createItems('invoices', [invoice]));
    return newInvoice[0];
  } catch (error) {
    console.error('Error creating invoice:', error);
    return null;
  }
}

export async function updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice | null> {
  try {
    const updatedInvoice = await directus.request(updateItems('invoices', [{ id, ...data }]));
    return updatedInvoice[0];
  } catch (error) {
    console.error('Error updating invoice:', error);
    return null;
  }
}

// Invoice Items
export async function createInvoiceItems(items: Omit<InvoiceItem, 'id'>[]): Promise<InvoiceItem[]> {
  try {
    const newItems = await directus.request(createItems('invoice_items', items));
    return newItems;
  } catch (error) {
    console.error('Error creating invoice items:', error);
    return [];
  }
}

// Payments
export async function createPayment(payment: Omit<Payment, 'id'>): Promise<Payment | null> {
  try {
    const newPayment = await directus.request(createItems('payments', [payment]));
    return newPayment[0];
  } catch (error) {
    console.error('Error creating payment:', error);
    return null;
  }
}
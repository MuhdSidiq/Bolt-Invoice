export type InvoiceStatus = 'new' | 'pending' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'cash' | 'credit_card' | 'bank_transfer' | 'other';

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  amount: number;
  productId?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  reference: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  issueDate: Date;
  dueDate: Date;
  studentId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  discount: number;
  subtotal: number;
  total: number;
  items: InvoiceItem[];
  payments: Payment[];
}
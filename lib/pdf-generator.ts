import jsPDF from 'jspdf';
import { Invoice } from './types';
import { format } from 'date-fns';

export function generateInvoicePDF(invoice: Invoice): string {
  const doc = new jsPDF();

  // Set up initial coordinates
  let y = 20;
  const leftMargin = 20;
  const rightMargin = 190;
  const lineHeight = 10;

  // Header
  doc.setFontSize(20);
  doc.text('INVOICE', leftMargin, y);
  y += lineHeight * 2;

  // Invoice details
  doc.setFontSize(12);
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, leftMargin, y);
  doc.text(`Date: ${format(invoice.issueDate, 'PP')}`, rightMargin - 60, y);
  y += lineHeight;

  doc.text(`Due Date: ${format(invoice.dueDate, 'PP')}`, leftMargin, y);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, rightMargin - 60, y);
  y += lineHeight * 2;

  // Student details
  doc.text('Bill To:', leftMargin, y);
  y += lineHeight;
  doc.text(`Student ID: ${invoice.studentId}`, leftMargin, y);
  y += lineHeight * 2;

  // Items table header
  doc.setFillColor(240, 240, 240);
  doc.rect(leftMargin, y, rightMargin - leftMargin, 10, 'F');
  doc.text('Description', leftMargin + 2, y + 7);
  doc.text('Qty', 100, y + 7);
  doc.text('Price', 130, y + 7);
  doc.text('Total', 160, y + 7);
  y += lineHeight;

  // Items
  invoice.items.forEach(item => {
    y += lineHeight;
    doc.text(item.description, leftMargin + 2, y);
    doc.text(item.quantity.toString(), 100, y);
    doc.text(`$${item.amount.toFixed(2)}`, 130, y);
    doc.text(`$${(item.amount * item.quantity).toFixed(2)}`, 160, y);
  });

  y += lineHeight * 2;

  // Totals
  const totalsStartX = 120;
  doc.text('Subtotal:', totalsStartX, y);
  doc.text(`$${invoice.subtotal.toFixed(2)}`, 160, y);
  y += lineHeight;

  doc.text('Discount:', totalsStartX, y);
  doc.text(`$${invoice.discount.toFixed(2)}`, 160, y);
  y += lineHeight;

  doc.setFontSize(14);
  doc.text('Total:', totalsStartX, y);
  doc.text(`$${invoice.total.toFixed(2)}`, 160, y);
  y += lineHeight * 2;

  // Payment details
  if (invoice.payments.length > 0) {
    doc.setFontSize(12);
    doc.text('Payment History', leftMargin, y);
    y += lineHeight;

    invoice.payments.forEach(payment => {
      doc.text(`${format(payment.paymentDate, 'PP')} - ${payment.paymentMethod} - $${payment.amount.toFixed(2)}`, leftMargin, y);
      y += lineHeight;
    });
  }

  // Generate blob URL
  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}
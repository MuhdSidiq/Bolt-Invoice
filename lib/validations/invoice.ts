import * as z from "zod";

export const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  amount: z.number().min(0, "Amount must be positive"),
  productId: z.string().optional(),
});

export const invoiceSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  dueDate: z.date().min(new Date(), "Due date must be in the future"),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
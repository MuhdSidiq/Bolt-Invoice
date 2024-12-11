import { Product, Invoice } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'School Uniform Set',
    description: 'Complete school uniform set including shirt and pants/skirt',
    skuCode: 'UNI001',
    price: 89.99,
    inventory: 100,
  },
  {
    id: '2',
    name: 'Textbook Bundle - Grade 10',
    description: 'Complete set of textbooks for Grade 10',
    skuCode: 'TXT010',
    price: 299.99,
    inventory: 50,
  },
  {
    id: '3',
    name: 'School Supplies Kit',
    description: 'Basic school supplies including notebooks, pens, and calculator',
    skuCode: 'SUP001',
    price: 49.99,
    inventory: 200,
  }
];

export const invoices: Invoice[] = [
  {
    id: 'inv1',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    invoiceNumber: 'INV-2024-001',
    status: 'paid',
    discount: 0,
    subtotal: 439.97,
    total: 439.97,
    items: [
      {
        id: 'item1',
        invoiceId: 'inv1',
        description: 'School Uniform Set',
        quantity: 2,
        amount: 89.99,
        productId: '1'
      },
      {
        id: 'item2',
        invoiceId: 'inv1',
        description: 'School Supplies Kit',
        quantity: 1,
        amount: 49.99,
        productId: '3'
      },
      {
        id: 'item3',
        invoiceId: 'inv1',
        description: 'Textbook Bundle - Grade 10',
        quantity: 1,
        amount: 299.99,
        productId: '2'
      }
    ],
    payments: [
      {
        id: 'pay1',
        invoiceId: 'inv1',
        amount: 439.97,
        paymentDate: new Date('2024-01-20'),
        paymentMethod: 'bank_transfer',
        reference: 'BT-20240120'
      }
    ]
  }
];
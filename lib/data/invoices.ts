import { Invoice } from '../types';

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
    studentId: 'STU001',
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
  },
  {
    id: 'inv2',
    issueDate: new Date('2024-02-01'),
    dueDate: new Date('2024-03-01'),
    invoiceNumber: 'INV-2024-002',
    status: 'pending',
    discount: 25,
    subtotal: 299.99,
    total: 274.99,
    studentId: 'STU002',
    items: [
      {
        id: 'item4',
        invoiceId: 'inv2',
        description: 'Textbook Bundle - Grade 10',
        quantity: 1,
        amount: 299.99,
        productId: '2'
      }
    ],
    payments: [
      {
        id: 'pay2',
        invoiceId: 'inv2',
        amount: 100,
        paymentDate: new Date('2024-02-15'),
        paymentMethod: 'cash',
        reference: 'CASH-20240215'
      }
    ]
  },
  {
    id: 'inv3',
    issueDate: new Date('2024-01-10'),
    dueDate: new Date('2024-02-10'),
    invoiceNumber: 'INV-2024-003',
    status: 'overdue',
    discount: 0,
    subtotal: 179.98,
    total: 179.98,
    studentId: 'STU003',
    items: [
      {
        id: 'item5',
        invoiceId: 'inv3',
        description: 'School Uniform Set',
        quantity: 2,
        amount: 89.99,
        productId: '1'
      }
    ],
    payments: []
  },
  {
    id: 'inv4',
    issueDate: new Date('2024-02-20'),
    dueDate: new Date('2024-03-20'),
    invoiceNumber: 'INV-2024-004',
    status: 'new',
    discount: 0,
    subtotal: 49.99,
    total: 49.99,
    studentId: 'STU004',
    items: [
      {
        id: 'item6',
        invoiceId: 'inv4',
        description: 'School Supplies Kit',
        quantity: 1,
        amount: 49.99,
        productId: '3'
      }
    ],
    payments: []
  },
  {
    id: 'inv5',
    issueDate: new Date('2024-01-05'),
    dueDate: new Date('2024-02-05'),
    invoiceNumber: 'INV-2024-005',
    status: 'cancelled',
    discount: 0,
    subtotal: 299.99,
    total: 299.99,
    studentId: 'STU001',
    items: [
      {
        id: 'item7',
        invoiceId: 'inv5',
        description: 'Textbook Bundle - Grade 10',
        quantity: 1,
        amount: 299.99,
        productId: '2'
      }
    ],
    payments: []
  },
  {
    id: 'inv6',
    issueDate: new Date('2024-02-18'),
    dueDate: new Date('2024-03-18'),
    invoiceNumber: 'INV-2024-006',
    status: 'pending',
    discount: 10,
    subtotal: 149.98,
    total: 139.98,
    studentId: 'STU002',
    items: [
      {
        id: 'item8',
        invoiceId: 'inv6',
        description: 'School Supplies Kit',
        quantity: 3,
        amount: 49.99,
        productId: '3'
      }
    ],
    payments: [
      {
        id: 'pay3',
        invoiceId: 'inv6',
        amount: 70,
        paymentDate: new Date('2024-02-20'),
        paymentMethod: 'credit_card',
        reference: 'CC-20240220'
      }
    ]
  },
  {
    id: 'inv7',
    issueDate: new Date('2024-02-15'),
    dueDate: new Date('2024-03-15'),
    invoiceNumber: 'INV-2024-007',
    status: 'paid',
    discount: 50,
    subtotal: 599.98,
    total: 549.98,
    studentId: 'STU003',
    items: [
      {
        id: 'item9',
        invoiceId: 'inv7',
        description: 'Textbook Bundle - Grade 10',
        quantity: 2,
        amount: 299.99,
        productId: '2'
      }
    ],
    payments: [
      {
        id: 'pay4',
        invoiceId: 'inv7',
        amount: 549.98,
        paymentDate: new Date('2024-02-16'),
        paymentMethod: 'bank_transfer',
        reference: 'BT-20240216'
      }
    ]
  },
  {
    id: 'inv8',
    issueDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-20'),
    invoiceNumber: 'INV-2024-008',
    status: 'overdue',
    discount: 0,
    subtotal: 269.97,
    total: 269.97,
    studentId: 'STU004',
    items: [
      {
        id: 'item10',
        invoiceId: 'inv8',
        description: 'School Uniform Set',
        quantity: 3,
        amount: 89.99,
        productId: '1'
      }
    ],
    payments: []
  },
  {
    id: 'inv9',
    issueDate: new Date('2024-02-22'),
    dueDate: new Date('2024-03-22'),
    invoiceNumber: 'INV-2024-009',
    status: 'new',
    discount: 15,
    subtotal: 149.97,
    total: 134.97,
    studentId: 'STU001',
    items: [
      {
        id: 'item11',
        invoiceId: 'inv9',
        description: 'School Supplies Kit',
        quantity: 3,
        amount: 49.99,
        productId: '3'
      }
    ],
    payments: []
  },
  {
    id: 'inv10',
    issueDate: new Date('2024-02-10'),
    dueDate: new Date('2024-03-10'),
    invoiceNumber: 'INV-2024-010',
    status: 'pending',
    discount: 30,
    subtotal: 449.97,
    total: 419.97,
    studentId: 'STU002',
    items: [
      {
        id: 'item12',
        invoiceId: 'inv10',
        description: 'School Uniform Set',
        quantity: 3,
        amount: 89.99,
        productId: '1'
      },
      {
        id: 'item13',
        invoiceId: 'inv10',
        description: 'School Supplies Kit',
        quantity: 2,
        amount: 49.99,
        productId: '3'
      }
    ],
    payments: [
      {
        id: 'pay5',
        invoiceId: 'inv10',
        amount: 200,
        paymentDate: new Date('2024-02-15'),
        paymentMethod: 'credit_card',
        reference: 'CC-20240215'
      }
    ]
  }
];

export function getInvoiceById(id: string): Invoice | undefined {
  return invoices.find(invoice => invoice.id === id);
}

export function getInvoicesByStatus(status: Invoice['status']): Invoice[] {
  return invoices.filter(invoice => invoice.status === status);
}

export function getInvoicesByStudentId(studentId: string): Invoice[] {
  return invoices.filter(invoice => invoice.studentId === studentId);
}
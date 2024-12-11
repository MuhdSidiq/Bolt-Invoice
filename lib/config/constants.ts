export const APP_CONFIG = {
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  dateFormat: {
    display: 'PP',
    input: 'yyyy-MM-dd',
  },
  invoice: {
    statuses: {
      new: 'new',
      pending: 'pending',
      paid: 'paid',
      overdue: 'overdue',
      cancelled: 'cancelled',
    },
    paymentMethods: {
      cash: 'cash',
      creditCard: 'credit_card',
      bankTransfer: 'bank_transfer',
      other: 'other',
    },
  },
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  invoices: {
    base: '/invoices',
    details: (id: string) => `/invoices/${id}`,
    payments: (id: string) => `/invoices/${id}/payments`,
  },
  products: {
    base: '/products',
    details: (id: string) => `/products/${id}`,
  },
} as const;
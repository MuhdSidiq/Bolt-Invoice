"use client";

import { useState, useEffect } from 'react';
import { Invoice } from '@/lib/types';
import { toast } from 'sonner';
import { createDirectus, realtime, rest } from '@directus/sdk';

export function useInvoiceNotifications() {
  const [newInvoices, setNewInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
      .with(rest())
      .with(realtime());

    const unsubscribe = directus.realtime.subscribe('invoices', (payload) => {
      if (payload.event === 'create') {
        const newInvoice = payload.data as Invoice;
        setNewInvoices(prev => [...prev, newInvoice]);
        
        toast('New Invoice Created', {
          description: `Invoice #${newInvoice.invoiceNumber} has been created`,
          action: {
            label: 'View',
            onClick: () => window.location.href = `/invoices/${newInvoice.id}`
          },
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { newInvoices };
}
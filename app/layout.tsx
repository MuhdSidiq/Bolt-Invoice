import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TopNav } from '@/components/layouts/top-nav';
import { AuthProvider } from '@/components/auth/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Management System',
  description: 'Manage your invoices and products efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TopNav />
          <main className="min-h-screen pt-16 bg-gray-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
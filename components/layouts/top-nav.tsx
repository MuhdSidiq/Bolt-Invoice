"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  Package, 
  LayoutDashboard,
} from "lucide-react";
import { UserNav } from "@/components/auth/user-nav";
import { useAuth } from "@/components/auth/auth-provider";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Products", href: "/products", icon: Package },
];

export function TopNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="fixed top-0 left-0 right-0 border-b bg-white z-40">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Invoice System</h1>
          <nav className="hidden md:flex">
            <ul className="flex space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <UserNav />
      </div>
    </header>
  );
}
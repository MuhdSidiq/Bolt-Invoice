import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MainNav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-4">
          <Link href="/">
            <Button variant="link">Invoices</Button>
          </Link>
          <Link href="/products">
            <Button variant="link">Products</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
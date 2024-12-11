"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import ContractList from "@/components/student/contract-list";

export default function ContractsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Student Contracts</h1>
        <Link href="/students/contracts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </Link>
      </div>
      <ContractList />
    </div>
  );
}
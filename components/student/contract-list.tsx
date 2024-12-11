"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { studentContracts, students, programmes, invoices } from "@/lib/data";
import { format } from "date-fns";
import Link from "next/link";
import { Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContractList() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "terminated":
        return "bg-red-500";
      case "suspended":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || 'Unknown Student';
  };

  const getProgrammeName = (programmeId: string) => {
    return programmes.find(p => p.id === programmeId)?.name || 'Unknown Programme';
  };

  const formatPaymentTerm = (term: string) => {
    return term.charAt(0).toUpperCase() + term.slice(1);
  };

  const handleGenerateInvoice = (contract: typeof studentContracts[0]) => {
    const newInvoice = {
      id: Math.random().toString(36).substr(2, 9),
      issueDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Due in 30 days
      studentId: contract.studentId,
      invoiceNumber: `INV-${invoices.length + 1}`,
      status: 'pending' as const,
      discount: 0,
      subtotal: contract.tuitionFees,
      total: contract.tuitionFees,
      items: [
        {
          id: Math.random().toString(36).substr(2, 9),
          invoiceId: '',
          description: `Tuition Fee - ${getProgrammeName(contract.programmeId)}`,
          quantity: 1,
          amount: contract.tuitionFees,
          type: 'education_fee'
        }
      ],
      payments: [],
      type: 'education_fee'
    };

    invoices.push(newInvoice);
    router.push(`/invoices/${newInvoice.id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Programme</TableHead>
            <TableHead>Payment Term</TableHead>
            <TableHead>Tuition Fees</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentContracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{getStudentName(contract.studentId)}</TableCell>
              <TableCell>{getProgrammeName(contract.programmeId)}</TableCell>
              <TableCell>{formatPaymentTerm(contract.paymentTerm)}</TableCell>
              <TableCell>${contract.tuitionFees.toFixed(2)}</TableCell>
              <TableCell>{format(contract.startDate, "PP")}</TableCell>
              <TableCell>{format(contract.endDate, "PP")}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(contract.status)}>
                  {contract.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Link href={`/students/contracts/${contract.id}`}>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {contract.status === 'active' && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleGenerateInvoice(contract)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {studentContracts.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No contracts found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
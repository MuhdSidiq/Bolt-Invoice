"use client";

import { Card } from "@/components/ui/card";
import { Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { programmes, studentContracts } from "@/lib/data";
import { format } from "date-fns";

interface StudentDetailsProps {
  student: Student;
}

export function StudentDetails({ student }: StudentDetailsProps) {
  const programme = programmes.find(p => p.id === student.programmeId);
  const contracts = studentContracts.filter(c => c.studentId === student.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "graduated":
        return "bg-blue-500";
      case "suspended":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{student.name}</h2>
            <p className="text-gray-600">Student ID: {student.id}</p>
          </div>
          <Badge className={getStatusColor(student.status)}>
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Programme</p>
            <p className="font-medium">{programme?.name || 'Unknown Programme'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Enrollment Date</p>
            <p className="font-medium">{format(student.enrollmentDate, "PP")}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Contracts</h3>
        <div className="space-y-4">
          {contracts.map(contract => (
            <div key={contract.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Contract #{contract.id}</h4>
                <Badge className={getStatusColor(contract.status)}>
                  {contract.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Payment Term</p>
                  <p>{contract.paymentTerm}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tuition Fees</p>
                  <p>${contract.tuitionFees.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Start Date</p>
                  <p>{format(contract.startDate, "PP")}</p>
                </div>
                <div>
                  <p className="text-gray-600">End Date</p>
                  <p>{format(contract.endDate, "PP")}</p>
                </div>
              </div>
            </div>
          ))}
          {contracts.length === 0 && (
            <p className="text-gray-500 text-center py-4">No contracts found</p>
          )}
        </div>
      </Card>
    </div>
  );
}
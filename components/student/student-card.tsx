"use client";

import { Student, Programme } from '@/lib/types/student';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { getStudentStatus } from '@/lib/utils/student';

interface StudentCardProps {
  student: Student;
  programme: Programme;
}

export function StudentCard({ student, programme }: StudentCardProps) {
  const status = getStudentStatus(student.status);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{student.name}</h3>
          <p className="text-sm text-gray-500">{student.id}</p>
        </div>
        <Badge className={status.color}>{status.label}</Badge>
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Programme</p>
            <p className="font-medium">{programme.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Enrollment Date</p>
            <p className="font-medium">{format(student.enrollmentDate, 'PP')}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{student.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{student.phone || 'N/A'}</p>
          </div>
        </div>

        {student.guardianName && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Guardian Information</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{student.guardianName}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{student.guardianPhone || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
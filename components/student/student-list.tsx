"use client";

import { useState } from "react";
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
import { Eye } from "lucide-react";
import Link from "next/link";
import { students, getProgrammeById } from "@/lib/data";
import { getStudentStatus } from "@/lib/utils/student";
import { format } from "date-fns";
import type { Student } from "@/lib/types";

export default function StudentList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgrammeName = (programmeId: string) => {
    const programme = getProgrammeById(programmeId);
    return programme?.name || 'Unknown Programme';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Programme</TableHead>
            <TableHead>Enrollment Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => {
            const status = getStudentStatus(student.status);
            return (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{getProgrammeName(student.programmeId)}</TableCell>
                <TableCell>{format(new Date(student.enrollmentDate), "PP")}</TableCell>
                <TableCell>
                  <Badge className={status.color}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Link href={`/students/${student.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {filteredStudents.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
"use client";

import { Student } from "@/lib/types";
import { StudentDetails } from "./student-details";

interface StudentDetailsWrapperProps {
  student: Student;
}

export function StudentDetailsWrapper({ student }: StudentDetailsWrapperProps) {
  return <StudentDetails student={student} />;
}
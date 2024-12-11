import { Student, Programme } from '../types/student';
import { format } from 'date-fns';

export function formatStudentName(student: Student): string {
  return student.name;
}

export function formatStudentId(student: Student): string {
  return student.id.padStart(6, '0');
}

export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  
  return age;
}

export function formatEnrollmentDate(date: Date): string {
  return format(date, 'PP');
}

export function calculateTuitionDue(student: Student, programme: Programme): number {
  // This is a simple calculation - you might want to add more complex logic
  return programme.tuitionFee;
}

export function getStudentStatus(status: Student['status']): {
  label: string;
  color: string;
} {
  switch (status) {
    case 'active':
      return { label: 'Active', color: 'bg-green-500' };
    case 'inactive':
      return { label: 'Inactive', color: 'bg-gray-500' };
    case 'graduated':
      return { label: 'Graduated', color: 'bg-blue-500' };
    case 'suspended':
      return { label: 'Suspended', color: 'bg-red-500' };
    default:
      return { label: 'Unknown', color: 'bg-gray-500' };
  }
}
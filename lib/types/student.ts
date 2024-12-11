export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'suspended';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
  enrollmentDate: Date;
  programmeId: string;
  status: StudentStatus;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Programme {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: number; // in months
  tuitionFee: number;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudentContract {
  id: string;
  studentId: string;
  programmeId: string;
  startDate: Date;
  endDate: Date;
  tuitionFees: number;
  paymentTerm: 'monthly' | 'quarterly' | 'annually';
  status: 'active' | 'completed' | 'terminated' | 'suspended';
  createdAt?: Date;
  updatedAt?: Date;
}
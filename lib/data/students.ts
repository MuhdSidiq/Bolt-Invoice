import { Student, Programme } from '../types/student';

export const programmes: Programme[] = [
  {
    id: 'PRG001',
    name: 'International Baccalaureate',
    code: 'IB-2024',
    description: 'Two-year educational programme for students aged 16-19',
    duration: 24,
    tuitionFee: 25000,
    status: 'active'
  },
  {
    id: 'PRG002',
    name: 'Cambridge A-Levels',
    code: 'AL-2024',
    description: 'Pre-university programme with comprehensive subject coverage',
    duration: 18,
    tuitionFee: 20000,
    status: 'active'
  },
  {
    id: 'PRG003',
    name: 'American High School Diploma',
    code: 'AHS-2024',
    description: 'Four-year secondary education programme',
    duration: 48,
    tuitionFee: 18000,
    status: 'active'
  }
];

export const students: Student[] = [
  {
    id: 'STU001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    dateOfBirth: new Date('2006-05-15'),
    enrollmentDate: new Date('2023-09-01'),
    programmeId: 'PRG001',
    status: 'active',
    guardianName: 'Jane Doe',
    guardianPhone: '+1234567891',
    guardianEmail: 'jane.doe@example.com',
    address: '123 Education Street, Learning City, 12345'
  },
  {
    id: 'STU002',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    phone: '+1234567892',
    dateOfBirth: new Date('2006-08-22'),
    enrollmentDate: new Date('2023-09-01'),
    programmeId: 'PRG001',
    status: 'active',
    guardianName: 'Bob Smith',
    guardianPhone: '+1234567893',
    guardianEmail: 'bob.smith@example.com',
    address: '456 Knowledge Avenue, Wisdom Town, 67890'
  },
  {
    id: 'STU003',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '+1234567894',
    dateOfBirth: new Date('2007-03-10'),
    enrollmentDate: new Date('2023-09-01'),
    programmeId: 'PRG002',
    status: 'active',
    guardianName: 'Sarah Wilson',
    guardianPhone: '+1234567895',
    guardianEmail: 'sarah.wilson@example.com',
    address: '789 Scholar Road, Academic City, 13579'
  },
  {
    id: 'STU004',
    name: 'Emma Brown',
    email: 'emma.brown@example.com',
    phone: '+1234567896',
    dateOfBirth: new Date('2006-11-30'),
    enrollmentDate: new Date('2023-09-01'),
    programmeId: 'PRG003',
    status: 'active',
    guardianName: 'Michael Brown',
    guardianPhone: '+1234567897',
    guardianEmail: 'michael.brown@example.com',
    address: '321 Learning Lane, Education Valley, 24680'
  }
];

// Helper functions
export function getStudentById(id: string): Student | undefined {
  return students.find(student => student.id === id);
}

export function getProgrammeById(id: string): Programme | undefined {
  return programmes.find(programme => programme.id === id);
}

export function getStudentsByProgramme(programmeId: string): Student[] {
  return students.filter(student => student.programmeId === programmeId);
}

export function getActiveStudents(): Student[] {
  return students.filter(student => student.status === 'active');
}
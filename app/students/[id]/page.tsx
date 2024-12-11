import { students } from "@/lib/data";
import { StudentDetailsWrapper } from "@/components/student/student-details-wrapper";
import { NotFound } from "@/components/not-found";

export function generateStaticParams() {
  return students.map((student) => ({
    id: student.id,
  }));
}

export default function StudentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    return <NotFound message="Student not found" />;
  }

  return (
    <div className="container mx-auto py-10">
      <StudentDetailsWrapper student={student} />
    </div>
  );
}
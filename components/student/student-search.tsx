"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getStudentStatus } from "@/lib/utils/student";
import { students, getProgrammeById } from "@/lib/data";
import type { Student } from "@/lib/types";

export function StudentSearch() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const router = useRouter();

  const filteredStudents = debouncedSearch 
    ? students.filter((student) => 
        student.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        student.id.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];

  const getProgrammeName = (programmeId: string) => {
    const programme = getProgrammeById(programmeId);
    return programme?.name || 'Unknown Programme';
  };

  const handleSelect = (studentId: string) => {
    setOpen(false);
    router.push(`/students/${studentId}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start">
          <Search className="mr-2 h-4 w-4" />
          Search students...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search by name or ID..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>No students found.</CommandEmpty>
          <CommandGroup heading="Students">
            {filteredStudents.map((student) => {
              const status = getStudentStatus(student.status);
              return (
                <CommandItem
                  key={student.id}
                  value={student.id}
                  onSelect={() => handleSelect(student.id)}
                >
                  <div className="flex flex-col">
                    <span>{student.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {student.id} - {getProgrammeName(student.programmeId)}
                    </span>
                  </div>
                  <Badge className={`ml-auto ${status.color}`}>
                    {status.label}
                  </Badge>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
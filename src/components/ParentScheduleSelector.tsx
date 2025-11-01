"use client";

import { useState, useEffect, ReactNode } from "react";

export interface Student {
    id: string;
    name: string;
    surname: string;
    classId: number;
}

export interface ParentScheduleSelectorProps {
    students: Student[];
    calendars: Record<string, ReactNode>;
}

const ParentScheduleSelector = ({ students, calendars }: ParentScheduleSelectorProps) => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    useEffect(() => {
        if (students.length > 0 && !selectedStudent) {
            setSelectedStudent(students[0]);
        }
    }, [students, selectedStudent]);

    return (
        <div className="flex flex-col gap-4">
            {/* Student Selector - Only show if multiple students */}
            {students.length > 1 && (
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <h2 className="text-sm font-semibold text-gray-600 mb-3">Select Student</h2>
                    <div className="flex flex-wrap gap-2">
                        {students.map((student) => (
                            <button
                                key={student.id}
                                onClick={() => setSelectedStudent(student)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedStudent?.id === student.id
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {student.name} {student.surname}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Schedule Calendar */}
            {selectedStudent && (
                <div className="bg-white p-4 rounded-md shadow-sm flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">
                            {students.length === 1
                                ? `${selectedStudent.name}'s Schedule`
                                : `Schedule`
                            }
                        </h1>
                        {students.length > 1 && (
                            <span className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                                {selectedStudent.name} {selectedStudent.surname}
                            </span>
                        )}
                    </div>
                    {/* Render the pre-generated calendar */}
                    <div className="calendar-container">
                        {calendars[selectedStudent.id]}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParentScheduleSelector;

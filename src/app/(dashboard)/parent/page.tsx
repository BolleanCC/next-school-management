import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import ParentScheduleSelector from "@/components/ParentScheduleSelector";
import { ReactNode } from "react";

const ParentPage = async () => {
    const { userId } = await auth();

    const students = await prisma.student.findMany({
        where: {
            parentId: userId!,
        },
        select: {
            id: true,
            name: true,
            surname: true,
            classId: true,
        },
    });

    if (!students || students.length === 0) {
        return (
            <div className="p-4 flex gap-4 flex-col xl:flex-row">
                <div className="w-full xl:w-2/3">
                    <div className="h-full bg-white p-4 rounded-md">
                        <h1 className="text-xl font-semibold">Schedule</h1>
                        <p className="text-gray-500 mt-4">No students assigned yet.</p>
                    </div>
                </div>
                <div className="w-full xl:w-1/3 flex flex-col gap-8">
                    <Announcements />
                </div>
            </div>
        );
    }

    // Pre-render all student calendars on server side
    const studentCalendars: Record<string, ReactNode> = {};
    for (const student of students) {
        studentCalendars[student.id] = (
            <BigCalendarContainer key={student.id} type="classId" id={student.classId} />
        );
    }

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <ParentScheduleSelector students={students} calendars={studentCalendars} />
            </div>

            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                {/* Student Info Cards */}
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">My Children</h2>
                    <div className="space-y-3">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="p-3 rounded-lg border-2 border-gray-200 bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">
                                            {student.name} {student.surname}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Class ID: {student.classId}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Announcements */}
                <Announcements />
            </div>
        </div>
    );
};

export default ParentPage;

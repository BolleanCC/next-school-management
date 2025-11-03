import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

export const runtime = "nodejs";

const BigCalendarContainer = async ({ type, id }: { type: "teacherId" | "classId" | "clerkUserId"; id: string | number }) => {

    let whereClause: any;

    if (type === "clerkUserId") {
        // If type is clerkUserId, first find the teacher by clerkUserId.
        // Fallback to matching the teacher id directly to support legacy data
        // where the teacher id equals the Clerk user id.
        const teacher = await prisma.teacher.findFirst({
            where: {
                OR: [
                    { clerkUserId: id as string },
                    { id: id as string },
                ],
            },
            select: { id: true },
        });

        if (!teacher) {
            whereClause = { teacherId: "___non_existent___" }; // Will return no results
        } else {
            whereClause = { teacherId: teacher.id };
        }
    } else if (type === "teacherId") {
        whereClause = { teacherId: id as string };
    } else {
        whereClause = { classId: id as number };
    }

    const dataRes = await prisma.lesson.findMany({
        where: whereClause,
    });

    const data = dataRes.map((lesson) => ({
        title: lesson.name,
        start: lesson.startTime,
        end: lesson.endTime,
        day: lesson.day, // Include the day enum
    }));

    const schedule = adjustScheduleToCurrentWeek(data);

    // If no lessons found, show a friendly message
    if (schedule.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <p className="text-lg mb-2">📅 No lessons scheduled</p>
                    <p className="text-sm">
                        {(type === "teacherId" || type === "clerkUserId")
                            ? "No lessons have been assigned to you yet."
                            : "This class has no scheduled lessons yet."}
                    </p>
                </div>
            </div>
        );
    }

    return <div className=""><BigCalendar data={schedule} /></div>;
};

export default BigCalendarContainer;
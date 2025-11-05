import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export type FormContainerProps = {
    table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
    let relatedData = {};

    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const currentUserId = userId;

    if (type !== "delete") {
        switch (table) {
            case "subject":
                const subjectTeachers = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true },
                });
                relatedData = { teachers: subjectTeachers };
                break;
            case "class":
                // Run queries in parallel to reduce latency and connection time
                const [classGrades, classTeachers] = await Promise.all([
                    prisma.grade.findMany({
                        select: { id: true, level: true },
                    }),
                    prisma.teacher.findMany({
                        select: { id: true, name: true, surname: true },
                    }),
                ]);
                relatedData = { teachers: classTeachers, grades: classGrades };
                break;
            case "teacher":
                const teacherSubjects = await prisma.subject.findMany({
                    select: { id: true, name: true },
                });
                relatedData = { subjects: teacherSubjects };
                break;
            case "student":
                // Run queries in parallel to reduce latency and connection time
                const [studentGrades, studentClasses, parents] = await Promise.all([
                    prisma.grade.findMany({
                        select: { id: true, level: true },
                    }),
                    prisma.class.findMany({
                        include: { _count: { select: { students: true } } },
                    }),
                    prisma.parent.findMany({
                        select: { id: true, name: true, surname: true },
                    }),
                ]);
                relatedData = { classes: studentClasses, grades: studentGrades, parents };
                break;
            case "exam":
                const examLessons = await prisma.lesson.findMany({
                    where: {
                        ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
                    },
                    select: { id: true, name: true },
                });
                relatedData = { lessons: examLessons };
                break;
            case "assignment":
                const assignmentLessons = await prisma.lesson.findMany({
                    where: {
                        ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
                    },
                    select: { id: true, name: true },
                });
                relatedData = { lessons: assignmentLessons };
                break;
            case "result":
                // Run queries in parallel to reduce latency and connection time
                const [resultStudents, resultExams, resultAssignments] = await Promise.all([
                    prisma.student.findMany({
                        select: { id: true, name: true, surname: true },
                    }),
                    prisma.exam.findMany({
                        select: { id: true, title: true },
                    }),
                    prisma.assignment.findMany({
                        select: { id: true, title: true },
                    }),
                ]);
                relatedData = { students: resultStudents, exams: resultExams, assignments: resultAssignments };
                break;
            case "event":
                const eventClasses = await prisma.class.findMany({
                    select: { id: true, name: true },
                });
                relatedData = { classes: eventClasses };
                break;
            case "announcement":
                const announcementClasses = await prisma.class.findMany({
                    select: { id: true, name: true },
                });
                relatedData = { classes: announcementClasses };
                break;
            case "lesson":
                // Run queries in parallel to reduce latency and connection time
                const [lessonSubjects, lessonClasses, lessonTeachers] = await Promise.all([
                    prisma.subject.findMany({
                        select: { id: true, name: true },
                    }),
                    prisma.class.findMany({
                        select: { id: true, name: true },
                    }),
                    prisma.teacher.findMany({
                        select: { id: true, name: true, surname: true },
                    }),
                ]);
                relatedData = { subjects: lessonSubjects, classes: lessonClasses, teachers: lessonTeachers };
                break;

            default:
                break;
        }
    }

    return (
        <div className="">
            <FormModal
                table={table}
                type={type}
                data={data}
                id={id}
                relatedData={relatedData}
            />
        </div>
    );
};

export default FormContainer;
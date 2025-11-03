import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

type UserRole = "admin" | "teacher" | "student" | "parent";

export const getRole = async () => {
    const { sessionClaims, userId } = await auth();
    const metadataRole = (sessionClaims?.metadata as { role?: string })?.role;

    if (metadataRole && isUserRole(metadataRole)) {
        return metadataRole;
    }

    if (!userId) {
        return null;
    }

    return await resolveRoleFromDatabase(userId);
};

export const getCurrentUserId = async () => {
    const { userId } = await auth();
    return userId;
};

export const resolveRoleFromDatabase = async (userId: string): Promise<UserRole | null> => {
    const teacher = await prisma.teacher.findFirst({
        where: {
            OR: [
                { clerkUserId: userId },
                { id: userId },
            ],
        },
        select: { id: true },
    });

    if (teacher) {
        return "teacher";
    }

    const student = await prisma.student.findUnique({
        where: { id: userId },
        select: { id: true },
    });

    if (student) {
        return "student";
    }

    const parent = await prisma.parent.findUnique({
        where: { id: userId },
        select: { id: true },
    });

    if (parent) {
        return "parent";
    }

    const admin = await prisma.admin.findUnique({
        where: { id: userId },
        select: { id: true },
    });

    if (admin) {
        return "admin";
    }

    return null;
};

const isUserRole = (value: string): value is UserRole => {
    return ["admin", "teacher", "student", "parent"].includes(value);
};

/**
 * Get a reference Monday for the calendar
 * We use a fixed reference week to avoid timezone issues
 * The actual date doesn't matter - we only care about day of week and time
 */
const getReferenceMonday = (): Date => {
    // Use a fixed date: January 1, 2024 (which is a Monday)
    // This avoids any timezone conversion issues
    return new Date(2024, 0, 1, 0, 0, 0, 0);
};

/**
 * Adjust lesson schedule to display on the calendar
 * Uses a fixed reference week to avoid timezone issues
 * Only the day of week and time matter, not the actual date
 */
export const adjustScheduleToCurrentWeek = (
    lessons: { title: string; start: Date; end: Date; day: string }[]
): { title: string; start: Date; end: Date }[] => {
    // Get a fixed reference Monday
    const referenceMonday = getReferenceMonday();

    // Map Day enum to days from Monday (0 = Monday, 1 = Tuesday, etc.)
    const dayMap: { [key: string]: number } = {
        MONDAY: 0,
        TUESDAY: 1,
        WEDNESDAY: 2,
        THURSDAY: 3,
        FRIDAY: 4,
    };

    // Strict filter to only include valid lessons
    const validLessons = lessons.filter((lesson) =>
        lesson &&
        lesson.title &&
        lesson.title.trim().length > 0 &&
        lesson.start instanceof Date &&
        !isNaN(lesson.start.getTime()) &&
        lesson.end instanceof Date &&
        !isNaN(lesson.end.getTime()) &&
        lesson.day &&
        dayMap.hasOwnProperty(lesson.day)
    );

    return validLessons.map((lesson) => {
        const daysFromMonday = dayMap[lesson.day] ?? 0;

        // Extract just the time components from the original dates
        const startHours = lesson.start.getHours();
        const startMinutes = lesson.start.getMinutes();
        const endHours = lesson.end.getHours();
        const endMinutes = lesson.end.getMinutes();

        // Create new dates using the reference Monday + day offset
        const adjustedStartDate = new Date(referenceMonday);
        adjustedStartDate.setDate(referenceMonday.getDate() + daysFromMonday);
        adjustedStartDate.setHours(startHours, startMinutes, 0, 0);

        const adjustedEndDate = new Date(referenceMonday);
        adjustedEndDate.setDate(referenceMonday.getDate() + daysFromMonday);
        adjustedEndDate.setHours(endHours, endMinutes, 0, 0);

        return {
            title: lesson.title,
            start: adjustedStartDate,
            end: adjustedEndDate,
        };
    });
};
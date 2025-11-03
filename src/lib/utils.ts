import { auth } from "@clerk/nextjs/server";

export const getRole = async () => {
    const { sessionClaims } = await auth();
    return (sessionClaims?.metadata as { role?: string })?.role;
};

export const getCurrentUserId = async () => {
    const { userId } = await auth();
    return userId;
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

    return lessons.map((lesson) => {
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
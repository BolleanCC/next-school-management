import { auth } from "@clerk/nextjs/server";

export const getRole = async () => {
    const { sessionClaims } = await auth();
    return (sessionClaims?.metadata as { role?: string })?.role;
};

export const getCurrentUserId = async () => {
    const { userId } = await auth();
    return userId;
};

const getLatestMonday = (): Date => {
    const today = new Date();

    // Use UTC methods to avoid timezone issues
    const dayOfWeek = today.getUTCDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Create a new Date object for Monday (don't mutate today)
    const latestMonday = new Date(today);
    latestMonday.setUTCDate(today.getUTCDate() - daysSinceMonday);

    // Set time to 00:00:00 UTC
    latestMonday.setUTCHours(0, 0, 0, 0);

    return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
    lessons: { title: string; start: Date; end: Date; day: string }[]
): { title: string; start: Date; end: Date }[] => {
    const latestMonday = getLatestMonday();

    return lessons.map((lesson) => {
        // Map Day enum to days from Monday (0 = Monday, 1 = Tuesday, etc.)
        const dayMap: { [key: string]: number } = {
            MONDAY: 0,
            TUESDAY: 1,
            WEDNESDAY: 2,
            THURSDAY: 3,
            FRIDAY: 4,
        };

        const daysFromMonday = dayMap[lesson.day] ?? 0;

        // Use UTC methods to ensure consistency
        const adjustedStartDate = new Date(latestMonday);
        adjustedStartDate.setUTCDate(latestMonday.getUTCDate() + daysFromMonday);
        adjustedStartDate.setUTCHours(
            lesson.start.getUTCHours(),
            lesson.start.getUTCMinutes(),
            lesson.start.getUTCSeconds()
        );

        const adjustedEndDate = new Date(adjustedStartDate);
        adjustedEndDate.setUTCHours(
            lesson.end.getUTCHours(),
            lesson.end.getUTCMinutes(),
            lesson.end.getUTCSeconds()
        );

        return {
            title: lesson.title,
            start: adjustedStartDate,
            end: adjustedEndDate,
        };
    });
};
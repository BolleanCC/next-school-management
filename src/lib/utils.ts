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
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const latestMonday = today;
    latestMonday.setDate(today.getDate() - daysSinceMonday);
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

        const adjustedStartDate = new Date(latestMonday);

        adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
        adjustedStartDate.setHours(
            lesson.start.getHours(),
            lesson.start.getMinutes(),
            lesson.start.getSeconds()
        );
        const adjustedEndDate = new Date(adjustedStartDate);
        adjustedEndDate.setHours(
            lesson.end.getHours(),
            lesson.end.getMinutes(),
            lesson.end.getSeconds()
        );

        return {
            title: lesson.title,
            start: adjustedStartDate,
            end: adjustedEndDate,
        };
    });
};

import Announcements from "@/components/Announcements";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const Parentpage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [keys: string]: string | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;
    const { userId } = await auth();

    const classItem = await prisma.class.findMany({
        where: {
            students: {
                some: {
                    parentId: userId!
                }
            }
        }
    });

    // Handle case where no class is found
    if (!classItem || classItem.length === 0) {
        return <div className="p-4 flex gap-4 flex-col xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule</h1>
                    <p className="text-gray-500 mt-4">No class assigned yet.</p>
                </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <EventCalendarContainer searchParams={resolvedSearchParams} />
                <Announcements />
            </div>
        </div>;
    }

    return <div className="p-4 flex gap-4 flex-col xl:flex-row">
        {/* {LEFT} */}
        <div className="w-full xl:w-2/3">
            <div className="h-full bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold">Class schedule</h1>
                <BigCalendarContainer type="classId" id={classItem[0].id} />
            </div>
        </div>
        {/* {RIGHT} */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <EventCalendarContainer searchParams={resolvedSearchParams} />
            <Announcements />
        </div>
    </div>;
};

export default Parentpage;
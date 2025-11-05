
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import { auth } from "@clerk/nextjs/server";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";

const Teacherpage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [keys: string]: string | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;

    const { userId } = await auth();

    return <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
        {/* {LEFT} */}
        <div className="w-full xl:w-2/3">
            <div className="h-full bg-white p-4 rounded-md min-h-[800px]">
                <h1 className="text-xl font-semibold">Schedule</h1>
                <BigCalendarContainer type="clerkUserId" id={userId!} />
            </div>
        </div>
        {/* {RIGHT} */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <EventCalendarContainer searchParams={resolvedSearchParams} />
            <Announcements />
        </div>
    </div>;
};

export default Teacherpage;
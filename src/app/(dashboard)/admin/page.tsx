import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";
import FinanceChart from "@/components/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";

const Adminpage = () => {
    return <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* {LEFT} */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* {USERCARDS} */}
            <div className="flex justify-between gap-4 flex-wrap">
                <UserCard type="student" />
                <UserCard type="teacher" />
                <UserCard type="parent" />
                <UserCard type="admin" />
            </div>
            {/* {MIDDLE CHARTS} */}
            <div className="flex gap-4 flex-col lg:flex-row">
                {/* {COUNT CHART} */}
                <div className="w-full lg:w-1/3 h-[450px]">
                    <CountChart />
                </div>
                {/* {ATTENDANCE CHART} */}
                <div className="w-full lg:w-2/3 h-[450px]">
                    <AttendanceChart />
                </div>
            </div>
            {/* {BOTTOM CHARTS} */}
            <div className="w-full h-[500px]">
                <FinanceChart />
            </div>
        </div>
        {/* {RIGHT} */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <EventCalendar />
            <Announcements />
        </div>
    </div>;
};

export default Adminpage;
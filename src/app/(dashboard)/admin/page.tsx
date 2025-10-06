import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";

const Adminpage = () => {
    return <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* {LEFT} */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* {USERCARDS} */}
            <div className="flex justify-between gap-4 flex-wrap">
                <UserCard type="students" />
                <UserCard type="teachers" />
                <UserCard type="parents" />
                <UserCard type="staffs" />
            </div>
            {/* {MIDDLE CHARTS} */}
            <div className="flex gap-4 flex-col lg:flex-row">
                {/* {COUNT CHART} */}
                <div className="w-full lg:w-1/3 h-[450px]">
                    <CountChart />
                </div>
                {/* {ATTENDANCE CHART} */}
                <div className="w-full lg:w-2/3 h-[450px]"></div>
            </div>
            {/* {BOTTOM CHARTS} */}
            <div className="flex gap-4 flex-col lg:flex-row">
            </div>
        </div>
        {/* {RIGHT} */}
        <div className="w-full lg:w-1/3">right</div>
    </div>;
};

export default Adminpage;
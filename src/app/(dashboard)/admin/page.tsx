import UserCard from "@/components/UserCard";

const Adminpage = () => {
    return <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* {LEFT} */}
        <div className="w-full lg:w-2/3">
            {/* {USERCARDS} */}
            <div className="flex justify-between gap-4 flex-wrap">
                <UserCard type="students" />
                <UserCard type="teachers" />
                <UserCard type="parents" />
                <UserCard type="staffs" />
            </div>
        </div>
        {/* {RIGHT} */}
        <div className="w-full lg:w-1/3">right</div>
    </div>;
};

export default Adminpage;
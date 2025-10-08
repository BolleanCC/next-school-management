import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
const TeachersListpage = () => {
    return <div className="p-4 rounded-md bg-white flex-1 mt-0">
        {/* {TOP} */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <TableSearch />
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                        <Image src="/filter.png" alt="add" width={14} height={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                        <Image src="/sort.png" alt="add" width={14} height={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                        <Image src="/plus.png" alt="add" width={14} height={14} />
                    </button>
                </div>
            </div>
        </div>
        {/* {LIST} */}
        <div className="">

        </div>
        {/* {PAGINATION} */}
        <Pagination />
    </div>;
};

export default TeachersListpage;
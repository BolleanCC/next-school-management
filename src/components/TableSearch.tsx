import Image from "next/image";
const TableSearch = () => {
    return <div>
        {/* {SEARCH BAR} */}
        <div className="w-full md:w-auto items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <div className="flex items-center gap-2">
                <Image src="/search.png" alt="search" width={14} height={14} />
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
            </div>
        </div>
    </div>;
};

export default TableSearch;
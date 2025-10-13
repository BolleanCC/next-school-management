import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import { role } from "@/lib/data";
import { teachersData } from "@/lib/data";
import FormModal from "@/components/FormModal";

type Teacher = {
    id: number;
    teacherId: string;
    name: string;
    email?: string;
    photo: string;
    phone: string;
    subjects: string[];
    classes: string[];
    address: string;
};

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Teacher ID",
        accessor: "teacherId",
        className: "hidden md:table-cell",
    },
    {
        header: "Subjects",
        accessor: "subjects",
        className: "hidden md:table-cell",
    },
    {
        header: "Classes",
        accessor: "classes",
        className: "hidden md:table-cell",
    },
    {
        header: "Phone",
        accessor: "phone",
        className: "hidden lg:table-cell",
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];
const TeachersListpage = () => {

    const renderRow = (item: Teacher) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                <Image
                    src={item.photo}
                    alt=""
                    width={40}
                    height={40}
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell p-4">{item.teacherId}</td>
            <td className="hidden md:table-cell p-4">{item.subjects.join(", ")}</td>
            <td className="hidden md:table-cell p-4">{item.classes.join(", ")}</td>
            <td className="hidden lg:table-cell p-4">{item.phone}</td>
            <td className="hidden lg:table-cell p-4">{item.address}</td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky">
                            <Image src="/view.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-purple">
                        //     <Image src="/delete.png" alt="" width={16} height={16} />
                        // </button>
                        <FormModal
                            table="teacher"
                            type="delete"
                            data={item}
                        />
                    )}
                </div>
            </td>
        </tr>
    );

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
                    {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                        <Image src="/plus.png" alt="add" width={14} height={14} />
                    </button> */}
                    {role === "admin" && (
                        <FormModal
                            table="teacher"
                            type="create"
                        />
                    )}
                </div>
            </div>
        </div>
        {/* {LIST} */}
        <Table columns={columns} renderRow={renderRow} data={teachersData} />
        {/* {PAGINATION} */}
        <Pagination />
    </div>;
};

export default TeachersListpage;
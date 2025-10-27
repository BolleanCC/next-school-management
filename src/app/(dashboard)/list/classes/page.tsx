import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getRole } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { Class, Prisma, Teacher, Grade } from "@prisma/client";

type ClassList = Class & { supervisor: Teacher; grade: Grade }

const ClassListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined; }> }) => {
    const resolvedSearchParams = await searchParams;
    const { page, ...queryParams } = resolvedSearchParams;

    const p = page ? parseInt(page) : 1;

    const role = await getRole();

    const columns = [
        {
            header: "Class Name",
            accessor: "name",
        },
        {
            header: "Capacity",
            accessor: "capacity",
            className: "hidden md:table-cell",
        },
        {
            header: "Grade",
            accessor: "grade",
            className: "hidden md:table-cell",
        },
        {
            header: "Supervisor",
            accessor: "supervisor",
            className: "hidden md:table-cell",
        },
        ...(role === "admin" ? [{
            header: "Actions",
            accessor: "action",
        }] : []),
    ];

    const renderRow = (item: ClassList, relatedData?: any) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight"
        >
            <td className="flex items-center gap-4 p-4">{item.name}</td>
            <td className="hidden md:table-cell">{item.capacity}</td>
            <td className="hidden md:table-cell">{item.grade.level}</td>
            <td className="hidden md:table-cell">{item.supervisor.name + " " + item.supervisor.surname}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormModal table="class" type="update" data={item} relatedData={relatedData} />
                            <FormModal table="class" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    const query: Prisma.ClassWhereInput = {}

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "supervisorId":
                        query.supervisorId = value;
                        break;
                    case "search":
                        query.name = { contains: value, mode: "insensitive" }
                        break;
                    default:
                        break;
                }
            }
        }
    }


    const [data, count, teachers, grades] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                supervisor: true,
                grade: true,
            },
            take: ITEMS_PER_PAGE,
            skip: (p - 1) * ITEMS_PER_PAGE,
        }),
        prisma.class.count({ where: query }),
        prisma.teacher.findMany({
            select: {
                id: true,
                name: true,
                surname: true,
            },
        }),
        prisma.grade.findMany({
            select: {
                id: true,
                level: true,
            },
        }),
    ]);


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" && <FormModal table="class" type="create" relatedData={{ teachers, grades }} />}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} relatedData={{ teachers, grades }} />
            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    );
};

export default ClassListPage;
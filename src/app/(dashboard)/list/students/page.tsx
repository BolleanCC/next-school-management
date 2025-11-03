import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { Class, Prisma, Student } from "@prisma/client";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import FormContainer from "@/components/FormContainer";
import { auth } from "@clerk/nextjs/server";
import { getRole } from "@/lib/utils";

export const runtime = "nodejs";

type StudentList = Student & { class: Class | null }

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Student ID",
        accessor: "studentId",
        className: "hidden md:table-cell",
    },
    {
        header: "Grade",
        accessor: "grade",
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

const createRenderRow = (userRole: string | undefined) => {
    const StudentRow = (item: StudentList) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                <Image
                    src={item.img || "/noAvatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                        {item.class ? item.class.name : "⚠️ No Class"}
                    </p>
                </div>
            </td>
            <td className="hidden md:table-cell p-4">{item.username}</td>
            <td className="hidden md:table-cell p-4">
                {item.class ? item.class.name[0] : "-"}
            </td>
            <td className="hidden lg:table-cell p-4">{item.phone}</td>
            <td className="hidden lg:table-cell p-4">{item.address}</td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <Link href={`/list/students/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky">
                            <Image src="/view.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {userRole === "admin" && (
                        <FormModal table="student" type="delete" id={item.id} />
                    )}
                </div>
            </td>
        </tr>
    );

    StudentRow.displayName = "StudentRow";

    return StudentRow;
};

const StudentsListpage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined; }> }) => {
    const resolvedSearchParams = await searchParams;
    const { page, ...queryParams } = resolvedSearchParams;

    const p = page ? parseInt(page) : 1;

    // Get current user's role and ID
    const currentRole = await getRole();
    const { userId } = await auth();

    const query: Prisma.StudentWhereInput = {}

    // If user is a teacher, only show students from their classes
    if (currentRole === "teacher" && userId) {
        query.class = {
            lessons: {
                some: {
                    teacherId: userId,
                },
            },
        };
    }

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "teacherId":
                        // Override or merge with existing class filter
                        if (currentRole === "teacher" && userId) {
                            // Teacher can only see their own students even if filtering
                            query.class = {
                                lessons: {
                                    some: {
                                        teacherId: userId,
                                    },
                                },
                            };
                        } else {
                            query.class = { lessons: { some: { teacherId: value } } };
                        }
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

    const [data, count] = await prisma.$transaction([
        prisma.student.findMany({
            where: query,
            include: {
                class: true,
            },
            take: ITEMS_PER_PAGE,
            skip: (p - 1) * ITEMS_PER_PAGE,
        }),
        prisma.student.count({ where: query }),
    ]);

    const renderRow = createRenderRow(currentRole ?? undefined);

    return <div className="p-4 rounded-md bg-white flex-1 mt-0">
        {/* {TOP} */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block text-lg font-semibold">
                {currentRole === "teacher" ? "My Students" : "All Students"}
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4 my-4">
                <TableSearch />
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                        <Image src="/filter.png" alt="add" width={14} height={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                        <Image src="/sort.png" alt="add" width={14} height={14} />
                    </button>
                    {currentRole === "admin" && <FormContainer table="student" type="create" />}
                </div>
            </div>
        </div>
        {/* {LIST} */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* {PAGINATION} */}
        <Pagination page={p} count={count} />
    </div>;
};

export default StudentsListpage;
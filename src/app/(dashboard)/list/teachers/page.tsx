import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Table from "@/components/Table";
import Link from "next/link";
import { getRole } from "@/lib/data";
import { teachersData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import FormContainer from "@/components/FormContainer";
import { Class, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const TeachersListpage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined; }> }) => {
    const resolvedSearchParams = await searchParams;
    const { page, ...queryParams } = resolvedSearchParams;

    const p = page ? parseInt(page) : 1;

    const role = await getRole();

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

    const renderRow = (item: TeacherList) => (
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
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.clerkUserId ? (
                            <span
                                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium"
                                title="Linked to Clerk account"
                            >
                                ✓ Clerk
                            </span>
                        ) : (
                            <span
                                className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium"
                                title="No Clerk account linked"
                            >
                                ⚠ No Clerk
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell p-4">{item.username}</td>
            <td className="hidden md:table-cell p-4">{item.subjects.map((subject) => subject.name).join(", ")}</td>
            <td className="hidden md:table-cell p-4">{item.classes.map((classItem) => classItem.name).join(", ")}</td>
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
                        <FormContainer
                            table="teacher"
                            type="delete"
                            id={item.id}
                        />
                    )}
                </div>
            </td>
        </tr>
    );

    const query: Prisma.TeacherWhereInput = {}

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "classId":
                        // Include both teachers who teach lessons in this class AND the class supervisor
                        query.OR = [
                            { lessons: { some: { classId: parseInt(value) } } },
                            { classes: { some: { id: parseInt(value) } } }
                        ];
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

    console.log('Query params:', queryParams);
    console.log('Query:', JSON.stringify(query, null, 2));

    const [data, count] = await prisma.$transaction([
        prisma.teacher.findMany({
            where: query,
            include: {
                subjects: true,
                classes: true,
            },
            take: ITEMS_PER_PAGE,
            skip: (p - 1) * ITEMS_PER_PAGE,
        }),
        prisma.teacher.count({ where: query }),
    ]);

    console.log('Found teachers:', data.length);
    // Debug: Log clerkUserId for each teacher
    data.forEach(teacher => {
        console.log(`Teacher: ${teacher.name} ${teacher.surname}, clerkUserId: ${teacher.clerkUserId || 'NULL'}`);
    });


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
                        <FormContainer
                            table="teacher"
                            type="create"
                        />
                    )}
                </div>
            </div>
        </div>
        {/* {LIST} */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* {PAGINATION} */}
        <Pagination count={count} page={p} />
    </div>;
};

export default TeachersListpage;
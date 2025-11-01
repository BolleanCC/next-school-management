import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getCurrentUserId, getRole } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import FormContainer from "@/components/FormContainer";

type ExamList = Exam & { lesson: { subject: Subject, class: Class | null, teacher: Teacher | null } }

const ExamListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined; }> }) => {
    const resolvedSearchParams = await searchParams;
    const { page, ...queryParams } = resolvedSearchParams;

    const p = page ? parseInt(page) : 1;

    const role = await getRole();
    const currentUserId = await getCurrentUserId();

    const columns = [
        {
            header: "Subject Name",
            accessor: "name",
        },
        {
            header: "Exam Name",
            accessor: "examName",
        },
        {
            header: "Class",
            accessor: "class",
        },
        {
            header: "Teacher",
            accessor: "teacher",
            className: "hidden md:table-cell",
        },
        {
            header: "Start Time",
            accessor: "startTime",
            className: "hidden md:table-cell",
        },
        {
            header: "End Time",
            accessor: "endTime",
            className: "hidden md:table-cell",
        },
        ...(role === "admin" || role === "teacher" ? [{
            header: "Actions",
            accessor: "action",
        }] : []),
    ];

    const renderRow = (item: ExamList) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:purpleLight"
        >
            <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
            <td className="p-4">
                <span className="font-medium text-gray-800">{item.title}</span>
            </td>
            <td>
                {item.lesson.class ? (
                    item.lesson.class.name
                ) : (
                    <span className="text-amber-600 font-medium italic">⚠️ No Class</span>
                )}
            </td>
            <td className="hidden md:table-cell">
                {item.lesson.teacher ? (
                    item.lesson.teacher.name + " " + item.lesson.teacher.surname
                ) : (
                    <span className="text-amber-600 font-medium italic">⚠️ Awaiting Assignment</span>
                )}
            </td>
            <td className="hidden md:table-cell">
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(new Date(item.startTime))}
            </td>
            <td className="hidden md:table-cell">
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(new Date(item.endTime))}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    {(role === "admin" || role === "teacher") && (
                        <>
                            <FormContainer table="exam" type="update" data={item} />
                            <FormContainer table="exam" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    const query: Prisma.ExamWhereInput = {}

    query.lesson = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "classId":
                        query.lesson.classId = parseInt(value);
                        break;
                    case "teacherId":
                        query.lesson.teacherId = value;
                        break;
                    case "search":
                        query.lesson.subject = { name: { contains: value, mode: "insensitive" } }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    //Role conditions
    switch (role) {
        case "admin":
            break;
        case "teacher":
            query.lesson.teacherId = currentUserId!;
            break;
        case "student":
            query.lesson.class = { students: { some: { id: currentUserId! } } };
            break;
        case "parent":
            query.lesson.class = { students: { some: { parentId: currentUserId! } } };
            break;
        default:
            break;
    }

    const [data, count] = await prisma.$transaction([
        prisma.exam.findMany({
            where: query,
            include: { lesson: { include: { subject: { select: { name: true } }, class: { select: { name: true } }, teacher: { select: { name: true, surname: true } } } } },
            take: ITEMS_PER_PAGE,
            skip: (p - 1) * ITEMS_PER_PAGE,
        }),
        prisma.exam.count({ where: query }),
    ]);

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button> */}
                        {(role === "admin" || role === "teacher") && (<FormContainer table="exam" type="create" />)}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    );
};

export default ExamListPage;
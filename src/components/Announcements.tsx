import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Announcements = async () => {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    const roleConditions = {
        teacher: { lessons: { some: { teacherId: userId! } } },
        student: { students: { some: { id: userId! } } },
        parent: { students: { some: { parentId: userId! } } },
    };

    const data = await prisma.announcement.findMany({
        take: role === "admin" ? undefined : 3,
        orderBy: { date: "desc" },
        where: {
            ...(role !== "admin" && {
                OR: [
                    { classId: null },
                    { class: roleConditions[role as keyof typeof roleConditions] || {} },
                ],
            }),
        },
    });

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <Link href="/list/announcements" className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
                    View All
                </Link>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {data.map((announcement, index) => {
                    const bgColors = ["bg-skyLight", "bg-purpleLight", "bg-yellowLight"];
                    const bgColor = bgColors[index % bgColors.length];

                    return (
                        <div key={announcement.id} className={`${bgColor} rounded-md p-4`}>
                            <div className="flex items-center justify-between">
                                <h2 className="font-medium">{announcement.title}</h2>
                                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                    {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Announcements;
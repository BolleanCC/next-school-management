import { NextResponse } from "next/server";
import { resolveRoleFromDatabase } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

type UserRole = "admin" | "teacher" | "student" | "parent";

const roleRedirectMap: Record<UserRole, string> = {
    admin: "/admin",
    teacher: "/teacher",
    student: "/student",
    parent: "/parent",
};

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ role: null }, { status: 401 });
    }

    let role: UserRole | null = null;

    try {
        role = await resolveRoleFromDatabase(userId);
    } catch (error) {
        console.error('Failed to resolve role:', error);
        return NextResponse.json({ role: null }, { status: 500 });
    }

    if (!role) {
        return NextResponse.json({ role: null }, { status: 404 });
    }

    return NextResponse.json({
        role,
        redirectPath: roleRedirectMap[role],
    });
}
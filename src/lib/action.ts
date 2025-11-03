"use server";

export const runtime = "nodejs";

import {
    AnnouncementSchema,
    AssignmentSchema,
    ClassSchema,
    EventSchema,
    ExamSchema,
    LessonSchema,
    ParentSchema,
    ResultSchema,
    StudentSchema,
    SubjectSchema,
    TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type CurrentState = { success: boolean; error: boolean; message?: string };

export const createSubject = async (
    currentState: CurrentState,
    data: SubjectSchema
) => {
    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map((teacherId) => ({ id: teacherId })),
                },
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateSubject = async (
    currentState: CurrentState,
    data: SubjectSchema
) => {
    try {
        await prisma.subject.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId) => ({ id: teacherId })),
                },
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteSubject = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createClass = async (
    currentState: CurrentState,
    data: ClassSchema
) => {
    try {
        await prisma.class.create({
            data: {
                ...data,
                supervisorId: data.supervisorId && data.supervisorId.trim() !== "" ? data.supervisorId : null,
            },
        });

        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateClass = async (
    currentState: CurrentState,
    data: ClassSchema
) => {
    try {
        await prisma.class.update({
            where: {
                id: data.id,
            },
            data: {
                ...data,
                supervisorId: data.supervisorId && data.supervisorId.trim() !== "" ? data.supervisorId : null,
            },
        });

        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

/**
 * Deletes a class from the database.
 * 
 * When a class is deleted:
 * - Students' classId is automatically set to NULL (via onDelete: SetNull)
 * - Lessons' classId is automatically set to NULL (via onDelete: SetNull)
 * - Events and announcements are preserved with NULL classId
 * 
 * @param currentState - Current form state
 * @param data - FormData containing the class ID
 * @returns Success/error state with descriptive message
 */
export const deleteClass = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    // Validate id
    if (!id || id.trim() === "") {
        console.error("Invalid class ID provided");
        return { success: false, error: true, message: "Invalid class ID" };
    }

    const classId = parseInt(id);
    if (isNaN(classId)) {
        console.error("Class ID must be a number");
        return { success: false, error: true, message: "Invalid class ID format" };
    }

    try {
        // Fetch the class first to get info about affected records
        const classInfo = await prisma.class.findUnique({
            where: { id: classId },
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        students: true,
                        lessons: true,
                    },
                },
            },
        });

        if (!classInfo) {
            console.warn(`Class with id ${classId} not found`);
            return { success: false, error: true, message: "Class not found or already deleted" };
        }

        // Delete the class
        // Students' and lessons' classId will automatically be set to NULL
        await prisma.class.delete({
            where: { id: classId },
        });

        // Build informative message
        const messages: string[] = [`Class ${classInfo.name} deleted successfully.`];

        if (classInfo._count.students > 0) {
            messages.push(
                `${classInfo._count.students} student${classInfo._count.students > 1 ? 's' : ''} now have no assigned class.`
            );
        }

        if (classInfo._count.lessons > 0) {
            messages.push(
                `${classInfo._count.lessons} lesson${classInfo._count.lessons > 1 ? 's' : ''} now have no assigned class.`
            );
        }

        console.info(messages.join(' '));

        // revalidatePath("/list/class");
        return {
            success: true,
            error: false,
            message: messages.join(' '),
        };
    } catch (err: any) {
        console.error("Error deleting class:", err);
        return {
            success: false,
            error: true,
            message: err.message || "Failed to delete class",
        };
    }
};

export const createTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
) => {
    try {
        if (!data.password || data.password.length < 8) {
            console.error("Password is required and must be at least 8 characters");
            return {
                success: false,
                error: true,
                message: "Password is required and must be at least 8 characters long!"
            };
        }

        // Sanitize username to ensure it only contains valid characters
        const sanitizedUsername = sanitizeUsername(data.username);

        const clerk = await clerkClient();
        const user = await clerk.users.createUser({
            username: sanitizedUsername,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            ...(data.email && { emailAddress: [data.email] }),
            publicMetadata: { role: "teacher" }
        });

        await prisma.teacher.create({
            data: {
                id: user.id,
                username: sanitizedUsername,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                clerkUserId: user.id,
                subjects: {
                    connect: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });

        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error creating teacher:", err);
        console.error("Clerk errors:", err?.errors);

        // Extract user-friendly error message from Clerk errors
        if (err?.errors && Array.isArray(err.errors) && err.errors.length > 0) {
            const clerkError = err.errors[0];
            if (clerkError.message) {
                return {
                    success: false,
                    error: true,
                    message: clerkError.message
                };
            }
        }

        // Fallback error messages
        if (err?.message) {
            return {
                success: false,
                error: true,
                message: err.message
            };
        }

        return {
            success: false,
            error: true,
            message: "Failed to create teacher. Please check your input and try again."
        };
    }
};

export const updateTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        // Try to update Clerk user if it exists
        // This will fail for seeded data with IDs like "teacher1", "teacher2", etc.
        try {
            const clerk = await clerkClient();
            await clerk.users.updateUser(data.id, {
                username: data.username,
                ...(data.password !== "" && { password: data.password }),
                firstName: data.name,
                lastName: data.surname,
            });
        } catch (clerkError: any) {
            // If the user doesn't exist in Clerk (404), that's okay - continue with DB update
            // This handles seeded data that doesn't have corresponding Clerk users
            if (clerkError?.status !== 404) {
                // If it's a different error, log it but continue
                console.warn("Clerk update failed (non-404):", clerkError?.message);
            }
        }

        // Update the database (this is the source of truth)
        await prisma.teacher.update({
            where: {
                id: data.id,
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    set: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });
        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

/**
 * Deletes a teacher from the database and optionally from Clerk.
 * 
 * This function is idempotent - calling it multiple times with the same ID
 * will return "Teacher not found" after the first successful deletion.
 * 
 * Behavior:
 * - If teacher has clerkUserId: deletes from both DB and Clerk
 * - If teacher has no clerkUserId (null): deletes from DB only
 * - Related lessons/classes get teacherId/supervisorId set to NULL (via onDelete: SetNull)
 * - Lessons and classes are NOT deleted
 * 
 * @param currentState - Current form state
 * @param data - FormData containing the teacher ID
 * @returns Success/error state with descriptive message
 */
export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    // Validate id (defensive check)
    if (!id || id.trim() === "") {
        console.error("Invalid teacher ID provided");
        return { success: false, error: true, message: "Invalid teacher ID" };
    }

    try {
        // Fetch the teacher first to get clerkUserId and ensure it exists
        const teacher = await prisma.teacher.findUnique({
            where: { id },
            select: { id: true, clerkUserId: true, name: true, surname: true },
        });

        if (!teacher) {
            console.warn(`Teacher with id ${id} not found (may have been already deleted)`);
            return { success: false, error: true, message: "Teacher not found or already deleted" };
        }

        // Delete the teacher from database in a transaction
        // The database will automatically set Lesson.teacherId and Class.supervisorId to NULL
        // due to onDelete: SetNull constraints
        await prisma.$transaction(async (tx) => {
            await tx.teacher.delete({
                where: { id },
            });
        });

        // After successful database deletion, try to delete Clerk user if clerkUserId exists
        if (teacher.clerkUserId && teacher.clerkUserId.trim() !== "") {
            try {
                const clerk = await clerkClient();
                await clerk.users.deleteUser(teacher.clerkUserId);
                console.info(`Successfully deleted teacher ${teacher.name} ${teacher.surname} and their Clerk account`);
            } catch (clerkError: any) {
                // If the user doesn't exist in Clerk (404), that's okay - already deleted or never existed
                if (clerkError?.status === 404) {
                    console.info(`Clerk user ${teacher.clerkUserId} not found (404) - already deleted or never existed`);
                } else {
                    // For non-404 errors, log warning and return partial success
                    console.warn(`Clerk delete failed for user ${teacher.clerkUserId}:`, clerkError?.message);
                    return {
                        success: true,
                        error: false,
                        message: `Teacher ${teacher.name} ${teacher.surname} deleted from database, but Clerk user deletion failed. Please check Clerk dashboard.`
                    };
                }
            }
        } else {
            // Teacher has no linked Clerk account
            console.info(`Teacher ${teacher.name} ${teacher.surname} deleted from database. No linked Clerk user to delete.`);
        }

        // revalidatePath("/list/teachers");
        const finalMessage = teacher.clerkUserId
            ? `Teacher ${teacher.name} ${teacher.surname} deleted successfully`
            : `Teacher ${teacher.name} ${teacher.surname} deleted from database. No linked Clerk account.`;
        return { success: true, error: false, message: finalMessage };
    } catch (err: any) {
        console.error("Error deleting teacher:", err);
        return { success: false, error: true, message: err.message || "Failed to delete teacher" };
    }
};

/**
 * Links a Clerk user account to an existing teacher by clerkUserId.
 * 
 * This is useful for teachers created without a Clerk account or when
 * manual linking is needed after account creation.
 * 
 * @param currentState - Current form state
 * @param data - Object containing teacherId and clerkUserId
 * @returns Success/error state with descriptive message
 */
export const linkTeacherToClerkUser = async (
    currentState: CurrentState,
    data: { teacherId: string; clerkUserId: string }
) => {
    const { teacherId, clerkUserId } = data;

    // Validate inputs
    if (!teacherId || teacherId.trim() === "") {
        console.error("Invalid teacher ID provided");
        return { success: false, error: true, message: "Invalid teacher ID" };
    }

    if (!clerkUserId || clerkUserId.trim() === "") {
        console.error("Invalid Clerk user ID provided");
        return { success: false, error: true, message: "Invalid Clerk user ID" };
    }

    try {
        // Verify teacher exists
        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
            select: { id: true, name: true, surname: true, clerkUserId: true },
        });

        if (!teacher) {
            return { success: false, error: true, message: "Teacher not found" };
        }

        // Check if teacher already has a different clerkUserId
        if (teacher.clerkUserId && teacher.clerkUserId !== clerkUserId) {
            return {
                success: false,
                error: true,
                message: `Teacher is already linked to Clerk user ${teacher.clerkUserId}. Please unlink first.`,
            };
        }

        // Verify Clerk user exists
        try {
            const clerk = await clerkClient();
            const clerkUser = await clerk.users.getUser(clerkUserId);

            if (!clerkUser) {
                return { success: false, error: true, message: "Clerk user not found" };
            }

            // Update teacher with clerkUserId
            await prisma.teacher.update({
                where: { id: teacherId },
                data: { clerkUserId },
            });

            console.info(`Successfully linked teacher ${teacher.name} ${teacher.surname} to Clerk user ${clerkUserId}`);
            return {
                success: true,
                error: false,
                message: `Successfully linked ${teacher.name} ${teacher.surname} to Clerk account`,
            };
        } catch (clerkError: any) {
            console.error("Clerk user verification failed:", clerkError?.message);
            return {
                success: false,
                error: true,
                message: `Clerk user ${clerkUserId} not found or invalid`,
            };
        }
    } catch (err: any) {
        console.error("Error linking teacher to Clerk user:", err);
        return { success: false, error: true, message: err.message || "Failed to link teacher" };
    }
};

/**
 * Unlinks a Clerk user account from a teacher by setting clerkUserId to null.
 * 
 * @param currentState - Current form state
 * @param data - FormData containing the teacher ID
 * @returns Success/error state with descriptive message
 */
export const unlinkTeacherFromClerkUser = async (
    currentState: CurrentState,
    data: FormData
) => {
    const teacherId = data.get("teacherId") as string;

    // Validate input
    if (!teacherId || teacherId.trim() === "") {
        console.error("Invalid teacher ID provided");
        return { success: false, error: true, message: "Invalid teacher ID" };
    }

    try {
        // Verify teacher exists
        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
            select: { id: true, name: true, surname: true, clerkUserId: true },
        });

        if (!teacher) {
            return { success: false, error: true, message: "Teacher not found" };
        }

        if (!teacher.clerkUserId) {
            return {
                success: false,
                error: true,
                message: "Teacher is not linked to any Clerk account",
            };
        }

        // Unlink by setting clerkUserId to null
        await prisma.teacher.update({
            where: { id: teacherId },
            data: { clerkUserId: null },
        });

        console.info(`Successfully unlinked teacher ${teacher.name} ${teacher.surname} from Clerk user ${teacher.clerkUserId}`);
        return {
            success: true,
            error: false,
            message: `Successfully unlinked ${teacher.name} ${teacher.surname} from Clerk account`,
        };
    } catch (err: any) {
        console.error("Error unlinking teacher from Clerk user:", err);
        return { success: false, error: true, message: err.message || "Failed to unlink teacher" };
    }
};

// Helper function to sanitize username for Clerk
const sanitizeUsername = (username: string): string => {
    // Remove all characters that are not letters, numbers, hyphens, or underscores
    return username.replace(/[^a-zA-Z0-9_-]/g, '_');
};

export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema
) => {
    console.log(data);
    try {
        if (!data.password || data.password.length < 8) {
            console.error("Password is required and must be at least 8 characters");
            return {
                success: false,
                error: true,
                message: "Password is required and must be at least 8 characters long!"
            };
        }

        const classItem = await prisma.class.findUnique({
            where: { id: data.classId },
            include: { _count: { select: { students: true } } },
        });

        if (classItem && classItem.capacity === classItem._count.students) {
            return {
                success: false,
                error: true,
                message: `Class ${classItem.name} is already at full capacity (${classItem.capacity} students)!`
            };
        }

        // Sanitize username to ensure it only contains valid characters
        const sanitizedUsername = sanitizeUsername(data.username);

        const clerk = await clerkClient();
        const user = await clerk.users.createUser({
            username: sanitizedUsername,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            ...(data.email && { emailAddress: [data.email] }),
            publicMetadata: { role: "student" }
        });

        await prisma.student.create({
            data: {
                id: user.id,
                username: sanitizedUsername,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId || null,
                parentId: data.parentId && data.parentId.trim() !== "" ? data.parentId : null,
            },
        });

        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error creating student:", err);
        console.error("Clerk errors:", err?.errors);

        // Extract user-friendly error message from Clerk errors
        if (err?.errors && Array.isArray(err.errors) && err.errors.length > 0) {
            const clerkError = err.errors[0];
            if (clerkError.message) {
                return {
                    success: false,
                    error: true,
                    message: clerkError.message
                };
            }
        }

        // Fallback error messages
        if (err?.message) {
            return {
                success: false,
                error: true,
                message: err.message
            };
        }

        return {
            success: false,
            error: true,
            message: "Failed to create student. Please check your input and try again."
        };
    }
};

export const updateStudent = async (
    currentState: CurrentState,
    data: StudentSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        // Try to update Clerk user if it exists
        try {
            const clerk = await clerkClient();
            await clerk.users.updateUser(data.id, {
                username: data.username,
                ...(data.password !== "" && { password: data.password }),
                firstName: data.name,
                lastName: data.surname,
            });
        } catch (clerkError: any) {
            // If the user doesn't exist in Clerk (404), that's okay - continue with DB update
            if (clerkError?.status !== 404) {
                console.warn("Clerk update failed (non-404):", clerkError?.message);
            }
        }

        // Update the database
        await prisma.student.update({
            where: {
                id: data.id,
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId || null,
                parentId: data.parentId && data.parentId.trim() !== "" ? data.parentId : null,
            },
        });
        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteStudent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        // Delete all related data in a transaction
        await prisma.$transaction(async (tx) => {
            // 1. Delete all results for this student
            await tx.result.deleteMany({
                where: { studentId: id },
            });

            // 2. Delete all attendance records for this student
            await tx.attendance.deleteMany({
                where: { studentId: id },
            });

            // 3. Delete the student from database
            await tx.student.delete({
                where: { id: id },
            });
        });

        // Try to delete Clerk user if it exists
        try {
            const clerk = await clerkClient();
            await clerk.users.deleteUser(id);
        } catch (clerkError: any) {
            // If the user doesn't exist in Clerk (404), that's okay
            if (clerkError?.status !== 404) {
                console.warn("Clerk delete failed (non-404):", clerkError?.message);
            }
        }

        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

/**
 * Deletes a parent from the database and optionally from Clerk.
 * 
 * When a parent is deleted, their students' parentId is automatically set to NULL
 * due to the onDelete: SetNull constraint in the schema.
 * 
 * @param currentState - Current form state
 * @param data - FormData containing the parent ID
 * @returns Success/error state with descriptive message
 */
export const deleteParent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    // Validate id
    if (!id || id.trim() === "") {
        console.error("Invalid parent ID provided");
        return { success: false, error: true, message: "Invalid parent ID" };
    }

    try {
        // Fetch the parent first to verify existence
        const parent = await prisma.parent.findUnique({
            where: { id },
            select: { id: true, name: true, surname: true, students: true },
        });

        if (!parent) {
            console.warn(`Parent with id ${id} not found`);
            return { success: false, error: true, message: "Parent not found or already deleted" };
        }

        // Delete the parent from database
        // Students' parentId will automatically be set to NULL due to onDelete: SetNull
        await prisma.parent.delete({
            where: { id },
        });

        // Try to delete Clerk user if it exists
        try {
            const clerk = await clerkClient();
            await clerk.users.deleteUser(id);
            console.info(`Successfully deleted parent ${parent.name} ${parent.surname} and their Clerk account`);
        } catch (clerkError: any) {
            // If the user doesn't exist in Clerk (404), that's okay
            if (clerkError?.status === 404) {
                console.info(`Clerk user ${id} not found (404) - already deleted or never existed`);
            } else {
                console.warn("Clerk delete failed (non-404):", clerkError?.message);
                return {
                    success: true,
                    error: false,
                    message: `Parent ${parent.name} ${parent.surname} deleted from database, but Clerk user deletion failed.`
                };
            }
        }

        const studentCount = parent.students.length;
        const studentMessage = studentCount > 0
            ? ` ${studentCount} student${studentCount > 1 ? 's' : ''} now have no assigned parent.`
            : '';

        // revalidatePath("/list/parents");
        return {
            success: true,
            error: false,
            message: `Parent ${parent.name} ${parent.surname} deleted successfully.${studentMessage}`
        };
    } catch (err: any) {
        console.error("Error deleting parent:", err);
        return { success: false, error: true, message: err.message || "Failed to delete parent" };
    }
};

export const createParent = async (
    currentState: CurrentState,
    data: ParentSchema
) => {
    try {
        if (!data.password || data.password.length < 8) {
            console.error("Password is required and must be at least 8 characters");
            return {
                success: false,
                error: true,
                message: "Password is required and must be at least 8 characters long!"
            };
        }

        // Sanitize username to ensure it only contains valid characters
        const sanitizedUsername = sanitizeUsername(data.username);

        const clerk = await clerkClient();
        const user = await clerk.users.createUser({
            username: sanitizedUsername,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            ...(data.email && { emailAddress: [data.email] }),
            publicMetadata: { role: "parent" }
        });

        await prisma.parent.create({
            data: {
                id: user.id,
                username: sanitizedUsername,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone,
                address: data.address,
            },
        });

        // revalidatePath("/list/parents");
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error creating parent:", err);
        console.error("Clerk errors:", err?.errors);

        // Extract user-friendly error message from Clerk errors
        if (err?.errors && Array.isArray(err.errors) && err.errors.length > 0) {
            const clerkError = err.errors[0];
            if (clerkError.message) {
                return {
                    success: false,
                    error: true,
                    message: clerkError.message
                };
            }
        }

        // Fallback error messages
        if (err?.message) {
            return {
                success: false,
                error: true,
                message: err.message
            };
        }

        return {
            success: false,
            error: true,
            message: "Failed to create parent. Please check your input and try again."
        };
    }
};

export const updateParent = async (
    currentState: CurrentState,
    data: ParentSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        // Try to update Clerk user if it exists
        try {
            const clerk = await clerkClient();
            await clerk.users.updateUser(data.id, {
                username: data.username,
                ...(data.password !== "" && { password: data.password }),
                firstName: data.name,
                lastName: data.surname,
            });
        } catch (clerkError: any) {
            // If the user doesn't exist in Clerk (404), that's okay - continue with DB update
            if (clerkError?.status !== 404) {
                console.warn("Clerk update failed (non-404):", clerkError?.message);
            }
        }

        // Update the database
        await prisma.parent.update({
            where: {
                id: data.id,
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone,
                address: data.address,
            },
        });

        // revalidatePath("/list/parents");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createExam = async (
    currentState: CurrentState,
    data: ExamSchema
) => {
    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        // if (role === "teacher") {
        //   const teacherLesson = await prisma.lesson.findFirst({
        //     where: {
        //       teacherId: userId!,
        //       id: data.lessonId,
        //     },
        //   });

        //   if (!teacherLesson) {
        //     return { success: false, error: true };
        //   }
        // }

        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateExam = async (
    currentState: CurrentState,
    data: ExamSchema
) => {
    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        // if (role === "teacher") {
        //   const teacherLesson = await prisma.lesson.findFirst({
        //     where: {
        //       teacherId: userId!,
        //       id: data.lessonId,
        //     },
        //   });

        //   if (!teacherLesson) {
        //     return { success: false, error: true };
        //   }
        // }

        await prisma.exam.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteExam = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        await prisma.exam.delete({
            where: {
                id: parseInt(id),
                // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createResult = async (
    currentState: CurrentState,
    data: ResultSchema
) => {
    try {
        await prisma.result.create({
            data: {
                score: data.score,
                ...(data.examId && { examId: data.examId }),
                ...(data.assignmentId && { assignmentId: data.assignmentId }),
                studentId: data.studentId,
            },
        });

        // revalidatePath("/list/results");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateResult = async (
    currentState: CurrentState,
    data: ResultSchema
) => {
    try {
        await prisma.result.update({
            where: {
                id: data.id,
            },
            data: {
                score: data.score,
                ...(data.examId && { examId: data.examId }),
                ...(data.assignmentId && { assignmentId: data.assignmentId }),
                studentId: data.studentId,
            },
        });

        // revalidatePath("/list/results");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteResult = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    try {
        await prisma.result.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/results");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createEvent = async (
    currentState: CurrentState,
    data: EventSchema
) => {
    try {
        await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                ...(data.classId && { classId: data.classId }),
            },
        });

        // revalidatePath("/list/events");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateEvent = async (
    currentState: CurrentState,
    data: EventSchema
) => {
    try {
        await prisma.event.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                ...(data.classId && { classId: data.classId }),
            },
        });

        // revalidatePath("/list/events");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteEvent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    try {
        await prisma.event.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/events");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createAnnouncement = async (
    currentState: CurrentState,
    data: AnnouncementSchema
) => {
    try {
        await prisma.announcement.create({
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                ...(data.classId && { classId: data.classId }),
            },
        });

        // revalidatePath("/list/announcements");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateAnnouncement = async (
    currentState: CurrentState,
    data: AnnouncementSchema
) => {
    try {
        await prisma.announcement.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                ...(data.classId && { classId: data.classId }),
            },
        });

        // revalidatePath("/list/announcements");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteAnnouncement = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    try {
        await prisma.announcement.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/announcements");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createLesson = async (
    currentState: CurrentState,
    data: LessonSchema
) => {
    try {
        await prisma.lesson.create({
            data: {
                name: data.name,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                subjectId: data.subjectId,
                classId: data.classId || null,
                teacherId: data.teacherId && data.teacherId.trim() !== "" ? data.teacherId : null,
            },
        });

        // revalidatePath("/list/lessons");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateLesson = async (
    currentState: CurrentState,
    data: LessonSchema
) => {
    try {
        await prisma.lesson.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                subjectId: data.subjectId,
                classId: data.classId || null,
                teacherId: data.teacherId && data.teacherId.trim() !== "" ? data.teacherId : null,
            },
        });

        // revalidatePath("/list/lessons");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteLesson = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    try {
        await prisma.lesson.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/lessons");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

// ASSIGNMENT ACTIONS

export const createAssignment = async (
    currentState: CurrentState,
    data: AssignmentSchema
) => {
    try {
        const { userId, sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;

        // If teacher, verify they own the lesson
        if (role === "teacher") {
            const lesson = await prisma.lesson.findUnique({
                where: { id: data.lessonId },
                select: { teacherId: true },
            });

            if (!lesson || lesson.teacherId !== userId) {
                return {
                    success: false,
                    error: true,
                    message: "You can only create assignments for your own lessons."
                };
            }
        }

        await prisma.assignment.create({
            data: {
                title: data.title,
                startDate: data.startDate,
                dueDate: data.dueDate,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/assignments");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateAssignment = async (
    currentState: CurrentState,
    data: AssignmentSchema
) => {
    try {
        const { userId, sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;

        // If teacher, verify they own the lesson this assignment belongs to
        if (role === "teacher") {
            const assignment = await prisma.assignment.findUnique({
                where: { id: data.id },
                include: { lesson: { select: { teacherId: true } } },
            });

            if (!assignment || assignment.lesson.teacherId !== userId) {
                return {
                    success: false,
                    error: true,
                    message: "You don't have permission to update this assignment."
                };
            }
        }

        await prisma.assignment.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                startDate: data.startDate,
                dueDate: data.dueDate,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/assignments");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteAssignment = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    try {
        const { userId, sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;

        // If teacher, verify they own the lesson this assignment belongs to
        if (role === "teacher") {
            const assignment = await prisma.assignment.findUnique({
                where: { id: parseInt(id) },
                include: { lesson: { select: { teacherId: true } } },
            });

            if (!assignment || assignment.lesson.teacherId !== userId) {
                return {
                    success: false,
                    error: true,
                    message: "You don't have permission to delete this assignment."
                };
            }
        }

        await prisma.assignment.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/assignments");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

// ============ ATTENDANCE ACTIONS ============

type AttendanceListItem = {
    id: number;
    date: Date;
    present: boolean;
    student: {
        id: string;
        name: string;
        surname: string;
        username: string;
        classId: number | null;
    };
    lesson: {
        id: number;
        name: string;
        startTime: Date;
        endTime: Date;
        classId: number | null;
        teacherId: string | null;
    };
};

type AttendanceListResponse = {
    success: boolean;
    data?: AttendanceListItem[];
    totalCount?: number;
    error?: string;
};

/**
 * Get attendance list with role-based filtering
 */
export const getAttendanceList = async (
    filters: {
        date?: string;
        gradeId?: number;
        classId?: number;
        lessonId?: number;
        search?: string;
        status?: 'present' | 'absent' | 'all';
        page?: number;
        limit?: number;
    }
): Promise<AttendanceListResponse> => {
    try {
        const { userId, sessionClaims } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        const role = (sessionClaims?.metadata as { role?: string })?.role;
        const limit = filters.limit || 25;
        const skip = ((filters.page || 1) - 1) * limit;

        // Base where clause
        const where: any = {};

        // Date filter (required)
        if (filters.date) {
            const targetDate = new Date(filters.date);
            const nextDate = new Date(targetDate);
            nextDate.setDate(nextDate.getDate() + 1);

            where.date = {
                gte: targetDate,
                lt: nextDate,
            };
        }

        // Status filter
        if (filters.status && filters.status !== 'all') {
            where.present = filters.status === 'present';
        }

        // Lesson filter
        if (filters.lessonId) {
            where.lessonId = filters.lessonId;
        }

        // Role-based filtering
        if (role === "teacher") {
            // Teachers can only see attendance for lessons they teach or classes they supervise
            where.lesson = {
                OR: [
                    { teacherId: userId },
                    { class: { supervisorId: userId } }
                ]
            };

            // If lessonId filter is provided, verify teacher owns it
            if (filters.lessonId) {
                const lesson = await prisma.lesson.findUnique({
                    where: { id: filters.lessonId },
                    include: { class: true }
                });

                if (lesson && lesson.teacherId !== userId && lesson.class?.supervisorId !== userId) {
                    return { success: false, error: "Access denied to this lesson" };
                }
            }
        } else if (role === "parent") {
            // Parents can only see attendance for their own students
            where.student = {
                parentId: userId
            };
        }

        // Class filter (admin and teachers with access)
        if (filters.classId) {
            if (role === "teacher") {
                // Verify teacher has access to this class
                const classItem = await prisma.class.findUnique({
                    where: { id: filters.classId },
                    include: {
                        lessons: {
                            where: { teacherId: userId }
                        }
                    }
                });

                if (!classItem || (classItem.supervisorId !== userId && classItem.lessons.length === 0)) {
                    return { success: false, error: "Access denied to this class" };
                }
            }

            where.student = {
                ...where.student,
                classId: filters.classId
            };
        }

        // Grade filter (admin only)
        if (filters.gradeId && role === "admin") {
            where.student = {
                ...where.student,
                gradeId: filters.gradeId
            };
        }

        // Search filter
        if (filters.search) {
            where.student = {
                ...where.student,
                OR: [
                    { name: { contains: filters.search, mode: 'insensitive' } },
                    { surname: { contains: filters.search, mode: 'insensitive' } },
                    { username: { contains: filters.search, mode: 'insensitive' } }
                ]
            };
        }

        // Fetch attendance records
        const [attendances, totalCount] = await prisma.$transaction([
            prisma.attendance.findMany({
                where,
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                            username: true,
                            classId: true
                        }
                    },
                    lesson: {
                        select: {
                            id: true,
                            name: true,
                            startTime: true,
                            endTime: true,
                            classId: true,
                            teacherId: true
                        }
                    }
                },
                orderBy: [
                    { lesson: { startTime: 'asc' } },
                    { student: { name: 'asc' } }
                ],
                take: limit,
                skip
            }),
            prisma.attendance.count({ where })
        ]);

        return {
            success: true,
            data: attendances,
            totalCount
        };
    } catch (err) {
        console.error("Error fetching attendance:", err);
        return { success: false, error: "Failed to fetch attendance" };
    }
};

/**
 * Create or update attendance in bulk (upsert)
 */
export const createBulkAttendance = async (
    data: {
        date: Date;
        lessonId: number;
        studentIds: string[];
        defaultPresent?: boolean;
    }
): Promise<CurrentState> => {
    try {
        const { userId, sessionClaims } = await auth();
        if (!userId) {
            return { success: false, error: true, message: "Unauthorized" };
        }

        const role = (sessionClaims?.metadata as { role?: string })?.role;

        // Verify lesson access for teachers
        if (role === "teacher") {
            const lesson = await prisma.lesson.findUnique({
                where: { id: data.lessonId },
                include: { class: true }
            });

            if (!lesson) {
                return { success: false, error: true, message: "Lesson not found" };
            }

            if (lesson.teacherId !== userId && lesson.class?.supervisorId !== userId) {
                return { success: false, error: true, message: "Access denied to this lesson" };
            }
        } else if (role === "parent") {
            return { success: false, error: true, message: "Parents cannot create attendance" };
        }

        // Normalize date to start of day
        const attendanceDate = new Date(data.date);
        attendanceDate.setHours(0, 0, 0, 0);

        // Batch upsert attendance records using transaction callback
        await prisma.$transaction(async (tx) => {
            for (const studentId of data.studentIds) {
                // Try to find existing record
                const existing = await tx.attendance.findFirst({
                    where: {
                        date: attendanceDate,
                        lessonId: data.lessonId,
                        studentId
                    }
                });

                if (existing) {
                    // Update existing
                    await tx.attendance.update({
                        where: { id: existing.id },
                        data: { present: data.defaultPresent || false }
                    });
                } else {
                    // Create new
                    await tx.attendance.create({
                        data: {
                            date: attendanceDate,
                            lessonId: data.lessonId,
                            studentId,
                            present: data.defaultPresent || false
                        }
                    });
                }
            }
        });

        return { success: true, error: false, message: "Attendance records created/updated successfully" };
    } catch (err) {
        console.error("Error creating bulk attendance:", err);
        return { success: false, error: true, message: "Failed to create attendance records" };
    }
};

/**
 * Update single attendance record (toggle present/absent)
 */
export const updateAttendance = async (
    id: number,
    present: boolean
): Promise<CurrentState> => {
    try {
        const { userId, sessionClaims } = await auth();
        if (!userId) {
            return { success: false, error: true, message: "Unauthorized" };
        }

        const role = (sessionClaims?.metadata as { role?: string })?.role;

        // Parents cannot update attendance
        if (role === "parent") {
            return { success: false, error: true, message: "Parents cannot update attendance" };
        }

        // Verify access for teachers
        if (role === "teacher") {
            const attendance = await prisma.attendance.findUnique({
                where: { id },
                include: {
                    lesson: {
                        include: { class: true }
                    }
                }
            });

            if (!attendance) {
                return { success: false, error: true, message: "Attendance record not found" };
            }

            if (attendance.lesson.teacherId !== userId && attendance.lesson.class?.supervisorId !== userId) {
                return { success: false, error: true, message: "Access denied" };
            }
        }

        await prisma.attendance.update({
            where: { id },
            data: { present }
        });

        return { success: true, error: false };
    } catch (err) {
        console.error("Error updating attendance:", err);
        return { success: false, error: true, message: "Failed to update attendance" };
    }
};

/**
 * Delete attendance record (admin only)
 */
export const deleteAttendance = async (
    formData: FormData
): Promise<CurrentState> => {
    try {
        const { userId, sessionClaims } = await auth();
        if (!userId) {
            return { success: false, error: true, message: "Unauthorized" };
        }

        const role = (sessionClaims?.metadata as { role?: string })?.role;

        // Only admins can delete attendance
        if (role !== "admin") {
            return { success: false, error: true, message: "Only admins can delete attendance" };
        }

        const id = formData.get("id");
        if (!id) {
            return { success: false, error: true, message: "Attendance ID is required" };
        }

        await prisma.attendance.delete({
            where: { id: parseInt(id as string) }
        });

        return { success: true, error: false };
    } catch (err) {
        console.error("Error deleting attendance:", err);
        return { success: false, error: true, message: "Failed to delete attendance" };
    }
};
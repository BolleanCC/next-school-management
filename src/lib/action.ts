"use server";

import { revalidatePath } from "next/cache";
import { SubjectSchema, subjectSchema, deleteSchema, classSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = {
    error: boolean;
    success: boolean;
};

export const createSubject = async (
    currentState: CurrentState,
    formData: FormData
) => {
    try {
        const data = {
            name: formData.get("name"),
            teachers: formData.getAll("teachers"),
        };
        const validatedData = subjectSchema.parse(data);

        await prisma.subject.create({
            data: {
                name: validatedData.name,
                teachers: {
                    connect: validatedData.teachers.map((teacherId) => ({ id: teacherId })),
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
    formData: FormData
) => {
    try {
        const data = {
            id: formData.get("id"),
            name: formData.get("name"),
            teachers: formData.getAll("teachers"),
        };
        const validatedData = subjectSchema.parse(data);

        await prisma.subject.update({
            where: { id: validatedData.id },
            data: {
                name: validatedData.name,
                teachers: {
                    set: validatedData.teachers.map((teacherId) => ({ id: teacherId })),
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
    formData: FormData
) => {
    try {
        const data = Object.fromEntries(formData.entries());
        const validatedData = deleteSchema.parse(data);

        await prisma.subject.delete({
            where: { id: validatedData.id },
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
    formData: FormData
) => {
    try {
        const data = {
            name: formData.get("name"),
            teachers: formData.getAll("teachers"),
            capacity: formData.get("capacity"),
            gradeId: formData.get("gradeId"),
            supervisorId: formData.get("supervisorId"),
        };
        const validatedData = classSchema.parse(data);

        await prisma.class.create({
            data: {
                name: validatedData.name,
                capacity: validatedData.capacity,
                gradeId: validatedData.gradeId,
                supervisorId: validatedData.supervisorId,
            },
        });

        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateClass = async (
    currentState: CurrentState,
    formData: FormData
) => {
    try {
        const data = {
            id: formData.get("id"),
            name: formData.get("name"),
            capacity: formData.get("capacity"),
            gradeId: formData.get("gradeId"),
            supervisorId: formData.get("supervisorId"),
        };

        console.log("Update Class - Raw data:", data);
        const validatedData = classSchema.parse(data);
        console.log("Update Class - Validated data:", validatedData);

        await prisma.class.update({
            where: { id: validatedData.id },
            data: {
                name: validatedData.name,
                capacity: validatedData.capacity,
                gradeId: validatedData.gradeId,
                supervisorId: validatedData.supervisorId,
            },
        });

        //revalidatePath("/list/classes");
        return { success: true, error: false };
    } catch (err) {
        console.log("Update Class Error:", err);
        return { success: false, error: true };
    }
};

export const deleteClass = async (
    currentState: CurrentState,
    formData: FormData
) => {
    try {
        const data = Object.fromEntries(formData.entries());
        const validatedData = deleteSchema.parse(data);

        await prisma.class.delete({
            where: { id: validatedData.id },
        });

        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};
"use server";

import { revalidatePath } from "next/cache";
import { SubjectSchema, subjectSchema, deleteSchema } from "./formValidationSchemas";
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
        const data = Object.fromEntries(formData.entries());
        const validatedData = subjectSchema.parse(data);

        await prisma.subject.create({
            data: {
                name: validatedData.name,
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
        const data = Object.fromEntries(formData.entries());
        const validatedData = subjectSchema.parse(data);

        await prisma.subject.update({
            where: { id: validatedData.id },
            data: {
                name: validatedData.name,
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


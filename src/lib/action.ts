"use server";

import { revalidatePath } from "next/cache";
import { SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = {
    error: boolean;
    success: boolean;
};

export const createSubject = async (currentState: CurrentState, data: SubjectSchema) => {
    try {
        await prisma.subject.create({
            data: { name: data.name },
        });
        revalidatePath("/list/subjects");
        return { error: false, success: true };
    } catch (error) {
        return { error: true, success: false };
        console.error(error);
    }
};
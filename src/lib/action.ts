"use server";

import { revalidatePath } from "next/cache";
import { SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = {
    error: boolean;
    success: boolean;
};

export const createSubject = async (currentState: CurrentState, data: FormData) => {
    console.log("Server action called with:", data.get("name"));
    try {
        const name = data.get("name") as string;
        await prisma.subject.create({
            data: { name },
        });
        console.log("Subject created successfully");
        return { error: false, success: true };
    } catch (error) {
        console.error("Error creating subject:", error);
        return { error: true, success: false };
    }
};
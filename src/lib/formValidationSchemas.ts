import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z
        .string()
        .min(1, { message: "Subject name is required!" }),
    teachers: z.array(z.string()) // teachers id array
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const deleteSchema = z.object({
    id: z.coerce.number()
});

export type DeleteSchema = z.infer<typeof deleteSchema>;
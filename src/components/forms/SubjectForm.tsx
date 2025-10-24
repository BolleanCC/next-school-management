"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject } from "@/lib/action";
import { useEffect, useActionState, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const SubjectForm = ({
    type,
    data,
    setOpen,
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const {
        register,
        formState: { errors },
    } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
    });

    // ACTION STATE
    const [state, formAction] = useActionState(createSubject, { error: false, success: false });
    const router = useRouter();

    useEffect(() => {
        console.log("State changed:", state);
        if (state?.success) {
            toast(`Subject has been ${type === "create" ? "created" : "updated"} successfully!`);
            setOpen(false);
            router.refresh(); // refresh the page to show the new subject
        }
        if (state?.error) {
            toast.error("Something went wrong!");
        }
    }, [state, type]);

    return (
        <form className="flex flex-col gap-8" action={formAction}>
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new subject" : "Update subject"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
            </div>
            {state.error && <span className="text-red-500">Something went wrong!</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default SubjectForm;
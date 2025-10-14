"use client";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ count, page }: { count: number, page: number }) => {
    const router = useRouter();

    const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
    const hasNext = ITEMS_PER_PAGE * page < count;

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set("page", newPage.toString());
        router.push(`${window.location.pathname}?${params}`);
    };

    return <div className="flex items-center justify-between text-gray-500 mt-4">
        <button disabled={!hasPrev} className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 cursor-pointer:not-allowed" onClick={() => changePage(page - 1)}>Prev</button>
        <div className="flex items-center gap-2 text-sm">
            {Array.from(
                { length: Math.ceil(count / ITEMS_PER_PAGE) },
                (_, index) => {
                    const pageIndex = index + 1;
                    return (
                        <button
                            key={pageIndex}
                            className={`px-2 rounded-sm ${page === pageIndex ? "bg-sky" : ""
                                }`}
                            onClick={() => changePage(pageIndex)}
                        >
                            {pageIndex}
                        </button>
                    );
                }
            )}
        </div>
        <button disabled={!hasNext} className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 cursor-pointer:not-allowed" onClick={() => changePage(page + 1)}>Next</button>
    </div>;
};

export default Pagination;
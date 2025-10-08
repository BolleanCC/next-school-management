"use client";
const Pagination = () => {
    return <div className="flex items-center justify-between text-gray-500">
        <button disabled={true} className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 cursor-pointer:not-allowed">Prev</button>
        <div className="flex items-center gap-2">
            <button className="px-2 rounded-md bg-sky">1</button>
            <button className="px-2 rounded-md">2</button>
            <button className="px-2 rounded-md">3</button>
            ...
            <button className="px-2 rounded-md">10</button>
        </div>
        <button disabled={true} className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 cursor-pointer:not-allowed">Next</button>
    </div>;
};

export default Pagination;
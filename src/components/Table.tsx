const Table = ({ columns, renderRow, data, relatedData }: { columns: { header: string, accessor: string, className?: string }[], renderRow: (item: any, relatedData?: any) => React.ReactNode, data: any[], relatedData?: any }) => {
    return <table className="w-full mt-4">
        <thead>
            <tr className="text-left text-gray-500 text-sm">
                {columns.map((column) => (
                    <th key={column.accessor} className={column.className}>{column.header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((item) => renderRow(item, relatedData))}
        </tbody>
    </table>;
};

export default Table;
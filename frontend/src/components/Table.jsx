function Table({
    columns,
    children,
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        {columns.map((column) => (
                            <th
                                key={column}
                                className="
                                    px-6
                                    py-4
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                {column}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {children}

                </tbody>

            </table>

        </div>
    );
}

export default Table;
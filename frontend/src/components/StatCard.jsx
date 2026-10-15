function StatCard({
    title,
    value,
    icon,
    color,
}) {

    const Icon = icon;

    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-slate-200
                p-6
            "
        >

            <div className="flex justify-between">

                <div>

                    <p className="text-slate-500">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-4">

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                        w-14
                        h-14
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${color}
                    `}
                >

                    <Icon
                        size={28}
                        className="text-white"
                    />

                </div>

            </div>

        </div>

    );
}

export default StatCard;
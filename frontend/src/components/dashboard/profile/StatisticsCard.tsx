interface StatisticsCardProps {
    title: string;
    value: string | number;
}

export default function StatisticsCard({
    title,
    value,
}: StatisticsCardProps) {

    return (

        <div
            className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#46A6D9]
                hover:shadow-lg
            "
        >

            <p
                className="
                    text-sm
                    font-medium
                    leading-6
                    text-slate-500
                "
            >
                {title}
            </p>

            <h3
                className="
                    mt-3
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#183B73]
                    sm:text-4xl
                "
            >
                {value}
            </h3>

        </div>

    );
}
import Button from "./Button";

function PageHeader({
    title,
    subtitle,
    buttonText,
    onClick,
}) {
    return (
        <div className="flex items-center justify-between mb-8">

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    {title}
                </h1>

                <p className="text-slate-500 mt-1">
                    {subtitle}
                </p>

            </div>

            {buttonText && (
                <Button onClick={onClick}>
                    {buttonText}
                </Button>
            )}

        </div>
    );
}

export default PageHeader;
function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    className = "",
    disabled = false,
}) {
    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-gray-600 hover:bg-gray-700 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-5
                py-2.5
                rounded-lg
                font-medium
                transition
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;
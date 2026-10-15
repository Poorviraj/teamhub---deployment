function SearchBox({
    value,
    onChange,
    placeholder,
}) {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="
                w-full
                md:w-80
                px-4
                py-3
                rounded-xl
                border
                border-slate-300
                bg-white
                focus:ring-2
                focus:ring-blue-500
                outline-none
            "
        />
    );
}

export default SearchBox;
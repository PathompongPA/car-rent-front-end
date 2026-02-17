export default function InputText({ children, className, onChange, value, ...props }) {
    return (
        <input
            type="text"
            name={children}
            className={` ${className} text-gray-400`}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={children}
            {...props}
        />
    )

};

export default function InputSearch({ children, className, onChange, ...props }) {
    return (
        <input className={`w-fit ${className}`} type="text" placeholder={children} {...props} onChange={(e) => onChange(e.target.value)} />)
};

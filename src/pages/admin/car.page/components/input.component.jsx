export default function TextInput({ children, onChange, value, ...prop }) {
    return <input type="text" onChange={(e) => onChange(e.target.value)} placeholder={children} value={value || ""} {...prop} />
};

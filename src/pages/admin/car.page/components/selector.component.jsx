export default function Selector({ children, option, }) {
    let options = option?.map(({ id, name }) => <option value={id}>{name}</option>)
    return (
        <select >
            <option value="">{children}</option>
            {options}
        </select>
    )

};

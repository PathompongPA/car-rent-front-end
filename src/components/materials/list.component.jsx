import { cva } from "class-variance-authority"

let styleList = cva("")
export default function List({ children, className, ...props }) {
    return <ul className={styleList({ className })} {...props}>{children}</ul>
};

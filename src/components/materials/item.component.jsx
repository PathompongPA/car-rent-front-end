import { cva } from "class-variance-authority"

let styleItem = cva("")
export default function Item({ children, className, ...props }) {
    return <li className={styleItem({ className })} {...props} >{children}</li>
};

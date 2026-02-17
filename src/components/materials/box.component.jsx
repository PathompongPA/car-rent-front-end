import { cva } from "class-variance-authority";

let styleBox = cva(
    "",
    {
        variants: {
            variant: {}
        }
    }
)
export default function Box({ children, variant, className, ...prop }) {
    return <div className={styleBox({ variant, className })} {...prop} >{children}</div>

};

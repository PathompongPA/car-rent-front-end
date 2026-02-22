import { cva } from "class-variance-authority"

let style = cva(" font-bold", {
    variants: {
        size: {
            s: "",
            m: "text-2xl",
            l: "text-3xl",
            xl: "text-4xl"
        }
    },
})
export default function Title({ children, className, size, ...prop }) {
    return (
        <h1 className={style({ className, size })} {...prop} >{children}</h1>
    )
};

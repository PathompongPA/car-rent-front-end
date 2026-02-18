import { cva } from "class-variance-authority"

let style = {
    text: cva(" text-nowrap", {
        variants: {
            variant: {
                title: "text-3xl",
                subtitle: "text-2xl",
                description: "text-base",
            },
        }, defaultVariants: {
            variant: "description"
        }
    })
}
export default function Text({ children, className, variant }) {
    return <h1 className={style.text({ className, variant })}>{children}</h1>
};

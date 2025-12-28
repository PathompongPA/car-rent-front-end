import { cva } from "class-variance-authority"
import { cn } from "../../../../utility"

let titleVariant = cva(
    "",
    {
        variants: {
            variant: {
                "primary": " text-4xl",
                "secondary": "text-2xl",
                "third": "text-xl"
            }
        },
        defaultVariants: {
            variant: "primary"
        }
    }
)

export default function Title({ children, className, variant }) {
    return <h1 className={cn(titleVariant({ variant, className }))}>{children}</h1>
};

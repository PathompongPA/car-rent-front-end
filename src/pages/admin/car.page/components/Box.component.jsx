import { cva } from "class-variance-authority"
import { cn } from "../../../../utility"

let boxVariant = cva(
    "gap-2 flex",
    {
        variants: {
            variant: {
                "col": "flex-col",
                "row": "flex-row",
                "row-between": "flex-row justify-between items-center",
            }
        }
    }
)
export default function Box({ children, className, variant, ...props }) {
    return <div className={cn(boxVariant({ variant, className }))} {...props} >{children}</div>
};

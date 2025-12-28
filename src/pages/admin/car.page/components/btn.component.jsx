import { cva } from "class-variance-authority"
import { cn } from "../../../../utility"

let btnVariant = cva(
    "flex justify-center items-center hover:cursor-pointer hover:scale-95 duration-300  hover:text-gray-200 select-none p-2 rounded-lg active:scale-90 ",
    {
        variants: {
            variant: {
                "primary": " bg-gray-700 ",
                "secondary": "bg-gray-800",
                "danger": " bg-red-800 ",
                "success": " bg-lime-800 ",
                "glass": " bg-white/15 text-gray-900  hover:text-gray-900  hover:bg-white/50 active:bg-white/15 ",
                "ghost": "",
            },
            shape: {
                "circle": "rounded-full"
            },
            size: {
                "normal": "text-xl",
                "small": "text-sm"
            }
        }, defaultVariants: {
            variant: "secondary",
            size: "normal"
        }
    }
)
export default function Btn({ children, className, variant, size, shape, onClick }) {
    return <button className={cn(btnVariant({ variant, size, shape, className }))} onClick={onClick}>{children}</button>
};

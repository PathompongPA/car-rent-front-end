import { cva } from "class-variance-authority"

let styleButton = cva(
    " flex flex-row justify-center items-center font-bold hover:scale-95 hover:cursor-pointer duration-300 ease-out hover:brightness-90 active:scale-105  ",
    {
        variants: {
            variant: {
                "secondary": "gap-4",
                "primary": " gap-2",
                "third": " border",
                "glass": "bg-white/20 text-white ",
                "ghost": "bg-none text-blue-2 ",
            },
            active: {
                true: " bg-blue-2 text-golden-1 active:text-golden-1",
                false: ""
            },
            sharp: {
                normal: " rounded-lg ",
                circle: " rounded-full",
            },
            size: {
                m: "",
                l: " py-4 px-6"
            }
        },
        defaultVariants: {
            sharp: "normal",
            active: false,
            size: "m"
        }
    }
)
export default function Button({ children, className, variant, sharp, active, size, onClick, ...prop }) {
    return <button className={styleButton({ variant, sharp, active, size, className })} onClick={onClick} {...prop}>{children}</button>

};

import { cva } from "class-variance-authority"

let style = {
    container: cva(" flex justify-center items-center overflow-hidden aspect-square min-h-[25px]", {}),
    icon: cva("fa-solid ", {
        variants: {
            variant: {
                pre: "fa-angle-left",
                next: "fa-angle-right",
                car: "fa-car",
                calendar: "fa-calendar",
                phone: "fa-phone",
                down: "fa-angle-down",
                newTab: "fa-arrow-up-right-from-square"
            },
            size: {
                s: "fa-sm",
                m: "fa-lg",
                l: "fa-xl",
                xl: "fa-2xl"
            }
        }, defaultVariants: {
            size: "l"
        }
    }
    )
}
export default function Icon({ variant, size, className }) {
    return (
        <div className={style.container({ className })}>
            <i className={style.icon({ variant, size })}></i>
        </div>
    )
};

import { cva } from "class-variance-authority"

let style = {
    icon: cva("fa-solid ", {
        variants: {
            variant: {
                next: "fa-angle-left fa-fade",
                car: "fa-car",
                calendar: "fa-calendar",
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
export default function Icon({ variant }) {
    return <i className={style.icon({ variant })}></i>
};

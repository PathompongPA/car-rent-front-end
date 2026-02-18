import { cva } from "class-variance-authority"
import { useEffect, useRef } from "react"


function useOption() {
    let ref = useRef()
    useEffect(() => {
        let parentElement = ref?.current?.parentElement
        parentElement?.classList?.add("relative")
    }, [])
    return ref
}

let style = {
    option: cva("absolute", {
        variants: {
            variant: {
                down: "top-full mt-0",
                up: " bottom-full mb-0"
            },
            x: {
                start: "left-0",
                center: "left-1/2 transform -translate-x-1/2",
                end: "right-0 "
            }
        }, defaultVariants: {
            x: "start"
        }
    }
    )
}

export default function Option({ children, className, x, ...prop }) {
    const ref = useOption();
    return (
        <div className={style.option({ className, x })} ref={ref} {...prop} >{children}</div>
    )
};
import { cva } from "class-variance-authority"
import { useEffect, useRef } from "react"

let styleOverLay = cva(
    " absolute pointer-events-none flex justify-center items-center",
    {
        variants: {
            variant: {
                "overlay": "text-blue-1",
                "pop-up": "bg-black/50 text-white"
            },
            top: {
                start: "top-0",
                center: "top-1/2 transform -translate-y-1/2"

            },
            left: {
                start: "left-0",
                center: "left-1/2 transform -translate-x-1/2"
            }
        }, defaultVariants: {
            variant: "overlay",
            left: "start",
            top: "start"
        }
    }
)

const useOverlay = () => {
    let overlayRef = useRef()
    useEffect(() => {
        let parentElement = overlayRef?.current?.parentElement
        parentElement?.classList?.add("relative")
    }, [])
    return overlayRef
}

export default function OverLay({ className, children, variant, top, left }) {
    let overlayRef = useOverlay()
    return (
        <div ref={overlayRef} className={styleOverLay({ variant, className, top, left })}>{children}</div>
    )

};

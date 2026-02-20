import { cva } from "class-variance-authority";
import { useEffect } from "react";

let style = cva(
    " fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-50 bg-black/50   ",
    {
        variants: {
            isShow: {
                false: " scale-0",
                true: " scale-100",
            }
        }
    }
)

let containerStyle = cva("duration-300 transition-all",
    {
        variants: {
            isShow: {
                false: " scale-0",
                true: " scale-100",
            }
        }
    }

)
export default function Modal({ children, variant, className, onClose, isShow }) {
    useEffect(() => {
        if (isShow) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isShow])
    if (!isShow) return null;
    return (
        <div className={style({ variant, isShow, className })} onClick={onClose} >
            <div className={containerStyle({ isShow })} onClick={(e) => { e.stopPropagation() }}>
                {children}
            </div>
        </div>
    )

};
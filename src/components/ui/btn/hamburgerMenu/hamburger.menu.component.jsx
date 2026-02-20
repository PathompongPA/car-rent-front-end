import { cva } from "class-variance-authority"
import useHamburgerMenu from "./hamburger.menu.hook"

let style = {

    hamburgerMenu: cva(" flex flex-col gap-1 p-2 rounded-[8px] duration-300 active:scale-90", {
        variants: {
            isActive: {
                true: "bg-blue-1",
                false: "bg-white"
            }
        },
        defaultVariants: {
            isActive: false
        }
    }),

    dash: cva("w-[35px] h-[5px]  rounded-2xl duration-300", {
        variants: {
            isActive: {
                true: "bg-white",
                false: "bg-blue-1"
            }
        },
        defaultVariants: {
            isActive: false
        }
    })
}

export default function BtnHamburgerMenu({ className, toggleMenu, isOpenMenu }) {
    const { isActive, on } = useHamburgerMenu(isOpenMenu, toggleMenu);
    return (
        <button className={style.hamburgerMenu({ isActive, className })} onClick={on.click}>
            <div className={style.dash({ isActive })}></div>
            <div className={style.dash({ isActive })}></div>
            <div className={style.dash({ isActive })}></div>
        </button>
    )

};

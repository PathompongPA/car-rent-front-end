import { BtnCallMe, BtnHamburgerMenu, BtnLanguage, BtnLine } from "..";
import { List, Logo } from "../../materials";
import { cva } from "class-variance-authority";
import useNavigationBar from "./navbar.hook";

let style = {
    bar: cva(" border-b-4 border-amber-400 w-full h-fit sticky top-0 z-105 bg-white "),
    container: cva(" h-full flex flex-row justify-between px-4 gap-8 items-center w-full  xl:px-8 relative"),
    logo: cva(""),
    list: cva(" overflow-hidden duration-300 ease-out flex flex-col md:flex-row absolute h-screen gap-8 px-8 top-full left-0  bg-white/50 backdrop-blur-sm mt-1  w-full md:p-0 md:static md:h-fit md:gap-8 md:justify-end z-99", {
        variants: {
            isOpenMenu: {
                true: " max-h-screen py-8 ",
                false: "max-h-0 md:max-h-fit"
            }
        },
        defaultVariants: {
            isOpenMenu: false
        }
    }),
    menu: cva(" text-blue-1 font-bold text-[20px] xl:text-base text-start active:scale-90 hover:cursor-pointer active:text-amber-400 duration-300  "),
    BtnHamburgerMenu: cva("md:hidden")
}

export default function NavigationBar() {
    const { isOpenMenu, state, on } = useNavigationBar();

    return (
        <div className={style.bar()} >
            <div className={style.container()}>
                <BtnHamburgerMenu className={style.BtnHamburgerMenu()} isOpenMenu={state.isOpenMenu} toggleMenu={on.click.hamburgerMenu} />
                <Logo className={style.logo()} src={state?.logo} onClick={on.click.logo} />
                <List className={style.list({ isOpenMenu })}>
                    {state?.navbar?.map((item, key) => <button className={style.menu()} onClick={() => on?.click?.menu(item?.link)} key={key}>{item?.text}</button>)}
                </List>
                <div className=" flex flex-row items-center justify-center gap-4 py-2">
                    <BtnLine />
                    <BtnLanguage />
                    <BtnCallMe />
                </div>
            </div>
        </div>
    )
};

import { BtnHamburgerMenu } from "..";
import { Item, List, Logo } from "../../materials";
import { cva } from "class-variance-authority";
import useNavigationBar from "./navbar.hook";

let style = {
    bar: cva(" border-b-4 border-amber-400 w-full sticky top-0 z-99 bg-white "),
    container: cva(" flex flex-row justify-between px-4 gap-8 items-center w-full md:max-w-[1070px] relative"),
    logo: cva(""),
    list: cva(" flex flex-col md:flex-row absolute h-screen gap-8 p-8 top-full left-0 bg-white  mt-1 w-full xl:static xl:h-fit xl:gap-4 xl:justify-end z-99", {
        variants: {
            isOpenMenu: {
                true: "",
                false: "hidden xl:flex"
            }
        },
        defaultVariants: {
            isOpenMenu: false
        }
    }),
    menu: cva(" text-blue-1 font-bold text-base text-start active:scale-90 hover:cursor-pointer active:text-amber-400 duration-300  "),
    BtnHamburgerMenu: cva("md:hidden")
}

export default function NavigationBar() {
    const { isOpenMenu, state, on } = useNavigationBar();

    return (
        <div className={style.bar()} >
            <div className={style.container()}>
                <BtnHamburgerMenu className={style.BtnHamburgerMenu()} isOpenMenu={state.isOpenMenu} toggleMenu={on.click.hamburgerMenu} />
                <Logo className={style.logo()} src={state?.logo} onClick={on.click.logo} />
                <BtnHamburgerMenu className={style.BtnHamburgerMenu()} />
                <List className={style.list({ isOpenMenu })}>
                    {state?.navbar?.map((item, key) => <button className={style.menu()} onClick={() => on?.click?.menu(item?.link)} key={key}>{item?.text}</button>)}
                </List>
            </div>
        </div>
    )
};

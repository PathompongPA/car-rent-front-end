import { cva } from "class-variance-authority";
import useFormNavbar from "./navbar.content.admin.hook";

let style = {
    container: cva(" bg-bg-4/50 rounded-lg col-span-2 p-4   flex flex-col md:flex-row justify-between gap-4 md:gap-[100px] w-full "),
    logo: {
        container: cva(" bg-bg-1/50 rounded-lg p-4 md:h-[60px] h-fit aspect-16/9 *:w-full *:h-full relative overflow-hidden "),
        label: cva("  text-2xl bg-gray-800/80 md:bg-gray-800/0 md:text-xs  flex items-center justify-center text-center md:text-transparent absolute top-0 left-0 hover:text-white hover:bg-gray-900/90 hover:cursor-pointer duration-500  "),
        img: cva(" object-cover  "),
        input: cva("")
    },
    menu: {
        container: cva(" flex flex-col md:grid md:grid-cols-5 gap-4 items-center "),
        input: cva(" bg-bg-1/50 font-bold h-fit w-full p-4 ")
    }
}

export default function FormNavbar({ onUpdate }) {
    const { state, on } = useFormNavbar(onUpdate);
    return (
        <div className={style.container()}>
            <div className={style.logo.container()}>
                <label className={style.logo.label()} htmlFor="logo"> คลิกเพื่อเปลี่ยนโลโก้ </label>
                <img className={style.logo.img()} src={state.logo} alt="logo" />
                <input className={style.logo.input()} type="file" name="logo" id="logo" hidden onChange={(e) => { on.change.logo(e.target.files) }} accept="image/*" />
            </div>
            <div className={style.menu.container()}>
                {state.navbar?.map((text, indexTitleNavbar) =>
                    <input className={style.menu.input()} type="text" value={text.text} placeholder={`เมนูนำทางที่ ${indexTitleNavbar}`} onChange={(e) => { on.change.title(indexTitleNavbar, e.target.value) }} key={`navbar-title-${indexTitleNavbar}`} />
                )}
            </div>
        </div>
    )
}
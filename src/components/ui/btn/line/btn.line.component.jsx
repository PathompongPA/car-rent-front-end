import { cva } from "class-variance-authority"
import useBtnLine from "./btn.line.hook";
let style = {
    container: cva(" fixed left-4 bottom-22 lg:left-auto lg:right-16 lg:bottom-8 active:scale-90 duration-300 z-20"),
    icon: {
        line: cva("fa-brands fa-line text-[64px] text-lime-600")
    }
}
export default function BtnLine() {
    const { state } = useBtnLine();
    console.log("btn line : ", state.line);
    return (
        <div className={style.container()}>
            <div className=" w-16 aspect-square flex justify-center items-center overflow-hidden rounded-full bg-white">
                <a href={state?.line?.link} target="_blank" >
                    <i className={style.icon.line()}> </i>
                </a>
            </div>
        </div>
    )
};
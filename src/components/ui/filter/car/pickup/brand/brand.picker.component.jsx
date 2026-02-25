import { cva } from "class-variance-authority";
import useBrandPicker from "./brand.picker.hook";

let style = {
    container: cva("bg-white flex flex-col p-8 gap-4 rounded-4xl"),
    title: cva(" font-bold text-2xl text-center"),
    list: {
        container: cva("grid grid-cols-4 gap-2 *:hover:cursor-pointer "),
        btn: {
            container: cva(" data-[select=true]:bg-blue-1/80 rounded-2xl shadow-2 active:scale-90 duration-300 hover:scale-95 "),
            img: cva(" w-[64px] aspect-square rounded-2xl object-contain ")
        },
        all: cva(" data-[select=true]:bg-blue-1 data-[select=true]:text-white font-bold rounded-2xl shadow-2 duration-300 active:scale-90")
    },
    confirm: cva(" font-bold text-2xl  p-4 bg-blue-1 text-white rounded-4xl hover:cursor-pointer active:scale-90 duration-300")
}

export default function BrandPicker({ brands, onSelect }) {
    const { state, ui, on, condition } = useBrandPicker(brands, onSelect);
    return (
        <div className={style.container()}>
            <h1 className={style.title()}>
                {ui.title}
            </h1>
            <div className={style.list.container()}>
                <button className={style.list.all()} onClick={on.click.allBrand} data-select={condition.isAllBrand} >{ui.all}</button>
                {state?.allBrand?.map((item, key) => {
                    let isSelect = state.brands?.some(brand => brand.brandName === item.brandName)
                    return (
                        <button className={style.list.btn.container()} onClick={() => { on.click.brand(item) }} data-select={isSelect} key={key}>
                            <img className={style.list.btn.img()} src={item.brandImg} />
                        </button>
                    )
                })}
            </div>
            <button className={style.confirm()} onClick={on.click.confirm} >
                {ui.confirm}
            </button>
        </div>
    )

};

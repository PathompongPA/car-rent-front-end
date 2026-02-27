import { cva } from "class-variance-authority";
import { Reveal } from "../../materials";
import useGallery from "./gallery.hook";

let btn = cva([" active:scale-90  hover:cursor-pointer duration-300  select-none"])()
let btnHeader = cva([btn, "p-2 data-[is-show=false]:invisible  box-border "])()
let btnbody = cva([btn, "hidden justify-center items-center absolute | p-2 bottom-0 left-4 | md:flex lg:w-[100px] lg:h-[18%] text-2xl"])()
let style = {
    gallery: cva("flex flex-col justify-center items-center  | md:p-0 lg:max-w-7xl xl:min-w-7xl lg:snap-center select-none "),

    header: cva("grid grid-cols-20 w-full items-center | px-4 | text-title-3 font-black text-blue-1 border *:border "),
    btnPreCar: cva([btnHeader, " col-span-2 justify-start "]),
    btnNextCar: cva([btnHeader, "col-span-2 justify-end "]),
    titleHeader: cva("text-center col-span-16 text-description-1 t md:text-description-1 xl:text-title-2 text-nowrap truncate"),

    body: cva("flex flex-wrap justify-center items-center relative  gap-0  px-4  w-full md:w-full md:gap-2  "),
    titleOverlay: cva("  hidden select-none h-fit absolute right-8 top-4 z-10 | md:block text-white lg:text-2xl font-black text-shadow-black text-shadow-lg/50"),
    image: cva("aspect-16/9 object-cover | md:w-full rounded-lg  hidden md:block "),
    images: cva(" flex flex-row justify-start relative overflow-y-hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth | py-0 pb-2 gap-2 | md:rounded-none md:pt-0 lg:gap-2"),
    img: cva([btn, "w-[95%] aspect-16/9 md:aspect-16/9 snap-center rounded-lg object-cover | lg:w-[200px]  hover:brightness-100  brightness-50 data-[is-focus=true]:brightness-100 duration-300 "]),
    btnPreImage: cva([btnbody]),
    btnNextImage: cva([btnbody]),
}

export default function GalleryCar() {
    const { ui, state, on } = useGallery();

    return (
        <Reveal>
            <div className={style.gallery()}>
                <div className={style.header()}>
                    <button className={style.btnPreCar()} onClick={on.click.btn.car.pre} data-is-show={state.isShow.btn.car.pre}>{`<`}</button>
                    <h1 className={style.titleHeader()}>{ui.title}</h1>
                    <button className={style.btnNextCar()} onClick={on.click.btn.car.next} data-is-show={state.isShow.btn.car.next}>{`>`}</button>
                </div>
                <div className={style.body()}>
                    <h1 className={style.titleOverlay()}></h1>
                    <img className={style.image()} src={state.img} />
                    <div className={style.images()}>
                        {state?.images?.map((img, index) =>
                            <img className={style.img()} src={img} key={index} onClick={on.click.image.mini} data-is-focus={state.indexImage === index} />
                        )}
                    </div>
                    <button className={style.btnPreImage} onClick={on.click.btn.image.pre} next="false">{`<`}</button>
                    <button className={style.btnNextImage} onClick={on.click.btn.image.next} next="true">{`>`}</button>
                </div>
            </div>
        </Reveal>
    )
};

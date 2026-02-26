import { Reveal } from "../../materials";
import useGallery from "./gallery.hook";

export default function GalleryCar() {
    const { ui, state, on } = useGallery();

    return (
        <Reveal>
            <div id="gallery" className="gallery-car *** flex flex-col justify-center items-center  | md:p-0 lg:max-w-7xl xl:min-w-7xl lg:snap-center ">

                <div className="gallery-car__container-title *** grid grid-cols-20 w-full items-center | px-4 | text-title-3 font-black text-blue-1  *:items-center *:flex *:not-[button]:justify-center *:h-12 *:md:h-full ">
                    <button className={"gallery-car__btn-pre --btn col-span-2 justify-start box-border  p-2 data-[is-show=false]:invisible  "} onClick={on.click.btn.car.pre} data-is-show={state.isShow.btn.car.pre}>{`<`}</button>
                    <h1 className="gallery-car__title *** select-none text-center col-span-16 text-description-1 h-fit md:text-description-1 xl:text-title-2 text-nowrap truncate">{ui.title}</h1>
                    <button className={"gallery-car__btn-next --btn col-span-2 justify-end box-border p-2  data-[is-show=false]:invisible  "} onClick={on.click.btn.car.next} data-is-show={state.isShow.btn.car.next}>{`>`}</button>
                </div>

                <div className="gallery-car__container-img *** flex flex-wrap justify-center items-center relative  gap-0  px-4  w-full md:w-full md:gap-2  ">

                    <h1 className="gallery-car__amount-img ***  hidden select-none h-fit absolute right-8 top-4 z-10 | md:block text-white lg:text-2xl font-black text-shadow-black text-shadow-lg/50"></h1>
                    <img className="gallery-car__big-img *** aspect-16/9 object-cover | md:w-full rounded-lg  hidden md:block " src={state.img} alt="" />
                    <div className="gallery-car__container-mini-img *** flex flex-row justify-start relative overflow-y-hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth | py-0 pb-2 gap-2 | md:rounded-none md:pt-0 lg:gap-2">
                        {state?.images?.map((img, index) =>
                            <img className={`gallery-car__mini-img --btn *** w-[95%] aspect-16/9 md:aspect-16/9 snap-center rounded-lg object-cover | lg:w-[200px]  hover:brightness-100  brightness-50 data-[is-focus=true]:brightness-100 duration-300 `} src={img} key={index} index={index} onClick={on.click.image.mini} data-is-focus={state.indexImage === index} />
                        )}
                    </div>
                    <button className="gallery-car__btn-pre-mini-img --btn *** hidden justify-center items-center absolute | p-2 bottom-0 left-4 | md:flex lg:w-[100px] lg:h-[18%] lg:bottom-0 lg:right-0 |  text-shadow-lg/50 text-3xl font-black lg:text-4xl |  text-white select-none | active:text-black/40" onClick={on.click.btn.image.pre} next="false">{`<`}</button>
                    <button className="gallery-car__btn-next-mini-img --btn *** hidden justify-center items-center absolute | p-2 bottom-0 right-4 | md:flex lg:w-[100px]  lg:h-[18%] | text-3xl font-black lg:text-4xl | text-white select-none | active:text-black/40" onClick={on.click.btn.image.next} next="true">{`>`}</button>

                </div>

            </div>
        </Reveal>
    )
};

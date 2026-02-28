import { cva } from "class-variance-authority"

let btn = cva([" active:scale-90  hover:cursor-pointer duration-300  select-none"])()
let btnHeader = cva([btn, "p-2 data-[is-show=false]:invisible  box-border "])()
let btnbody = cva([btn, "hidden absolute | p-2 top-1/2 -translate-y-1/2  | md:block xl:p-4 xl:py-8  text-2xl bg-black/50 text-white rounded-lg "])()
let style = {
    gallery: cva("flex flex-col justify-center items-center  | md:p-0 lg:max-w-7xl xl:min-w-7xl lg:snap-center select-none "),

    header: cva("flex flex-row justify-between items-center w-screen xl:w-full | xl:px-0 | text-title-3 font-black text-blue-1 "),
    btnPreCar: cva([btnHeader]),
    btnNextCar: cva([btnHeader]),
    titleHeader: cva("text-center col-span-16 text-description-1 t md:text-description-1 xl:text-title-2 text-nowrap truncate"),

    body: cva("flex flex-wrap justify-center items-center relative  gap-0  px-4 xl:px-0  w-full md:w-full md:gap-2  "),
    titleOverlay: cva("  hidden select-none h-fit absolute right-8 top-4 z-10 | md:block text-white lg:text-2xl font-black text-shadow-black text-shadow-lg/50"),
    boxImage: cva([" relative w-full h-full"]),
    image: cva(" bg-black/25  aspect-16/9 object-cover | md:w-full rounded-lg  hidden md:block "),
    images: cva(" flex flex-row justify-start relative overflow-y-hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth | py-0 pb-2 gap-2 | md:rounded-none md:pt-0 lg:gap-2"),
    img: cva([btn, "w-[95%] aspect-16/9 md:aspect-16/9 snap-center rounded-lg object-cover | lg:w-[200px]  hover:brightness-100  brightness-50 data-[is-focus=true]:brightness-100 duration-300 "]),
    btnPreImage: cva([btnbody, "left-4 "]),
    btnNextImage: cva([btnbody, "right-4"]),
}
export { style }
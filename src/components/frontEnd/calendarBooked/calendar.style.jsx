import { cva } from "class-variance-authority"

let btn = cva(" cursor-pointer hover:text-blue-1/50 active:scale-95 active:text-golden-1 font-bold duration-300 ")()
let btnToDay = cva([btn, " text-base md:text-2xl h-fit rounded-full  py-2 text-white bg-blue-1 "])()
let btnHeader = cva([btn, "text-sm font-medium md:text-description-1 text-nowrap"])()
let labelHeader = cva("text-center text-2xl font-black md:text-title-2")()
let status = cva(" bg-green-700 data-[is-to-day=true]:text-golden-1 data-[is-booked=true]:bg-red-700 data-[is-in-month=true]:invisible")()

let style = {
    calendar: cva(
        [
            "flex flex-col w-full px-4 min-h-[440px] pt-2 font-black text-blue-1 ",
            "md:min-h-[900px] md:gap-4 md:max-w-7xl ",
            "lg:py-8 lg:snap-center  xl:min-h-[900px]"
        ]
    ),

    header: cva("grid grid-cols-12 content-center items-center"),
    titleHeader: cva(" col-span-10 md:col-span-11 text-title-3 md:text-title-1 "),
    btnToDay: cva([btnToDay, " col-span-2 md:col-span-1 "]),
    btnPreMonth: cva([btnHeader, " col-span-3 text-start "]),
    monthLabel: cva([labelHeader, " col-span-6 "]),
    btnNextMonth: cva([btnHeader, " col-span-3 text-end "]),

    table: cva("flex flex-col gap-1 md:gap-4 "),
    headerTable: cva("grid grid-cols-7 | gap-1 | md:gap-4 "),
    titleHeaderTable: cva("rounded-md p-2 | text-center font-black text-white bg-blue-1 | lg:p-0 lg:text-title-3 "),

    bodyTable: cva("grid grid-rows grid-cols-7 items-center | gap-1 md:gap-2 h-full | text-description-1  "),
    itemBodyTable: cva([status, "flex flex-col items-center |  p-1 rounded-md | text-description-3 font-black | md:p-4 lg:justify-center lg:items-center *:border-0  text-white "]),
    titleItemBodyTable: cva("text-sm md:text-description-1"),
    statusItemBodyTable: cva("text-[8px] md:text-description-3")
}
export { style }

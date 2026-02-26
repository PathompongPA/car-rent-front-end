import { cva } from "class-variance-authority";
import { Reveal } from "../materials";
import useCalendarBooked from "./calendar.booked.hook";

let btn = cva(" cursor-pointer hover:text-blue-1/50 active:scale-95 active:text-golden-1 font-bold duration-300 ")()
let btnToDay = cva([btn, " text-base md:text-2xl h-fit rounded-full  py-2 text-white bg-blue-1 "])()
let btnHeader = cva([btn, "text-sm font-medium md:text-description-1 text-nowrap"])()
let labelHeader = cva("text-center text-2xl font-black md:text-title-2")()
let status = cva(" bg-green-700 data-[today=true]:text-golden-1 data-[booked=true]:bg-red-700 data-[inMonth=true]:invisible")()

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


export default function CalendarBooked() {
    const { state, ui, on } = useCalendarBooked();
    return (
        <Reveal className={"w-full flex justify-center "}>
            <div className={style.calendar()} >
                <div className={style.header()}>
                    <h1 className={style.titleHeader()}>{ui.title}</h1>
                    <button className={style.btnToDay()} onClick={on.click.btn.today}>{ui.toDay}</button>
                    <button className={style.btnPreMonth()} onClick={on.click.btn.preMonth}>{` < ${ui.preMonth} `}</button>
                    <div className={style.monthLabel()}>{`${ui.nowMonth} ${ui.year}`}</div>
                    <button className={style.btnNextMonth()} onClick={on.click.btn.nextMonth}>{`${ui.nextMonth} > `}</button>
                </div>
                <div className={style.table()}>
                    <div className={style.headerTable()}>
                        {state.listDayInWeek.map((dayInWeek, index) =>
                            <h1 className={style.titleHeaderTable()} key={index}>{dayInWeek}</h1>
                        )}
                    </div>
                    <div className={style.bodyTable()}>
                        {state.booking && state.arrayDay.map((day) => {
                            let isBooked = state.booking.some((element) => element === day.format("YYYY-MM-DD"))
                            let isToday = state.toDay === day.format("YYYY-MM-DD")
                            let isOutOfMonth = state.calendarNow.format("MM") !== day.format("MM")
                            let Day = Number(day.format("DD"))
                            return (
                                <div className={style.itemBodyTable()} data-today={isToday} data-booked={isBooked} data-inMonth={isOutOfMonth} key={day}>
                                    <div className={style.titleItemBodyTable()} > {Day} </div>
                                    <div className={style.statusItemBodyTable()}>{isBooked ? ui.booked : ui.free}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div >
        </Reveal>
    )

};

import { Reveal } from "../materials";
import useCalendarBooked from "./calendar.booked.hook";

export default function CalendarBooked() {
    const { state, ui, on } = useCalendarBooked();
    return (
        <Reveal className={"w-full flex justify-center "}>

            <div className="calendar *** flex flex-col | w-full px-4 min-h-[440px] md:min-h-[900px]  xl:min-h-[900px] | pt-2 | font-black text-blue-1 | md:gap-4 md:max-w-7xl lg:py-8 lg:snap-center " >

                <div className="calendar__title-component *** flex flex-row justify-between items-center">
                    <h1 className="calendar__calendar-booking *** text-title-3 md:text-title-1">{ui.title}</h1>
                    <button className="calendar__btn-to-day --btn *** p-1 bg-blue-1 text-white  font-medium xl:bg-white xl:text-blue-1 px-4 py-2 md:px-8 md:py-4 rounded-full text-l md:text-title-3" onClick={on.click.btn.today}>{ui.toDay}</button>
                </div>

                <div className="calendar__title *** flex justify-between items-center | font-black text-blue-1 *:p-1 ">
                    <button className="calendar__btn-pre --btn *** text-sm font-medium md:text-description-1   " onClick={on.click.btn.preMonth}>{` < ${ui.preMonth} `}</button>
                    <div className="calendar__month *** text-2xl font-black md:text-title-2">{`${ui.nowMonth} ${ui.year}`}</div>
                    <button className="calendar__btn-next --btn *** text-sm font-medium md:text-description-1 " onClick={on.click.btn.nextMonth}>{`${ui.nextMonth} > `}</button>
                </div>

                <div className="calendar__table *** flex flex-col gap-1 md:gap-4 ">

                    <div className="calendar__week *** grid grid-cols-7 | gap-1 | md:gap-4 ">
                        {state.listDayInWeek.map((dayInWeek, index) =>
                            <h1 className="calendar__day-in-week *** rounded-md p-2 | text-center font-black text-white bg-blue-1 | lg:p-0 lg:text-title-3 " key={`day-in-week-${index}`}>{dayInWeek}</h1>)}
                    </div>

                    <div className={`calendar__container-day *** grid grid-rows grid-cols-7 items-center | gap-1 md:gap-2 h-full | text-description-1  `}>
                        {state.booking && state.arrayDay.map((day) => {
                            let isBooking = state.booking.some((element) => element === day.format("YYYY-MM-DD"))
                            let isToday = state.toDay === day.format("YYYY-MM-DD")
                            let isOutOfMonth = state.calendarNow.format("MM") !== day.format("MM")
                            let Day = Number(day.format("DD"))
                            let highlightToDay = "text-amber-400  "
                            let highlightBooking = "text-white bg-red-700 "
                            let highlightFree = "text-white bg-green-700 "
                            return (
                                <div className={`calendar__day *** flex flex-col items-center | p-1 rounded-md | text-description-3 font-black | md:p-4 lg:justify-center lg:items-center *:border-0  ${isBooking ? highlightBooking : highlightFree} ${isOutOfMonth && "invisible"} `} key={day}>
                                    <div className={`text-sm md:text-description-1 ${isToday && highlightToDay} `} > {Day} </div>
                                    <div className={`calendar__status-booking *** text-[8px] md:text-description-3 ${isToday && highlightToDay}`}>{isBooking ? ui.booked : ui.free}</div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div >
        </Reveal>
    )

};

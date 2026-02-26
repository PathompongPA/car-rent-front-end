import useCalendarBooked from "./calendar.booked.hook";
import { Reveal } from "../../materials";
import { style } from "./calendar.style";

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
                                <div className={style.itemBodyTable()} data-is-to-day={isToday} data-is-booked={isBooked} data-is-in-month={isOutOfMonth} key={day}>
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

import dayjs from "dayjs"
import { useEffect, useState } from "react"

const genDays = (now) => {
    let days = []
    let positionDayFirst = now?.startOf("month")?.get("day")
    let startDay = positionDayFirst === 0 ? now?.startOf("month") : now?.startOf("month")?.add(positionDayFirst * -1, "days")
    for (let index = 0; index < 42; index++) {
        days?.push(startDay?.add(index, "day"))
    }
    return days
}
const genDayInWeek = () => {
    const sunday = dayjs().startOf('week');
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(sunday.add(i, 'day').format("dd"))
    }
    return weekDays;
}

export default function useCalendarPicker(_start, onSelect) {
    const [now, setNow] = useState(_start)
    const [days, setDays] = useState([])
    const [date, setDate] = useState(null)
    let start = _start || dayjs()
    let end = start.add(1, "year")
    let isPreMounthWithOutStart = now.add(-1, "month").isAfter(start.add(-1, "month"))
    let isNextMounthWithOutEnd = now.add(1, "month").isBefore(end)

    useEffect(() => {
        setDays(genDays(now))
        setDate(start)
    }, [now, start])

    return {
        isShowBtnPre: isPreMounthWithOutStart,
        isShowBtnNext: isNextMounthWithOutEnd,
        state: {
            now,
            start,
            end,
            date,
            title: now?.format("MMMM YYYY"),
            select: date?.format("DD MMMM YYYY"),
            preMonth: now?.add(-1, "month").format("MMMM"),
            nextMonth: now?.add(1, "month").format("MMMM"),
            btn: {
                clearSelect: "ล้างวันที่",
                selectToDay: "วันนี้"
            },
            table: {
                heard: genDayInWeek(),
                item: days
            }
        },
        on: {
            click: {
                pre: () => isPreMounthWithOutStart && setNow(now.add(-1, "month")),
                next: () => isNextMounthWithOutEnd && setNow(now.add(1, "month")),
                day: (newDate) => { setDate(newDate); onSelect(newDate) },
                clearSelect: () => { setDate(null); onSelect(null) },
                selectToDay: () => {
                    setNow(dayjs())
                    setDate(dayjs())
                    onSelect(dayjs())
                }
            }
        }

    }

};

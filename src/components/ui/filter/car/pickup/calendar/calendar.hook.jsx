import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const genDays = (now) => {
    let days = []
    let positionDayFirst = now?.startOf("month")?.get("day")
    let startDay = positionDayFirst === 0 ? now?.startOf("month") : now?.startOf("month")?.add(positionDayFirst * -1, "days")
    for (let index = 0; index < 42; index++) {
        days?.push(startDay?.add(index, "day"))
    }
    return days
}

export default function useCalendarPicker(_start, onSelect, _date) {
    const [now, setNow] = useState(_start)
    const [days, setDays] = useState([])
    const [date, setDate] = useState(_date)
    let start = _start || dayjs()
    let end = start.add(1, "year")

    let isPreMounthWithOutStart = now.add(-1, "month").isAfter(start.add(-1, "month"))
    let isNextMounthWithOutEnd = now.add(1, "month").isBefore(end)

    const { t } = useTranslation();

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
            title: `${t(`calendar.month.${now.get("month") + 1}`)}  ${now.get("year")}`,
            select: ` ${date?.get("day")} ${t(`calendar.month.${date?.get("month") + 1}`)} ${date?.get("year")} `,
            preMonth: ` ${t(`calendar.month.${now?.add(-1, "month").get("month") + 1}`)} `,
            nextMonth: ` ${t(`calendar.month.${now?.add(1, "month").get("month") + 1}`)} `,
            btn: {
                clearSelect: t("calendar.clear"),
                selectToDay: t("calendar.toDay")
            },
            table: {
                heard: [
                    t("calendar.days.1"),
                    t("calendar.days.2"),
                    t("calendar.days.3"),
                    t("calendar.days.4"),
                    t("calendar.days.5"),
                    t("calendar.days.6"),
                    t("calendar.days.7"),

                ],
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

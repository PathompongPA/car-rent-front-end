
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSearchParams } from "react-router";

export default function useCalendarBooked() {

    const [arrayDay, setArrayDay] = useState(genArrayDay(dayjs()))
    const [calendarNow, setCalendarNow] = useState(dayjs())
    const [toDay, setToDay] = useState(dayjs().format("YYYY-MM-DD"))
    const [booking, setBooking] = useState([])
    const { t } = useTranslation();

    const [searchParame] = useSearchParams()
    let parameCarId = searchParame.get("id")
    let listDayInWeek = [
        t("calendar.days.1"),
        t("calendar.days.2"),
        t("calendar.days.3"),
        t("calendar.days.4"),
        t("calendar.days.5"),
        t("calendar.days.6"),
        t("calendar.days.7"),
    ]

    const { Car } = useLoaderData();
    const { bookedDates } = Car.data.filter((item) => item?.id === parameCarId)[0]

    useEffect(() => {
        setToDay(dayjs().format("YYYY-MM-DD"))
        setArrayDay(genArrayDay(calendarNow))
        setBooking(bookedDates)
    }, [bookedDates, calendarNow, searchParame])

    function genArrayDay(now) {
        let firstDay = now.date(1).get("days")
        let amountWeek = Math.ceil((31 + firstDay) / 7)
        let listDay = []
        for (let index = -firstDay + 1; index < amountWeek * 7 - firstDay + 1; index++) {
            listDay.push(now.set('date', index))
        }
        return listDay
    }

    let nextMonth = `${t(`calendar.month.${calendarNow.add(1, "month").get("month") + 1}`)}`
    let preMonth = `${t(`calendar.month.${calendarNow.add(-1, "month").get("month") + 1}`)}`
    let nowMonth = `${t(`calendar.month.${calendarNow.get("month") + 1}`)}`
    let year = calendarNow.format("YYYY")

    return {
        ui: {
            title: t("calendar.title"),
            toDay: t("calendar.toDay"),
            nowMonth,
            nextMonth,
            preMonth,
            year,
            booked: t("calendar.booked"),
            free: t("calendar.free")

        },
        state: { listDayInWeek, booking, arrayDay, toDay, calendarNow },
        on: {
            click: {
                btn: {
                    today: () => { setCalendarNow(dayjs()) },
                    preMonth: () => { setCalendarNow(calendarNow.add(-1, "month")) },
                    nextMonth: () => { setCalendarNow(calendarNow.add(1, "month")) }
                }
            }
        }
    }
};

import { useState, useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");

export default function CalendarAdmin({ bookings = [] }) {
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedRange, setSelectedRange] = useState({ checkIn: null, checkOut: null, });

    const daysInMonth = useMemo(() => {
        const startOfMonth = currentMonth.startOf("month");
        const endOfMonth = currentMonth.endOf("month");
        const days = [];
        const startWeekday = startOfMonth.day();
        for (let indexDay = 0; indexDay < startWeekday; indexDay++) {
            days.push(null);
        }
        for (let day = startOfMonth; day.isBefore(endOfMonth) || day.isSame(endOfMonth); day = day.add(1, "day")) {
            const dateStr = day.format("YYYY-MM-DD");
            let isBooked = bookings.includes(dateStr);
            let isInRange = selectedRange.checkIn && selectedRange.checkOut && day.isAfter(selectedRange.checkIn, "day") && day.isBefore(selectedRange.checkOut, "day");
            let isCheckIn = selectedRange.checkIn && day.isSame(selectedRange.checkIn, "day"); let isCheckOut = selectedRange.checkOut && day.isSame(selectedRange.checkOut, "day");
            let isToday = day.isSame(dayjs(), "day");
            days.push({ date: day, isBooked, isInRange, isCheckIn, isCheckOut, isToday, });
        }
        return days;
    }, [currentMonth, bookings, selectedRange]);

    function handlePrev() {
        setCurrentMonth((oldState) => oldState.subtract(1, "month"));
    }

    function handleNext() {
        setCurrentMonth((oldState) => oldState.add(1, "month"));
    }

    function handleToday() {
        setCurrentMonth(dayjs());
    }

    function handleSelect(day) {
        const dateStr = day.format("YYYY-MM-DD");
        // let inputCheckIn = document.getElementsByClassName("calendar-admin__input-check-in")[0]
        // let inputCheckOut = document.getElementsByClassName("calendar-admin__input-check-out")[0]
        // setSelectedRange({ checkIn: dateStr, checkOut: null })
        if (bookings.includes(dateStr)) return;

        if (!selectedRange.checkIn || (selectedRange.checkIn && selectedRange.checkOut)) {
            setSelectedRange({ checkIn: dateStr, checkOut: null });

        } else if (selectedRange.checkIn && !selectedRange.checkOut) {
            let checkIn = dayjs(selectedRange.checkIn);
            let checkOut = day;
            if (day.isBefore(checkIn)) [checkIn, checkOut] = [day, checkIn];

            let isConflict = false;
            let cursor = checkIn;
            while (cursor.isBefore(checkOut) || cursor.isSame(checkOut)) {
                if (bookings.includes(cursor.format("YYYY-MM-DD"))) {
                    isConflict = true;
                    break;
                }
                cursor = cursor.add(1, "day");
            }
            if (isConflict) {
                alert("ช่วงวันที่คุณเลือกมีวันที่ถูกจองแล้ว กรุณาเลือกใหม่");
                setSelectedRange({ checkIn: null, checkOut: null, })
                return;
            }
            setSelectedRange({ checkIn: checkIn.format("YYYY-MM-DD"), checkOut: checkOut.format("YYYY-MM-DD") });
            document.getElementsByClassName("calendar-admin__input-check-in ")[0].value = selectedRange.checkIn
            document.getElementsByClassName("calendar-admin__input-check-out ")[0].value = selectedRange.checkOut
        }
    }

    return (

        <div className="max-w-xl mx-auto  md:p-4 rounded-xl shadow md:border md:border-gray-800">
            <div className="flex justify-between items-center p-2 md:py-3  rounded-lg ">
                <button onClick={handlePrev} type="button" className=" cursor-pointer px-4 py-2 rounded-lg  text-white">{`<`}</button>
                <h2 className="text-xl md:text-2xl text-white">{currentMonth.format("MMMM YYYY")}</h2>
                <button onClick={handleNext} type="button" className=" cursor-pointer px-4 py-2 rounded-lg  text-white">{`>`}</button>
            </div>

            <div className="flex gap-1 md:gap-4 md:mt-2 ">
                <button onClick={handleToday} type="button" className=" hover:text-golden-1 cursor-pointer flex-1 py-1 border border-gray-800 text-white rounded">วันนี้</button>
                <button onClick={() => setSelectedRange({ checkIn: null, checkOut: null })} type="button" className="hover:text-golden-1 cursor-pointer flex-1 md:py-3 border border-gray-800 text-white rounded">ล้างวันจอง</button>
            </div>

            <div className="grid grid-cols-7 gap-1 md:mt-4 text-center text-sm font-semibold text-gray-300 border-gray-800 rounded-lg  py-2 md:px-8 ">
                {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
                    <div key={d} className="py-2 border border-gray-800 rounded">{d}</div>
                ))}
                {daysInMonth.map((day, i) =>
                    day ? (
                        <div
                            key={day.date.format("YYYY-MM-DD")}
                            onClick={() => !day.isBooked && handleSelect(day.date)}
                            className={` aspect-4/3 cursor-pointer flex justify-center items-center rounded ${day.isBooked ? " text-while bg-red-800"
                                : day.isCheckIn ? "bg-lime-600 text-white font-bold"
                                    : day.isCheckOut ? "bg-lime-600 text-white"
                                        : day.isInRange ? "bg-lime-700 text-white"
                                            : day.isToday ? "border border-gray-600 bg-gray-500 text-white"
                                                : "bg-gray-900 hover:bg-gray-600 text-gray-100"} `}
                        >
                            {day.date.date()}
                        </div>
                    ) : (
                        <div key={`empty-${i}`} className="p-2" />
                    )
                )}
            </div>

            <div className="grid grid-cols-2 gap-1 p-2 md:gap-4 md:mt-4  *:border *:border-gray-800 *:rounded-lg *:md:p-4 *:text-center">
                <div className="">
                    <div className="text-gray-400 text-xs">วันรับรถ</div>
                    <input className="calendar-admin__input-check-in *** border-none text-center p-1 w-[120px] md:w-full " type="text" name="checkInDate" value={selectedRange.checkIn ?? ""} readOnly />
                </div>
                <div className="">
                    <div className="text-gray-400 text-xs">วันคืนรถ</div>
                    <input className="calendar-admin__input-check-out *** border-none text-center p-1 w-[120px] md:w-full " type="text" name="checkOutDate" value={selectedRange.checkOut ?? ""} readOnly />
                </div>
            </div>

        </div>
    );
}

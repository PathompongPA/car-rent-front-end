import { cva } from "class-variance-authority"
import { Icon, Text } from "../../../materials";
import useCalendarPicker from "./calendar.hook";
import dayjs from "dayjs";

let style = {
    container: cva(" p-8 gap-2 w-[500px] h-fit mt-2 bg-white shadow-1 rounded-4xl select-none : "),
    bar: {
        container: cva("flex flex-row justify-between"),
        btn: {
            pre: cva(" hover:cursor-pointer active:scale-90 duration-300 flex flex-row bg-blue-1 text-white p-2 rounded-2xl text-xs gap-1 select-none", {
                variants: {
                    isShowBtnPre: {
                        true: "",
                        false: " scale-0"
                    }
                }
            }),
            next: cva(" hover:cursor-pointer active:scale-90 duration-300 flex flex-row bg-blue-1 text-white p-2 rounded-2xl text-xs gap-1 select-none", {
                variants: {
                    isShowBtnNext: {
                        true: "",
                        false: " scale-0"
                    }
                }
            })
        }
    },

    table: {
        heard: {
            container: cva(" grid grid-cols-7 py-4 justify-center items-center"),
            item: cva(" text-center font-black text-2xl")
        },

        days: cva(" font-bold grid grid-cols-7 gap-1 justify-center items-center"),
        day: cva(" font-light text-base text-center  p-2 hover:cursor-pointer hover:bg-blue-1 hover:text-white  rounded-2xl", {
            variants: {
                isWithOutMonth: {
                    true: "text-blue-1/20 ",
                    false: ""
                },
                isBeforeStart: {
                    true: "text-blue-1/20",
                    false: ""
                },
                isSelect: {
                    true: "bg-blue-1 text-white",
                    false: ""
                }
            }
        }),
    },

    footer: {

        container: cva(" flex flex-row items-center justify-between gap-4 "),
        select: cva(" w-full font-bold"),
        btnClearSelect: cva(" bg-blue-1 text-white w-fit px-4 py-2 rounded-lg text-nowrap hover:cursor-pointer active:scale-90 duration-300"),
        btnSelectToDay: cva(" bg-blue-1 text-white w-fit px-4 py-2 rounded-lg text-nowrap hover:cursor-pointer active:scale-90 duration-300")

    }
}

export default function CalendarPicker({ onSelect, start }) {
    const { state, on, isShowBtnPre, isShowBtnNext } = useCalendarPicker(start, onSelect);
    return (
        <div className={style.container()} data-border={"some"} data-state={"close"} >
            <div className={style.bar.container()} data-border={true}>
                <button className={style.bar.btn.pre({ isShowBtnPre })} onClick={on.click.pre}>
                    <Icon variant={"pre"} />
                    {state.preMonth}
                </button>
                <Text variant={"title"} className={"font-black"} >{state.title}</Text>
                <button className={style.bar.btn.next({ isShowBtnNext })} onClick={on.click.next}>
                    {state.nextMonth}
                    <Icon variant={"next"} />
                </button>
            </div>
            <div className={style.table.heard.container()}>
                {state?.table?.heard?.map((item, key) => <div className={style.table.heard.item()} key={key}>{item}</div>)}
            </div>
            <div className={style.table.days()}>
                {state?.table?.item?.map((item, key) => {
                    let isWithOutMonth = !item?.isSame(state.now, "month")
                    let isBeforeStart = item.isSame(dayjs(), "day") ? false : item?.isBefore(state.start.add(0, "day"))
                    let isSelect = item?.isSame(state.date, "day")
                    return (
                        <button className={style.table.day({ isWithOutMonth, isBeforeStart, isSelect })} onClick={() => { (!isBeforeStart & !isWithOutMonth) && on.click.day(item) }} key={key}>{item?.format("D")}</button>
                    )
                }
                )}
            </div>
            <div className={style.footer.container()}>
                <Text className={style.footer.select()}>{state.select || ""}</Text>
                <button className={style.footer.btnClearSelect()} onClick={on.click.clearSelect}>{state.btn.clearSelect}</button>
                <button className={style.footer.btnSelectToDay()} onClick={on.click.selectToDay}>{state.btn.selectToDay}</button>
            </div>
        </div >
    )
};

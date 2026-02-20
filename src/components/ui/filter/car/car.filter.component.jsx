import { cva } from "class-variance-authority";
import { Button, Icon, Modal, Option, OverLay, Text } from "../../../materials";
import useCarFilter from "./car.filter.hook";
import Calendar from "../../calendar/calendar.component";

let style = {
    container: cva(" flex flex-col w-[calc(100%-2rem)] borderl bg-white m-4   p-4 rounded-4xl shadow-3 xl:flex-row gap-4 xl:px-8 xl:py-6 top-10  text-blue-1 xl:w-fit xl:rounded-full xl:absolute "),
    containerBtn: cva(" relative"),
    icon: cva(""),
    text: cva(""),
    btn: {
        container: cva("p-4 shadow-2 flex flex-row justify-start items-center w-full"),
        option: {
            pickDate: cva("", {
                variants: {
                    isOpen: {
                        true: "",
                        false: ""
                    }
                }

            })
        }
    }
}

export default function CarFilter() {
    const { state, isOpen, on } = useCarFilter();
    return (
        <div className={style.container()} left={"center"} >
            <div className={style.containerBtn()}>
                <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} >
                    <Icon variant={"car"} />
                    <Text variant={"description"} className={"w-[105px] text-start"} > ยี่ห้อ </Text>
                </Button>
            </div>
            <div className={style.containerBtn()}>
                <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} onClick={on.click.btn.pickup.start} >
                    <Icon variant={"calendar"} />
                    <Text variant={"description"} className={"w-[105px] text-start"} >{state?.start || "วันรับรถ"}</Text>
                </Button>

                <Modal className={style.btn.option.pickDate()} isShow={isOpen} onClose={on.close.calendar}>
                    <Calendar onSelect={on.toggle.calendar.pickup} />
                </Modal>
            </div>
            <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} >
                <Icon variant={"calendar"} />
                <Text variant={"description"} className={"w-[105px] text-start"} >วันคืนรถ</Text>
            </Button>
            <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} active={true} >
                <Text variant={"description"} className={"w-[105px]"} >ค้นหา</Text>
            </Button>
        </div>

    )
};

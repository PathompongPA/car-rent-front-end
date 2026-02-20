import { cva } from "class-variance-authority";
import { Button, Icon, Modal, Option, OverLay, Text } from "../../../materials";
import useCarFilter from "./car.filter.hook";
import BrandPicker from "../../picker/brand/brand.picker.component";
import CalendarPicker from "../../picker/calendar/calendar.component";

let style = {
    container: cva(" flex flex-col w-[calc(100%-2rem)] borderl bg-white m-4   p-4 rounded-4xl shadow-3 xl:flex-row gap-4 xl:px-8 xl:py-6 top-10  text-blue-1 xl:w-fit xl:rounded-full xl:absolute select-none "),
    btn: {
        container: cva("p-4 shadow-2 flex flex-row justify-start items-center w-full data-[role=search]:bg-blue-1 data-[role=search]:text-white "),
    },
    modal: cva("")
}

export default function CarFilter({ onSearch }) {
    const { state, isOpenBrandPicker, isOpenCalendar, on, ui } = useCarFilter(onSearch);
    return (
        <div className={style.container()} left={"center"} >
            <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} onClick={on.click.btn.pickup.brand} >
                <Icon variant={"car"} />
                <Text variant={"description"} className={"w-[105px] text-start truncate "} >{ui.btn.brand}</Text>
            </Button>
            <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} onClick={on.click.btn.pickup.start} >
                <Icon variant={"calendar"} />
                <Text variant={"description"} className={"min-w-[105px] text-start"} >{ui.btn.pickup.start}</Text>
            </Button>
            <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} onClick={on.click.btn.pickup.end} >
                <Icon variant={"calendar"} />
                <Text variant={"description"} className={"min-w-[105px] text-start"} >{ui.btn.pickup.end}</Text>
            </Button>
            <Button className={style.btn.container()} variant={"primary"} sharp={"circle"} onClick={on.click.btn.search} data-role="search" >
                <Text className={"xl:min-w-[105px] text-center w-full"} variant={"description"} >{ui.btn.search}</Text>
            </Button>

            <Modal className={style.modal()} isShow={isOpenCalendar} onClose={on.close.modal}>
                <CalendarPicker onSelect={on.select.date} start={state?.calendar?.start} />
            </Modal>

            <Modal className={style.modal()} isShow={isOpenBrandPicker} onClose={on.close.modal}>
                <BrandPicker onSelect={on.select.brand} brands={state.brands} />
            </Modal>
        </div>

    )
};

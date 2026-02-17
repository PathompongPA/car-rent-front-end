import { cva } from "class-variance-authority";
import { Button, Icon, OverLay, Text } from "../../../materials";
import useCarFilter from "./car.filter.hook";

let style = {
    carFilter: cva(" rounded-full flex flex-row gap-4 px-8 py-6 bg-white top-10 shadow-1"),
    btn: {
        pickBrand: cva("p-4 shadow-2"),
        pickStartRent: cva(""),
        pickEndRent: cva(""),
    }
}

export default function CarFilter() {
    const { state } = useCarFilter();
    console.log(state);
    return (
        <OverLay className={style.carFilter()} left={"center"} >
            <Button variant={"primary"} sharp={"circle"} className={style.btn.pickBrand()}>
                <Icon variant={"car"} />
                <Text variant={"description"} className={"w-[105px] text-start"} > ยี่ห้อ </Text>
            </Button>
            <Button variant={"primary"} sharp={"circle"} className={"p-4 shadow-2"}>
                <Icon variant={"calendar"} />
                <Text variant={"description"} className={"w-[105px] text-start"} >วันรับรถ</Text>
            </Button>
            <Button variant={"primary"} sharp={"circle"} className={"p-4 shadow-2"}>
                <Icon variant={"calendar"} />
                <Text variant={"description"} className={"w-[105px] text-start"} >วันคืนรถ</Text>
            </Button>
            <Button variant={"primary"} sharp={"circle"} active={true} className={"p-4 shadow-2"}>
                <Text variant={"description"} className={"w-[105px]"} >ค้นหา</Text>
            </Button>
        </OverLay>
    )
};

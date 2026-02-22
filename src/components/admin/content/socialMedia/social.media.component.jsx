import { cva } from "class-variance-authority"
import { Box, Button, Title } from "../../../materials";
import useSocialMedia from "./social.media.hook";

let style = {
    container: cva(" col-span-2 md:col-span-1 flex flex-col gap-4 p-4 bg-gray-700/50  rounded-2xl  w-full "),
    bar: {
        container: cva(" flex flex-row justify-between"),
        title: cva(""),
        btnNew: cva(" bg-gray-700 px-4 p-2")
    },
    box: {
        container: cva(" flex flex-col gap-2 h-full "),
        option: {
            container: cva("flex flex-row  rounded-2xl gap-2 p-2 bg-gray-600 "),
            selelct: {
                container: cva(" px-2  rounded-lg bg-gray-800/50 "),
                option: {}
            },
            input: cva(" border-0 bg-gray-800/50"),
            btnDelete: cva(" px-4 p-2 bg-red-700")
        }
    }
}

export default function SocialMedia({ onUpdate }) {
    const { state, on, ui } = useSocialMedia(onUpdate);
    return (
        <Box className={style.container()}>
            <Box className={style.bar.container()}>
                <Title className={style.bar.title()} size={"l"}>{ui.bar.title}</Title>
                <Button className={style.bar.btnNew()} onClick={on.click.btn.create}>{ui.bar.btn.add}</Button>
            </Box>
            <Box className={style.box.container()}>
                {state?.list?.map(({ type, link }, index) => (
                    <Box className={style.box.option.container()} key={index} >
                        <select className={style.box.option.selelct.container()} onChange={(e) => { on.change.option(index, e.target.value) }} value={type || ""} >
                            <option value="" disabled>{ui.option.defaultValue}</option>
                            {ui?.socialMediaOption?.map((type, key) => <option value={type} key={key} >{type}</option>)}
                        </select>
                        <input className={style.box.option.input()} type="text" onChange={(e) => { on.change.input(index, e.target.value) }} value={link || ""} placeholder="URL: เช่น https://www . . . ." />
                        <Button className={style.box.option.btnDelete()} onClick={() => { on.click.btn.delete(index) }}>ลบ</Button>
                    </Box >
                ))}
            </Box>
        </Box>
    )
}
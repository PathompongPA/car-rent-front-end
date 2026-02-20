import { cva } from "class-variance-authority";
import useBtnLanguage from "./btn.language.hook";
import { Icon, Option, Text } from "../../../materials";

let style = {
    container: cva(""),
    btnLanguage: {
        container: cva(" flex flex-row px-4 py-2 gap-1 rounded-4xl  text-blue-1 hover:bg-blue-1 hover:text-white hover:cursor-pointer duration-300 relative", {
            variants: {
                isOpen: {
                    true: " ",
                    false: ""
                }
            }
        }),

        icon: {
            down: cva("data-[Open=true]:rotate-180")
        },

        title: cva(" font-bold"),
    },

    option: {
        container: cva(" px-2 gap-1 bg-white text-blue-1 shadow-2 top-full mt-2 rounded-2xl flex flex-col w-full  duration-300 ", {
            variants: {
                isOpen: {
                    true: " max-h-fit py-1 ",
                    false: "max-h-0"
                }
            }
        }),

        item: cva(" rounded-4xl font-bold  p-1 hover:bg-black/25 hover:text-white hover:cursor-pointer duration-300", {
            variants: {
                isOpen: {
                    true: "",
                    false: ""
                },
                isActive: {
                    true: " bg-blue-1 text-white",
                    false: ""
                }
            }
        })
    }

}
export default function BtnLanguage() {
    const { isOpen, ui, on } = useBtnLanguage();
    return (
        <div className="">
            <button className={style.btnLanguage.container()} onClick={on.click.BtnLanguage}>
                <Text className={style.btnLanguage.title()}>{ui.lag.toUpperCase()}</Text>
                <Icon className={style.btnLanguage.icon.down()} variant={"down"} size={"m"} data-Open={isOpen} />
            </button>
            <Option className={style.option.container({ isOpen })}>
                {ui?.languages?.map((item, key) => {
                    let isActive = item === ui.lag
                    return <button className={style.option.item({ isActive, isOpen })} onClick={() => { on.select.language(item) }} key={key}>{item.toUpperCase()}</button>
                })}
            </Option>
        </div>
    )
};

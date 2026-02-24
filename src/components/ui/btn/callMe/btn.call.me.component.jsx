import { cva } from "class-variance-authority";
import useBtnCallMe from "./btn.call.me.hook";
import { Icon, Option, Text } from "../../../materials";

let style = {
    container: cva(" fixed bottom-4 left-4 xl:static"),
    btnCallMe: cva(" relative bg-blue-1 flex flex-row items-center gap-2 p-4 xl:p-4 rounded-4xl group xl:hover:cursor-pointer shadow-3    duration-300",
        {
            variants: {
                isActive: {
                    true: "text-amber-400 hover:text-amber-400 ",
                    false: " text-white"
                }

            },
            defaultVariants: {
                isActive: false
            }
        }
    ),
    icon: {
        phone: cva("min-w-6 min-h-6 ",
            {
                variants: {
                    isActive: {
                        true: "",
                        false: ""
                    }

                },
                defaultVariants: {
                    isActive: false
                }
            }
        ),

        down: cva("max-w-0  xl:group-hover:max-w-6 min-h-6 overflow-hidden duration-600 rotate-180 xl:rotate-0 ",
            {
                variants: {
                    isActive: {
                        true: " max-w-6",
                        false: ""
                    }

                },
                defaultVariants: {
                    isActive: false
                }
            }
        )
    },
    text: cva("font-bold text-xl xl:text-base"),

    option: cva(" shadow-2 bg-white w-fit h-fit flex flex-col overflow-hidden duration-600  rounded-4xl mt-2 gap-4 px-8 bottom-full mb-4 left-0 xl:top-full xl:mt-2 xl:left-auto xl:right-0",
        {
            variants: {
                isActive: {
                    true: "max-h-fit p-4",
                    false: "max-h-0"
                }

            },
            defaultVariants: {
                isActive: false
            }
        }
    ),
    item: cva(" text-start  xl:text-end font-bold text-nowrap text-blue-1  hover:text-shadow-amber-400")

}
export default function BtnCallMe() {
    const { isActive, state, on, ui } = useBtnCallMe();
    return (
        <div className={style.container()}>
            <button className={style.btnCallMe({ isActive })} onClick={on.click.callMe}>
                <Icon className={style.icon.phone({ isActive })} variant={"phone"} size={"m"} />
                <Text className={style.text({ isActive })}>{ui.title}</Text>
                <Icon className={style.icon.down({ isActive })} variant={"down"} size={"m"} />
                <Option className={style.option({ isActive })} x={"end"}>
                    {state?.option?.map((item, key) =>
                        <a className={style.item()} key={key} target="_blank" href={`tel:${item?.link}`} >{`${item?.link}`}</a>
                    )}
                </Option>
            </button>
        </div>
    )

};

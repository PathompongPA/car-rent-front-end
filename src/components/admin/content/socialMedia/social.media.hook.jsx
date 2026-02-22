import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useSocialMedia(onUpdate) {
    let types = ["facebook", "instagram", "line", "tiktok", "X", "youtube"]
    const loader = useLoaderData()
    const { i18n } = useTranslation();
    const [socialMedia, setSocialMedia] = useState(loader?.contents?.socialMedia || {
        th: { value: [] },
        en: { value: [] }
    })

    useEffect(() => {
        onUpdate(socialMedia)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socialMedia])


    return {
        state: {
            list: socialMedia[i18n.language].value

        },
        ui: {
            bar: {
                title: "Follow us.",
                btn: {
                    add: "เพิ่ม"
                }
            },
            option: {
                defaultValue: "เลือก Social media"
            },
            socialMediaOption: types
        },
        on: {
            click: {
                btn: {
                    create: () => {
                        setSocialMedia(
                            (state) => {
                                let newState = { ...state }
                                console.log("new state : ", newState);
                                newState[i18n.language].value.push({ type: null, link: null })
                                return newState
                            }
                        )
                    },
                    delete: (index) => {
                        setSocialMedia(
                            (state) => {
                                let newState = { ...state }
                                newState[i18n.language].value.splice(index, 1)
                                return newState
                            }
                        )
                    }
                }
            },
            change: {
                option: (index, newType) => {
                    setSocialMedia(
                        (state) => {
                            let newState = { ...state }
                            newState[i18n.language].value[index].type = newType
                            return newState
                        }
                    )
                },
                input: (index, newLink) => {
                    setSocialMedia(
                        (state) => {
                            let newState = { ...state }
                            newState[i18n.language].value[index].link = newLink
                            return newState
                        }
                    )
                },
            }

        },
    }
};

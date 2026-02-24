import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";


let defaultValue = {
    value: [
        { type: "facebook", link: "https://www.facebook.com/profile.php?id=61563865480190" },
        { type: "instagram", link: "https://www.instagram.com/carrent88_khunb/?igsh=eTZkemFrbzhjdTZi#" },
        { type: "tiktok", link: "https://www.tiktok.com/@carrental_mr.b88?_r=1&_t=ZS-92QR1FCrSRV" },
        { type: "youtube", link: "https://www.carrent88.com" },
    ]
}

export default function useSocialMedia(onUpdate) {
    let types = ["facebook", "instagram", "line", "tiktok", "X", "youtube"]
    const loader = useLoaderData()
    const [socialMedia, setSocialMedia] = useState(loader?.contents?.socialMedia || defaultValue)

    useEffect(() => {
        onUpdate(socialMedia)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socialMedia])


    return {
        state: {
            list: socialMedia.value

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
                                newState.value.push({ type: null, link: null })
                                return newState
                            }
                        )
                    },
                    delete: (index) => {
                        setSocialMedia(
                            (state) => {
                                let newState = { ...state }
                                newState.value.splice(index, 1)
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
                            newState.value[index].type = newType
                            return newState
                        }
                    )
                },
                input: (index, newLink) => {
                    setSocialMedia(
                        (state) => {
                            let newState = { ...state }
                            newState.value[index].link = newLink
                            return newState
                        }
                    )
                },
            }

        },
    }
};

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

let defaultState = {
    contact: {
        th: {
            title: "ติดต่อเรา",
            card: [
                {
                    title: "โทรศัพท์",
                    list: [
                        { link: "092-847-0991", text: "092-847-0991" },
                        { link: "098-926-9669", text: "098-926-9669" },
                    ]
                },
                {
                    title: "facebook",
                    list: [
                        { link: "https://web.facebook.com/profile.php?id=61563865480190", text: "รถเช่า บ้านคุณบี88" },
                    ]
                },
                {
                    title: "line",
                    list: [
                        { link: "https://line.me/R/ti/p/@271xryvl?oat_content=url&ts=08110024", text: "@CARRENT88" },
                    ]
                },
            ]
        },
        en: {
            title: "Contact Us",
            card: [
                {
                    title: "Phone",
                    list: [
                        { link: "092-847-0991", text: "092-847-0991" },
                        { link: "098-926-9669", text: "098-926-9669" },
                    ]
                },
                {
                    title: "facebook",
                    list: [
                        { link: "https://web.facebook.com/profile.php?id=61563865480190", text: "รถเช่า บ้านคุณบี88" },
                    ]
                },
                {
                    title: "line",
                    list: [
                        { link: "https://line.me/R/ti/p/@271xryvl?oat_content=url&ts=08110024", text: "@CARRENT88" },
                    ]
                },
            ]
        }
    },
    card: {
        title: "",
        list: []
    },
    detail: {
        link: "",
        text: ""
    }
}
export default function useFormContact(onUpdate) {
    const loader = useLoaderData();
    const [contact, setContact] = useState(loader?.contents?.contact || defaultState.contact)
    const { i18n } = useTranslation();

    useEffect(() => {
        onUpdate(contact)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contact, loader])

    return {
        ui: {
            title: contact[i18n.language].title,
            card: contact[i18n.language].card
        },
        on: {
            change: {
                title: (newValue) => setContact((state) => {
                    let newState = { ...state }
                    newState[i18n.language].title = newValue
                    return newState
                })
                ,
                titleCard: (indexCard, newValue) => {
                    setContact((state) => {
                        let newState = { ...state }
                        newState[i18n.language].card[indexCard].title = newValue
                        return newState
                    })
                },
                detail: {
                    text: (indexCard, indexDetailCardContent, newValue) => {
                        setContact((state) => {
                            let newState = { ...state }
                            newState[i18n.language].card[indexCard].list[indexDetailCardContent].text = newValue
                            return newState
                        })
                    },
                    link: (indexCard, indexDetailCardContent, newValue) => {
                        setContact((state) => {
                            let newState = { ...state }
                            newState[i18n.language].card[indexCard].list[indexDetailCardContent].link = newValue
                            return newState
                        })
                    },
                }
            },
            click: {
                addCard: () => {
                    setContact((state) => {
                        let newState = { ...state }
                        newState[i18n.language].card.push({ title: "", list: [] })

                        return newState
                    })
                },
                deleteCard: (indexCard) => {
                    setContact((state) => {
                        let newState = { ...state }
                        newState[i18n.language].card.splice(indexCard, 1)
                        return newState
                    })
                },
                addDetailCard: (indexCard) => {
                    setContact((state) => {
                        let newState = { ...state }
                        newState[i18n.language].card[indexCard].list.push({ link: "", text: "" })
                        return newState
                    })
                },
                deleteDetailCard: (indexCard, indexDetailCardContent) => {
                    setContact((state) => {
                        let newState = { ...state }
                        newState[i18n.language].card[indexCard].list.splice(indexDetailCardContent, 1)
                        return newState
                    })
                },
            },
        }
    }
};

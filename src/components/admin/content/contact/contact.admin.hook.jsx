import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

let defaultState = {
    contact: {
        th: {
            title: "",
            card: []
        },
        en: {
            title: "",
            card: []
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
    const [contact, setContact] = useState(loader.contents.contact || defaultState.contact)
    const { i18n } = useTranslation();

    useEffect(() => {
        onUpdate(contact)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contact])

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
                            newState[i18n.language].card[indexCard].list[indexDetailCardContent].link= newValue
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

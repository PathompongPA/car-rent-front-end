import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useFormQuestion(onUpdate) {
    const { contents } = useLoaderData();
    const { i18n } = useTranslation();
    const [faq, setFaq] = useState(contents?.faq || { th: { title: "", value: [] }, en: { title: '', value: [] } })
    let lang = i18n.language

    useEffect(() => {
        onUpdate(faq)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faq])

    return {
        ui: {
        },
        state: {
            title: faq[lang]?.title,
            value: faq[lang]?.value
        },
        on: {
            click: {
                btn: {
                    create: () => {
                        setFaq((state) => {
                            let newState = { ...state }
                            newState[lang].value.push({ q: "", a: "" })
                            return newState
                        })
                    },
                    delete: (index) => {
                        setFaq((state) => {
                            let newState = { ...state }
                            newState[lang].value.splice(index, 1)
                            return newState
                        })
                    }
                }
            },
            change: {
                title: (newValue) => {
                    setFaq((state) => {
                        let newState = { ...state }
                        newState[lang].title = newValue
                        return newState
                    })
                },
                q: (index, newValue) => {
                    setFaq((state) => {
                        let newState = { ...state }
                        newState[lang].value[index].q = newValue
                        return newState
                    })
                },
                a: (index, newValue) => {
                    setFaq((state) => {
                        let newState = { ...state }
                        newState[lang].value[index].a = newValue
                        return newState
                    })
                }
            }


        }
    }
};

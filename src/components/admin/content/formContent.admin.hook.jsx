import { useState } from "react"
import { useNavigate } from "react-router"
import { fetchApi } from "../../../utility"
import { useTranslation } from "react-i18next"

export default function useFormContentAdmin() {
    let navigation = useNavigate()
    const [content, setContent] = useState({})
    const { i18n } = useTranslation();

    const clearForm = () => {
        document.getElementsByClassName("form-content")[0].reset()
    }

    return {
        ui: { language: i18n.language.toUpperCase() },
        on: {
            toggle: {
                language: () => { i18n.changeLanguage(i18n.language === "th" ? "en" : "th") }
            },
            update: {
                navbar: (newValue) => {
                    setContent(
                        (state) => {
                            let newState = { ...state }
                            newState["navbar"] = newValue
                            return newState
                        }
                    )
                },
                stepBooking: (newValue) => {
                    setContent(
                        (state) => {
                            let newState = { ...state }
                            newState["stepBooking"] = newValue
                            return newState
                        }
                    )
                },
                contact: (newValue) => {
                    setContent(
                        (state) => {
                            let newState = { ...state }
                            newState["contact"] = newValue
                            return newState
                        }
                    )
                },
                faq: (newValue) => {
                    setContent(
                        (state) => {
                            let newState = { ...state }
                            newState["faq"] = newValue
                            return newState
                        }
                    )
                },
                address: (newValue) => {
                    setContent(
                        (state) => {
                            let newState = { ...state }
                            newState["address"] = newValue
                            return newState
                        }
                    )
                },
                socialMedia: (newValue) => {
                    setContent(
                        (state) => {
                            let newState = { ...state }
                            newState["socialMedia"] = newValue
                            return newState
                        }
                    )
                },
            },
            save: async () => {
                console.log("fetch : ", content);
                let data = new FormData(document.getElementsByClassName("form-content")[0])
                data.append("data", JSON.stringify(content))
                const { isSuccess } = await fetchApi("POST", "/api/content", data, {});
                isSuccess && navigation(".", { replace: true }) & clearForm()
            }
        }


    }
}
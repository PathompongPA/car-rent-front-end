import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useRevalidator } from "react-router";
import { fetchApi } from "../../../../utility";

export default function useFormNavbar(onUpdate) {

    const { i18n } = useTranslation();
    const loader = useLoaderData()
    const revalidator = useRevalidator();
    const [logo, setLogo] = useState()
    const [navbar, setNavbar] = useState(
        loader?.contents?.navbar ||
        {
            th: {
                value: [
                    { text: "เช็ครถว่าง", link: "booking" },
                    { text: "ขั้นตอนการจอง", link: "journeyBooking" },
                    { text: "รีวิว", link: "review" },
                    { text: "ติดต่อเรา", link: "contact" },
                    { text: "คำถามที่พบบ่อย", link: "Qa" },
                ]
            },
            en: {
                value: [
                    { text: "Find Your Car", link: "booking" },
                    { text: "How to book", link: "journeyBooking" },
                    { text: "Review", link: "review" },
                    { text: "Contact Us", link: "contact" },
                    { text: "FAQ", link: "Qa" },
                ]
            }
        }
    )
    useEffect(() => {
        onUpdate(navbar)
        setLogo(loader.logo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loader])

    return {
        state: {
            navbar: navbar[i18n.language].value,
            logo
        },
        on: {
            change: {
                title: (index, newValue) => {
                    setNavbar((state) => {
                        let newState = { ...state }
                        newState[i18n.language].value[index].text = newValue
                        return newState
                    })
                },
                logo: async (file) => {
                    let form = new FormData()
                    Array.from(file).map(item => form.append("logo", item))
                    let { isSuccess, data } = await fetchApi("POST", "/api/content/logo", form, {})
                    console.log(data);
                    isSuccess && revalidator.revalidate()
                }
            }
        }
    }

};

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useFormNavbar(onUpdate) {

    const { i18n } = useTranslation();
    const loader = useLoaderData()
    const [navbar, setNavbar] = useState(
        loader.contents.navbar ||
        {
            th: { value: ["เช็ครถว่าง", "ขั้นตอนการจอง", "รีวิว", "ติดต่อเรา", "คำถามที่พบบ่อย"] },
            en: { value: ["Find Your Car", "How to book", "Review", "Contact Us", "FAQ"] }
        }
    )
    useEffect(() => {
        onUpdate(navbar)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navbar])

    return {
        state: {
            navbar: navbar[i18n.language].value
        },
        on: {
            change: {
                title: (index, newValue) => {
                    setNavbar((state) => {
                        let newState = { ...state }
                        newState[i18n.language].value[index] = newValue
                        return newState
                    })
                }
            }
        }
    }

};

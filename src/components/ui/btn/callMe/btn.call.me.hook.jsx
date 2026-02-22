import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router"

export default function useBtnCallMe() {
    const [isActive, setIsActive] = useState(false)
    const { Content } = useLoaderData();
    const { t } = useTranslation();
    return {
        isActive,
        ui: { title: t("callMe.title") },
        state: {
            option: Content?.contact?.card?.filter(item => item.title === "โทรศัพท์")[0]?.list
        },
        on: {
            click: {
                callMe: () => { setIsActive(!isActive) }
            }
        }
    }

};

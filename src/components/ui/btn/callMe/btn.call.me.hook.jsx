import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router"

export default function useBtnCallMe() {
    const [isActive, setIsActive] = useState(false)
    const loader = useLoaderData();
    const { t } = useTranslation();
    return {
        isActive,
        ui: { title: t("callMe.title") },
        state: {
            option: loader.contents.contact["th"].card.filter(item => item.title === "โทรศัพท์")[0].list
        },
        on: {
            click: {
                callMe: () => { setIsActive(!isActive) }
            }
        }
    }

};

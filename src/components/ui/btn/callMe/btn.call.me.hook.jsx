import { useState } from "react";
import { useLoaderData } from "react-router"

export default function useBtnCallMe() {
    const [isActive, setIsActive] = useState(false)
    const { Content } = useLoaderData();
    return {
        isActive,
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

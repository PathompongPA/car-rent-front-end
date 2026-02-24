import { useEffect, useState } from "react";

export default function useHamburgerMenu(isOpenMenu, toggleMenu) {

    const [isActive, setIsActive] = useState(isOpenMenu)
    useEffect(() => {
        setIsActive(isOpenMenu)
    }, [isOpenMenu])

    return {
        isActive,
        on: {
            click: () => { setIsActive(!isActive); toggleMenu(!isActive) }
        }
    }
};

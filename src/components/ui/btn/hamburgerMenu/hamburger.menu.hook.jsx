import { useState } from "react";

export default function useHamburgerMenu() {

    const [isActive, setIsActive] = useState(false)
    return {
        isActive,
        on: {
            click: () => { setIsActive(!isActive) }
        }
    }
};

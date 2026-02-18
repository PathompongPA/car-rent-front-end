import { useState } from "react";

export default function useBtnLanguage() {
    const [isOpen, setIsOpen] = useState(false)
    return {
        isOpen,
        state: {
            lag: "ไทย",
            option: [
                { lag: "ไทย" },
                { lag: "en" },
            ]

        },
        on: {
            click: {
                BtnLanguage: () => { setIsOpen(!isOpen) }
            }
        }
    }
};

import { useState } from "react";
import { i18n } from "../../../../i18n";

export default function useBtnLanguage() {
    const [isOpen, setIsOpen] = useState(false)
    return {
        isOpen,
        ui: {
            lag: i18n.language,
            languages: Object.keys(i18n.store.data)
        },
        on: {
            click: {
                BtnLanguage: () => { setIsOpen(!isOpen) }
            },
            select: {
                language: (lag) => { i18n.changeLanguage(lag); setIsOpen(false) }

            }
        }
    }
};

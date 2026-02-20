import i18n from "i18next";
import en from "./en.json"
import th from "./th.json"
import { initReactI18next } from "react-i18next";
i18n
    .use(initReactI18next)
    .init(
        {
            resources: {
                en: { translation: en },
                ไทย: { translation: th }
            },
            lng: "ไทย",
            fallbackLng: "en",
            interpolation: {
                escapeValue: false,
            },
        }
    )
export { i18n }
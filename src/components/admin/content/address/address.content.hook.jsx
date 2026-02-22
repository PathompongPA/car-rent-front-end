import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useFormAddress(onUpdate) {
    const { t, i18n } = useTranslation();
    const loader = useLoaderData();
    const [address, setAddress] = useState(loader.contents.address || { th: { value: "" }, en: { value: "" } })
    useEffect(() => {
        onUpdate(address)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])

    return {
        ui: {
            title: t("footer.address"),
        },
        state: {
            address: address[i18n.language].value
        },
        on: {
            change: {
                address: (newValue) => {
                    setAddress(
                        (state) => {
                            let newState = { ...state }
                            newState[i18n.language].value = newValue
                            return newState
                        }
                    )
                }
            }
        }
    }

};

import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useCarFilter(onSearch) {
    const loader = useLoaderData();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [brands, setBrands] = useState(loader?.Brand.data)

    return {
        isOpenCalendar: isOpen === "start" | isOpen === "end",
        isOpenBrandPicker: isOpen === "brand",
        ui: {
            btn: {
                brand: brands.length === loader?.Brand?.data?.length ? t("filter.btn.pickup.brand") : brands.map(item => item.brandName).join(", "),
                pickup: {
                    start: start && start?.format("DD / MM / YYYY") || t("filter.btn.pickup.start"),
                    end: end && end?.format("DD / MM / YYYY") || t("filter.btn.pickup.end"),
                },
                search: t("filter.btn.search")
            }
        },
        state: {
            brands,
            calendar: {
                start: isOpen === "start" ? dayjs() : isOpen === "end" && start || dayjs(),
            }
        },
        on: {
            click: {
                btn: {
                    pickup: {
                        start: () => { setIsOpen("start") },
                        end: () => { setIsOpen("end") },
                        brand: () => { setIsOpen("brand") },
                    },
                    search: () => {
                        let filter = { brands, start, end }
                        onSearch(filter)
                        document.getElementById(loader.Content.navbar[0].link).scrollIntoView({

                        })
                    }
                }
            },
            select: {
                brand: (newBrands) => { setIsOpen(null); setBrands(newBrands) },
                date: (date) => { setIsOpen(null); isOpen === "start" ? setStart(date) : isOpen === "end" && setEnd(date) }

            },
            close: {
                modal: () => { setIsOpen(null) }
            }


        },
    }
};

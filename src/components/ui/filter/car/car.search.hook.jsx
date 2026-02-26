import dayjs from "dayjs"
import { useEffect } from "react";
import { useState } from "react"
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useCarSearch(onSearch, filter) {
    const loader = useLoaderData();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(null)
    const [start, setStart] = useState(filter.start)
    const [end, setEnd] = useState(filter.end)
    const [brands, setBrands] = useState(filter.brands)

    useEffect(() => {
        setBrands(filter.brands)
    }, [filter])

    return {
        isOpenCalendar: isOpen === "start" | isOpen === "end",
        isOpenBrandPicker: isOpen === "brand",
        calendarMode: isOpen,
        ui: {
            btn: {
                brand: brands.length === 0
                    ? t("picker.brand.title") :
                    brands.length === loader?.Brand?.data?.length
                        ? t("filter.btn.pickup.brand") : brands.map(item => item.brandName).join(", "),
                pickup: {
                    start: start && start?.format("DD / MM / YYYY") || t("filter.btn.pickup.start"),
                    end: end && end?.format("DD / MM / YYYY") || t("filter.btn.pickup.end"),
                },
                search: t("filter.btn.search"),
                clear: t("filter.btn.clear")
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
                        start: () => { setIsOpen("start"); },
                        end: () => { setIsOpen("end"); },
                        brand: () => { setIsOpen("brand"); },
                    },
                    search: () => {
                        let filter = { brands, start, end }
                        onSearch(filter)
                        document.getElementById("booking").scrollIntoView({
                        })
                    }
                }
            },
            select: {
                brand: (newBrands) => { setIsOpen(null); setBrands(newBrands); onSearch({ brands: newBrands, start, end }); },
                date: (newDate) => {
                    isOpen === "start"
                        ? end?.isBefore(newDate)
                            ? setEnd(newDate) & setStart(newDate)
                            : setStart(newDate)
                        : isOpen === "end"
                        && setEnd(newDate);
                    setIsOpen(null);
                    onSearch({ brands, start, end })
                }
            },
            close: {
                modal: () => { setIsOpen(null) }
            }


        },
    }
};

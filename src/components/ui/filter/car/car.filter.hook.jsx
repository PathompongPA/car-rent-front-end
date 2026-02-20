import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router";

export default function useCarFilter(onSearch) {
    const loader = useLoaderData();
    const [isOpen, setIsOpen] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [brands, setBrands] = useState(loader?.Brand.data)

    return {
        isOpenCalendar: isOpen === "start" | isOpen === "end",
        isOpenBrandPicker: isOpen === "brand",
        ui: {
            btn: {
                brand: brands.length === loader?.Brand?.data?.length ? 'ยี่ห้อ' : brands.map(item => item.brandName).join(", "),
                pickup: {
                    start: start && start?.format("DD / MM / YYYY") || "วันรับรถ",
                    end: end && end?.format("DD / MM / YYYY") || "วันคืนรถ",
                },
                search: "ค้นหา"
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

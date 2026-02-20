import { useState } from "react";
import { useLoaderData } from "react-router";

export default function useBrandPicker(brands, returnFunc) {
    const loader = useLoaderData();
    const [select, setSelect] = useState(brands)
    let isAllBrand = select.length === loader?.Brand?.data?.length

    return {
        ui: {
            title: "เลือกยี่ห้อ",
            confirm: "ตกลง",
            all: "ทั้งหมด"
        },
        state: {
            brands: loader?.Brand?.data,
            select
        },
        on: {
            click: {
                confirm: () => { returnFunc(select) },
                brand: (newBrand) => {
                    isAllBrand ? setSelect([newBrand]) : setSelect((state) => [...state, newBrand])
                },
                allBrand: () => { isAllBrand ? setSelect([]) : setSelect(loader?.Brand.data) }
            }
        },
        condition: {
            isAllBrand
        }
    }

};

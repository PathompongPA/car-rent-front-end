import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useBrandPicker(brands, returnFunc) {
    const loader = useLoaderData();
    const { t } = useTranslation();
    const [select, setSelect] = useState(brands)
    let isAllBrand = select.length === loader?.Brand?.data?.length

    return {
        ui: {
            title: t("picker.brand.title"),
            confirm: t("picker.brand.confirm"),
            all: t("picker.brand.all")
        },
        state: {
            brands: loader?.Brand?.data,
            select
        },
        on: {
            click: {
                confirm: () => { returnFunc(select) },
                brand: (newBrand) => {
                    isAllBrand ? setSelect([newBrand]) : select.some(item => item.id === newBrand.id) ? setSelect(select.filter(item => item.id !== newBrand.id)) : setSelect((state) => [...state, newBrand])
                },
                allBrand: () => { isAllBrand ? setSelect([]) : setSelect(loader?.Brand.data) }
            }
        },
        condition: {
            isAllBrand
        }
    }

};

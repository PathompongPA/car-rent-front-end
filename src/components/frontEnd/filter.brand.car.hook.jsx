import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useLoaderData } from "react-router"

export default function useBrandCarFilter(filter, onUpdate) {
    useEffect(() => { }, [filter])

    const box = useRef()
    let { Brand, Car } = useLoaderData()
    Brand = Brand?.data?.filter(brand => Car.data.some(car => car.brand.id === brand.id))
    const { t } = useTranslation();
    let isAllBrand = Brand?.length === filter?.brands?.length
    let on = {
        click: {
            scroll: {
                pre: () => {
                    box.current.scrollTo({
                        left: box.current.scrollLeft - 750,
                        behavior: 'smooth'
                    });
                },
                next: () => {
                    box.current.scrollTo({
                        left: box.current.scrollLeft + 750,
                        behavior: 'smooth'
                    });
                }
            },
            brand: (newBrand) => {
                isAllBrand ?
                    onUpdate((state) => ({
                        ...state,
                        brands: [newBrand]
                    })
                    )
                    : filter.brands.some(item => item.id === newBrand.id)
                        ? onUpdate(
                            (state) => ({
                                ...state,
                                brands: state.brands.filter(item => item.id !== newBrand.id)
                            })
                        )
                        : onUpdate(
                            (state) => ({
                                ...state,
                                brands: [...state.brands, newBrand]
                            })
                        )
            },
            allBrand: () => {
                isAllBrand ? onUpdate((state) => ({ ...state, brands: [] })) : onUpdate((state) => ({ ...state, brands: Brand }))
            }
        }
    }
    return {
        ui: {
            btn: {
                all: t("all")
            }
        },
        state: {
            isAllBrand,
            Brand
        },
        on,
        ref: { box }

    }

};

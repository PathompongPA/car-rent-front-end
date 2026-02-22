import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSearchParams } from "react-router";

export default function Promotion() {
    const [prices, setPrices] = useState([])
    const { Car } = useLoaderData()
    const [searchParame] = useSearchParams()
    let parameCarId = searchParame.get("id")

    const { offers } = Car.data.filter((item) => item.id === parameCarId)[0]
    const { t } = useTranslation();

    useEffect(() => {
        setPrices(offers)
    }, [offers])

    return (
        <div className="promotion flex flex-col w-full text-description-1 font-black text-white bg-blue-2  p-4 md:px-4 md:py-8 md:snap-center">
            <div className="promotion__title *** border-b-4 pb-8 text-golden-1 text-title-1 text-center">{t("price.title")}</div>
            <div className="promotion_container-card *** flex flex-row flex-wrap items-center justify-center py-4 gap-x-8 md:py-8 md:gap-16">
                {prices && prices.map(({ offerAmountDay, offerPrice }, index) =>
                    <button className="promotion__card --btn *** flex flex-col  items-center  gap-2 p-4 md:gap-2.5" key={index}>
                        <div className="text-sm md:text-description-3">{offerAmountDay} {t("price.day")}</div>
                        <div className="text-title-3 xl:text-title-2 font-black">{offerPrice}.-</div>
                        <div className="text-sm md:text-description-3"> {t("price.bath")} / {t("price.day")} </div>
                    </button>
                )}
            </div>
        </div>
    )
};

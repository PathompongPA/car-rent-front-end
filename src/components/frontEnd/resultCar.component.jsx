import { Link, useLoaderData } from "react-router";
import { Reveal } from "../materials";
import { useEffect, useState } from "react";

function genRangeDate(start, end) {
    start = start === null ? end : start
    let date = []
    for (let index = 0; start?.add(index - 1, "day")?.isBefore(end); index++) {
        date.push(start?.add(index, "day").format("YYYY-MM-DD"))
    }
    return date
}

export default function ResultCar({ filter }) {
    const [cars, setCars] = useState(useLoaderData().Car.data)
    let loader = useLoaderData()

    useEffect(() => {
        filter?.brands === null ? setCars(loader?.Car.data.filter(item => item.isDelete === false)) :
            setCars(
                loader?.Car?.data?.filter((item) => {
                    let day = genRangeDate(filter?.start, filter?.end)
                    const bookedSet = new Set(item.bookedDates);
                    let isHidden = item.isDelete === true
                    let isSelectAllBrand = filter?.brands?.length === loader?.Brand?.data?.length
                    let isBrandValid = filter?.brands?.map(item => item.id).includes(item?.brand.id) || isSelectAllBrand
                    let isFree = day.filter(date => bookedSet.has(date)).length === 0
                    return !isHidden & isFree & isBrandValid
                })
            )

    }, [filter?.brands, filter?.end, filter?.start, loader?.Brand?.data?.length, loader?.Car?.data])



    return (
        <div className="result-car >>   flex flex-col  gap-4 flex-wrap justify-center  | min-w-[150px]  lg:min-h-[300px] w-full lg:gap-4 p-4  md:py-4 | bg-linear-to-b from-white to-blue-2/10  | xl:p-0 lg:max-w-7xl md:bg-white md:bg-none snap-start ">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center  md:min-h-[200px] gap-4  w-full">
                {cars?.map(({ carThumbnail, brand, carName, id }, index) =>
                    <Reveal key={index}>
                        <Link to={`/car/?id=${id}`} onClick={() => { window.scrollTo(0, 0) }}
                            className="result-car__card --btn >> flex flex-col items-center | rounded-2xl
                                bg-gray-1/40
                                h-fit
                                md:bg-transparent
                                  text-blue-2
                                   overflow-hidden
                                  w-full
                                  active:text-white active:bg-blue-2/70 
                                  hover:text-white hover:bg-blue-2/90
                                  group
                                  hover:z-20
                                  relative
                                   "
                            key={`${id}+${index}`} >
                            <img className="result-car__img >> aspect-3/2 bg-blue-2/80 object-cover  duration-1000 hover:object-left | w-full  | md:w-full brightness-75 group-hover:brightness-100 " src={carThumbnail} alt={`thumbnail-${brand.brandName}-${carName}`} />
                            <h1 className="result-car__title >> absolute bottom-0 w-full text-white text-end text-2xl text-nowrap  overflow-ellipsis overflow-hidden font-thin | p-4">{`${brand.brandName} ${carName}`}</h1>
                        </Link>
                    </Reveal>
                )}
            </div>
        </div>
    )
};

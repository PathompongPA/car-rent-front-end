import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";

export default function GalleryCar() {
    const [searchParame, setSearchParame] = useSearchParams()
    let parameCarId = searchParame.get("id")
    const { Car } = useLoaderData();
    console.log(Car)
    const { brand, carName, Imgs } = Car.data.filter((item) => item.id === parameCarId)[0]
    const { brandName } = brand;
    const amount = Car.data.length;
    const amountImage = Imgs.length
    const [indexBigImg, setIndexBigImg] = useState(0)
    parameCarId = Car.data.findIndex((item) => item.id === parameCarId)

    useEffect(() => {
        document.title = `${document.title} - ${brandName} ${carName} `
    }, [brandName, carName])

    function handleClickBtnScrollImage(e) {
        const isNext = e.target.getAttribute("next") === 'true'
        const percentOfImageSize = .8
        const imageSize = document.getElementsByClassName("gallery-car__mini-img")[0].clientWidth
        setIndexBigImg(isNext ? indexBigImg + 1 < amountImage ? indexBigImg + 1 : indexBigImg : indexBigImg - 1 >= 0 ? indexBigImg - 1 : indexBigImg)
        document.getElementsByClassName("gallery-car__container-mini-img")[0].scrollLeft += imageSize * percentOfImageSize * (isNext ? 1 : -1)
    }

    function handleOnClickMiniImage(e) {
        setIndexBigImg(Number(e.target.getAttribute("index")))
    }
    // console.log("id", Car.data.findIndex((item) => item.id === parameCarId))

    return (
        <div id="gallery" className="gallery-car *** flex flex-col justify-center items-center | pt-17 | md:p-0 lg:max-w-7xl xl:min-w-7xl lg:snap-center ">

            <div className="gallery-car__container-title *** grid grid-cols-20 w-full items-center | px-4 | text-title-3 font-black text-blue-1  *:items-center *:flex *:not-[button]:justify-center *:h-12 *:md:h-full ">
                <button className={`gallery-car__btn-pre --btn col-span-2 justify-start box-border  p-2  ${parameCarId === 0 && "invisible"}`} onClick={() => { setSearchParame({ "id": parameCarId > 0 ? Car.data[parameCarId - 1].id : Car.data[parameCarId].id }) }}>{`<`}</button>
                <h1 className="gallery-car__title *** select-none text-center col-span-16 text-description-1 h-fit md:text-description-1 xl:text-title-2 text-nowrap truncate">{`${brandName} ${carName}`}</h1>
                <button className={`gallery-car__btn-next --btn col-span-2 justify-end box-border p-2 ${amount - 1 === parameCarId && " invisible "} `} onClick={() => { setSearchParame({ "id": parameCarId < amount - 1 ? Car.data[parameCarId + 1].id : Car.data[parameCarId].id }) }}>{`>`}</button>
            </div>

            <div className="gallery-car__container-img *** flex flex-wrap justify-center items-center relative  gap-0  px-4  w-full md:w-full md:gap-2  ">

                <h1 className="gallery-car__amount-img ***  hidden select-none h-fit absolute right-8 top-4 z-10 | md:block text-white lg:text-2xl font-black text-shadow-black text-shadow-lg/50">{indexBigImg + 1} / {amountImage} </h1>
                <img className="gallery-car__big-img *** aspect-16/9 object-cover | md:w-full rounded-lg  hidden md:block " src={Imgs[indexBigImg]} alt="" />
                <div className="gallery-car__container-mini-img *** flex flex-row justify-start relative overflow-y-hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth | py-0 pb-2 gap-2 | md:rounded-none md:pt-0 lg:gap-2">
                    {Imgs.map((img, index) =>
                        <img className={`gallery-car__mini-img --btn *** w-[95%] aspect-16/9 md:aspect-16/9 snap-center rounded-lg object-cover | lg:w-[200px] ${indexBigImg === index ? "" : "md:brightness-60 lg:brightness-60"} hover:brightness-100`} src={img} alt={`${brandName}-${carName}-${index}`} key={`${carName}-${index}`} index={index} onClick={handleOnClickMiniImage} />
                    )}
                </div>
                <button className="gallery-car__btn-pre-mini-img --btn *** hidden justify-center items-center absolute | p-2 bottom-0 left-4 | md:flex lg:w-[100px] lg:h-[18%] lg:bottom-0 lg:right-0 |  text-shadow-lg/50 text-3xl font-black lg:text-4xl |  text-white select-none | active:text-black/40" onClick={handleClickBtnScrollImage} next="false">{`<`}</button>
                <button className="gallery-car__btn-next-mini-img --btn *** hidden justify-center items-center absolute | p-2 bottom-0 right-4 | md:flex lg:w-[100px]  lg:h-[18%] | text-3xl font-black lg:text-4xl | text-white select-none | active:text-black/40" onClick={handleClickBtnScrollImage} next="true">{`>`}</button>

            </div>

        </div>
    )
};

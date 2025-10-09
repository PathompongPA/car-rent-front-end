import { Link, useLoaderData, useSearchParams } from "react-router";

export default function Filter() {
    const [searchParam] = useSearchParams();
    let searchBrand = searchParam.get('brand')
    let { Brand, Car } = useLoaderData()
    Brand = Brand.data.filter(brand => Car.data.some(car => car.brand.id === brand.id))

    // alert(document.getElementsByClassName("search-car__card")[0]?.clientWidth)
    function scroll(position) {
        const percentOfImageSize = .8
        const imageSize = document.getElementsByClassName("search-car__brand-card")[0].clientWidth
        if (position === 0) {
            document.getElementsByClassName("search-car__card")[0].scrollLeft = 0
        } else {
            document.getElementsByClassName("search-car__card")[0].scrollLeft += imageSize * percentOfImageSize * position
        }
    }

    return (
        <div
            id="booking"
            className=" search-car__filter ...  
            min-w-[50%]
            xl:m-4
            x:mx-8
            overflow-hidden
            flex
            flex-col
            items-center
            bg-gray-1/40
            w-full
            pt-2
            px-4
            pb-6
            lg:w-fit
            lg:p-4
            lg:pr-10
            xl:px-16
            lg:gap-16
            lg:rounded-lg
            lg:flex-row
            lg:bg-gradient-to-t md:from-gray-1 md:to-white 
            xl:max-w-7xl
                md:relative
                        "
        >

            <div
                className=" search-car__card ... 
            --scroll-hide
                flex 
                flex-col
                flex-wrap
                items-center
                h-[100px]
                w-full
                gap-1
                overflow-x-scroll
                overflow-y-hidden
                lg:flex-11/12
                lg:flex-row
                lg:flex-nowrap
                lg:h-fit
                md:p-4
                xl:max-w-[1000px]
                xl:overflow-x-auto
                lg:gap-4
                            "
            >

                <div className={`search-car__container-logo --- absolute *:absolute md:min-w-[1080px] *:p-4 *:px-6 *:z-20 md:flex h-2 left-8 top-19 text-2xl *:bg-gray-100/30 *:text-black ${document.getElementsByClassName("search-car__card")[0]?.clientWidth >= 900 ? "flex" : "hidden"} `}>
                    <button className="search-car__btn-pre --btn --- p-2 px-4 rounded-full left-0 " type="button" onClick={() => { scroll(-1) }}>{`<`}</button>
                    <button className="search-car__btn-next --btn --- p-2 px-4 rounded-full right-0 " type="button" onClick={() => { scroll(1) }}>{`>`}</button>
                </div>

                {Brand.map(({ brandName, brandImg }, index) =>
                    <Link
                        to={`/?brand=${brandName}`}
                        className={` search-car__brand-card --btn ${searchBrand === brandName && "active"} ... 
                            
                            group
                            aspect-1/1
                            w-[100px]
                            p-1
                            xl:min-w-[150px]
                            xl:px-4
                            rounded-lg
                                    `}
                        key={brandName + index}
                    >
                        <img className="search-car__brand-image >> w-full  aspect-1/1 object-scale-down text-blue-2 | md:aspect-1/1 | md:object-scale-down | " src={brandImg} alt="" />
                        <p className="search-car__brand-name  >> group-hover:text-golden-1 hidden | text-center font-bold text-blue-2 | xl:block" >{brandName}</p>
                    </Link>
                )}

            </div>


            <Link to={`/?brand=all`} className={`search-car__btn-all --btn *** text-center ${searchBrand === "all" | searchBrand === null && "active"} >> py-3 px-8 w-[95%] md:w-[80%] lg:w-fit | text-blue-2 font-bold | rounded-lg | md:py-2.5 md:px-4 `} > ทั้งหมด</Link>

        </div>

    )

};

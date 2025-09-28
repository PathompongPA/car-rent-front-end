import { Link, useLoaderData, useSearchParams } from "react-router";

export default function ResultCar() {
    const [searchParam] = useSearchParams();
    let { Car } = useLoaderData()

    let searchBrand = searchParam.get('brand')
    let isHomePage = searchBrand === "all" | searchBrand === null
    let cars = isHomePage ?
        Car.data.filter((item) => {
            let isCarNotHide = item.isDelete === false
            return isCarNotHide
        }) :
        Car.data.filter((item) => {
            let isBrandValid = item.brand.brandName === searchBrand
            let isCarNotHide = item.isDelete === false
            return isBrandValid && isCarNotHide
        }
        )

    return (
        <div className="result-car >> flex flex-col  gap-4 flex-wrap justify-center  | min-w-[150px]  lg:min-h-[300px] w-full lg:gap-4  p-4 xl:px-0 md:py-4 | bg-linear-to-b from-white to-blue-2/10  | lg:max-w-7xl md:bg-white md:bg-none snap-start ">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center  md:min-h-[200px] gap-4  w-full">
                {cars?.map(({ carThumbnail, brand, carName, id }, index) =>
                    <Link to={`/car/?id=${id}`} onClick={() => { window.scrollTo(0, 0) }}
                        className="result-car__card --btn >> flex flex-col items-center |
                                bg-gray-1/40
                                h-fit
                                md:bg-transparent
                                  text-blue-2
                                   rounded-lg |
                                  w-full
                                  active:text-white active:bg-blue-2/70 
                                  hover:text-white hover:bg-blue-2/90
                                  group
                                  hover:z-20
                                   "
                        key={`${id}+${index}`} >
                        <img className="result-car__img >> aspect-16/9  object-cover | w-full rounded-lg | md:w-full " src={carThumbnail} alt={`thumbnail-${brand.brandName}-${carName}`} />
                        <h1 className="result-car__title >> w-full text-nowrap text-center overflow-ellipsis overflow-hidden font-thin | md:text-center md:p-4">{`${brand.brandName} ${carName}`}</h1>
                    </Link>
                )}
            </div>
        </div>
    )
};

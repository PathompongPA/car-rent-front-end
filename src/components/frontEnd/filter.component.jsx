import { useTranslation } from "react-i18next";
import { Link, useLoaderData } from "react-router";
import { Button, Icon, Reveal } from "../materials";
import { useEffect } from "react";

export default function Filter({ filter, onUpdate }) {

    useEffect(() => { }, [filter])

    let { Brand, Car } = useLoaderData()
    Brand = Brand?.data?.filter(brand => Car.data.some(car => car.brand.id === brand.id))
    const { t } = useTranslation();
    let isAllBrand = Brand?.length === filter?.brands?.length
    let on = {
        click: {
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

    return (
        <Reveal className={"w-full"}>
            <div
                id="booking"
                className=" search-car__filter ...   rounded-4xl
            xl:m-8
            overflow-hidden
            flex
            flex-col
            items-center
            w-full
            mx-4
            p-4
            pb-6
            lg:gap-4
    lg:bg-gradient-to-t md:from-gray-1 md:to-white 
            xl:justify-between
            lg:w-full
             shadow-2
            lg:flex-row
            xl:max-w-7xl
            xl:min-w-7xl
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
                gap-4
                overflow-x-scroll
                overflow-y-hidden
                lg:flex-11/12
                lg:flex-row
                lg:flex-nowrap
                xl:w-fit
                lg:h-fit
                xl:overflow-x-auto
                lg:gap-4
                 relative
                px-8
                            "
                >
                    <div className={"search-car__container-logo --- hidden xl:block z-10 absolute left-0 top-1/2 -translate-y-1/2 *:rounded-lg *:fixed  *:top-1/2 *:-translate-y-1/2   *:h-[50px] *:w-[25px] *:bg-black/5 *:text-blue-1 *:font-black w-full  "}>
                        <Button className={"left-1 bg-blue-1 *:min-h-[50px] "} >
                            <Icon variant={"pre"} />
                        </Button>
                        <Button className={"right-1 *:min-h-[50px]"} >
                            <Icon variant={"next"} />
                        </Button>
                    </div>

                    <div className=" w-full h-full flex flex-row gap-2 xl:gap-0 relative overflow-x-scroll xl:overflow-hidden ">
                        {Brand?.map((item, index) => {
                            let isActive = filter.brands !== null ? filter.brands?.some(brand => brand.brandName === item.brandName) : true
                            // console.log(filter.brands?.some(brand => brand.brandName === item.brandName));
                            // console.log(filter);
                            return (
                                <Link to={`/?brand=${item.brandName}`} className={"--btn shadow-1 xl:shadow-none data-[active=false]:opacity-25 relative group aspect-square w-[100px] p-1 xl:min-w-[150px] xl:px-4 rounded-2xl "} key={index} data-active={isActive} onClick={() => { on.click.brand(item) }} >
                                    <img className="search-car__brand-image >> w-full  aspect-1/1 object-scale-down text-blue-2 | md:aspect-1/1 | md:object-scale-down | " src={item.brandImg} alt="" />
                                    <p className="search-car__brand-name  >> absolute bottom-2 w-full left-0 group-hover:text-golden-1 hidden | text-center font-bold text-blue-2 |  xl:block" data-active={isActive} >{item.brandName}</p>
                                </Link>
                            )
                        }
                        )}
                    </div>
                </div>


                <Link to={`/?brand=all`} className={`search-car__btn-all --btn ***  text-center data-[active=true]:bg-blue-1 data-[active=true]:text-white  py-4 px-8 w-full  lg:w-fit | text-blue-2 font-bold | rounded-3xl | md:py-2.5 md:px-4 `} data-active={isAllBrand} onClick={on.click.allBrand} > {t("all")}</Link>

            </div>
        </Reveal>

    )

};

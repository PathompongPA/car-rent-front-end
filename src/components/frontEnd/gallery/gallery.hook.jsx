import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";

export default function useGallery() {
    const loader = useLoaderData();

    const [search, setSearch] = useSearchParams();
    const [indexImage, setIndexImage] = useState(0)


    let carId = search.get("id")
    const { brand, carName, Imgs } = loader.Car.data.filter((item) => item.id === carId)[0]
    let indexCar = loader.Car.data.findIndex((item) => item.id === carId)
    let lastIndexImage = Imgs?.length - 1
    let lastCarIndex = loader.Car.data.length - 1

    let isShow = {
        btn: {
            car: {
                pre: indexCar > 0,
                next: indexCar < lastCarIndex
            }, image: {
                pre: indexImage <= 0,
                next: indexImage >= lastIndexImage
            }
        }
    }

    useEffect(() => {
        document.title = ` ${brand.brandName} ${carName} - รถเช่าบ้านคุณบี88`
    }, [brand.brandName, carName])

    return {
        state: {
            img: Imgs[indexImage],
            images: Imgs,
            indexImage,
            isShow
        },
        ui: {
            title: `${brand.brandName} ${carName}`
        },
        on: {
            click: {
                btn: {
                    car: {
                        pre: () => { isShow.btn.car.pre && setSearch({ "id": loader?.Car?.data[indexCar - 1]?.id }) },
                        next: () => { isShow.btn.car.next && setSearch({ "id": loader?.Car?.data[indexCar + 1]?.id }) }
                    },
                    image: {
                        pre: () => {
                            isShow.btn.image.pre ? setIndexImage(lastIndexImage) : setIndexImage(indexImage - 1)
                        },
                        next: () => {
                            isShow.btn.image.next ? setIndexImage(0) : setIndexImage(indexImage + 1)
                        }
                    }
                },
                image: {
                    mini: (e) => { setIndexImage(Number(e.target.getAttribute("index"))) }
                }
            }
        }
    }
};

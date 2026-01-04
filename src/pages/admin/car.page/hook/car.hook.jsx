import { useEffect, useRef, useState } from "react";
import { useRevalidator } from "react-router";
import { fetchApi } from "../../../../utility";

const changePositionArray = (array, from, to) => {
    const [moved] = array.splice(from, 1);
    array.splice(to, 0, moved);
    return array
}

function mapIndex(array) {
    return array.map((item, index) => ({ id: item.id, index }))
}

export default function useCar(car, alertEvent) {
    let revalidator = useRevalidator()
    let toPosition = useRef()
    let fromPosition = useRef()
    let fromImages = useRef()
    let toImages = useRef()
    const [cars, setCars] = useState(null)
    const [isReOderCar, setIsReOderCar] = useState(null)
    const [isEditCar, setIsEditCar] = useState(false)
    const [isCreateCar, setIsCreateCar] = useState(false)
    const [positionEditCar, setPositionEditCar] = useState(null)

    useEffect(() => { setCars(car) }, [car])

    let carEvent = {
        toggleHide: async (position) => {
            const { isSuccess, msg } = await fetchApi("POST", "/api/car/hide", JSON.stringify({ id: cars[position].id }))
            isSuccess && revalidator.revalidate()
            !isSuccess && alertEvent.sendAlert(msg.errors[0].message)


        },
        create: {
            open: () => { setIsCreateCar(true); carEvent.order.cancel() },
            close: () => { setIsCreateCar(false); revalidator.revalidate() },
        },
        edit: {
            open: (index) => { setIsEditCar(true); setPositionEditCar(index); carEvent.order.cancel() },
            close: () => { setIsEditCar(false); setPositionEditCar(null); revalidator.revalidate() },
            save: async () => {
                let data = JSON.stringify(cars[positionEditCar])
                const { isSuccess, msg } = await fetchApi("PUT", "/api/car", data)
                if (isSuccess) {
                    setIsEditCar(null)
                    revalidator.revalidate()
                } else {
                    if (msg.errors[0].message === "carName must be unique") alertEvent.sendAlert(`${cars[positionEditCar].carName}  ถูกใช้งานแล้ว, กรุณาใช้ชื่ออื่น`)
                }
            },
            cancel: () => { },
            images: {
                delete: async (index) => setCars(state => {
                    let newState = [...state]
                    newState[positionEditCar].Imgs.splice(index, 1)
                    return newState
                })
                ,
                add: async (images) => {
                    let form = new FormData()
                    console.log("images : ", images);
                    Array.from(images).map((file) => {
                        form.append("image", file)
                    })
                    form.append("carId", cars[positionEditCar].id)
                    let { isSuccess } = await fetchApi("POST", "/api/car/image", form, {})
                    isSuccess && revalidator.revalidate()

                },

                drag: {
                    start: (index, e) => {
                        fromImages.current = index;
                        e.target.classList.add("brightness-50");
                    },
                    over: (index, e) => {
                        e.target.classList.add("brightness-50");
                        e.target.classList.add("scale-90");
                        toImages.current = index
                    },
                    leave: (e) => {
                        e.target.classList.remove("brightness-50");
                        e.target.classList.remove("scale-90");
                    },
                    drop: (e) => {
                        e.target.classList.remove("brightness-50");
                        console.log(fromImages, toImages);
                        setCars(state => {
                            let newState = [...state]
                            newState[positionEditCar].Imgs = changePositionArray(newState[positionEditCar].Imgs, fromImages.current, toImages.current)
                            console.log("new : ", newState);
                            return newState
                        })
                    },
                }

            },
            name: {
                change: (name) => setCars((state) => {
                    let newState = [...state]
                    newState[positionEditCar].carName = name
                    return newState
                }),
            },
            thumbnail: {
                change: async (thumbnail) => {
                    let formImage = new FormData()
                    formImage.append("id", cars[positionEditCar].id)
                    formImage.append("thumbnail", thumbnail)
                    const { isSuccess, msg } = await fetchApi("POST", "/api/car/thumbnail", formImage, {});
                    !isSuccess && alertEvent.sendAlert(msg)
                    isSuccess && revalidator.revalidate()
                }
            },
            brand: {
                change: (id) => setCars((state) => {
                    let newState = [...state]
                    newState[positionEditCar].brandId = id
                    return newState
                })
            },
            description: {
                change: (description) => setCars((state) => {
                    let newState = [...state]
                    newState[positionEditCar].carDescription = description
                    return newState
                })
            },
            offer: {
                add: () => setCars(state => {
                    let newState = [...state]
                    newState[positionEditCar].offers.push({ offerPrice: "", offerAmountDay: "" })
                    return newState
                }),
                delete: (position) => setCars(state => {
                    let newState = [...state]
                    newState[positionEditCar].offers.splice(position, 1)
                    return newState
                }),
                changePrice: (position, price) => setCars((state) => {
                    let newState = [...state]
                    newState[positionEditCar].offers[position].offerPrice = price
                    return newState
                })

                ,
                changeDay: (position, day) => setCars(state => {
                    let newState = [...state]
                    newState[positionEditCar].offers[position].offerAmountDay = day
                    return newState
                }),
            }
        },
        order: {
            save: async () => {
                const { isSuccess } = await fetchApi("PUT", "/api/car/index", JSON.stringify({ payload: mapIndex(cars) }))
                isSuccess && setIsReOderCar(false) & revalidator.revalidate()
            },
            cancel: () => { setIsReOderCar(false); setCars(car); },
        },
        drag: {
            start: (index, e) => {
                setIsReOderCar(true)
                fromPosition.current = index;
                e.target.classList.add("brightness-50");
            },
            over: (index, e) => {
                e.target.classList.add("brightness-50");
                e.target.classList.add("scale-90");
                toPosition.current = index
            },
            leave: (e) => {
                e.target.classList.remove("brightness-50");
                e.target.classList.remove("scale-90");
            },
            drop: (e) => {
                e.target.classList.remove("brightness-50");
                setCars(state => changePositionArray([...state], fromPosition.current, toPosition.current))
            },
        }
    }

    return {
        cars,
        carEvent,
        positionEditCar,
        isReOderCar,
        isEditCar,
        isCreateCar
    }
};

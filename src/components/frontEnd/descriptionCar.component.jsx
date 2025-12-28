import { useLoaderData, useSearchParams } from "react-router";

export default function DescriptionCar() {
    const [search] = useSearchParams()
    let searchCarId = search.get("id")
    const { Car } = useLoaderData();
    // let car = Car.data.find((element) => element.id === searchCarId)
    let car = Car.data.filter((item) => item.id === searchCarId)[0]
    // .find((element) => element.id === searchCarId)
    return (
        <div className="description-car *** flex flex-col w-full p-4 *:text-blue-1 gap-2 md:max-w-7xl ">
            <h1 className="text-lg text-blue-1  font-black  md:text-description-1 ">รายละเอียด</h1>
            <p className="w-full break-words whitespace-pre  ">{car.carDescription}</p>
        </div>
    )
};

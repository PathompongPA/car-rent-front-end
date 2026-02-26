import { fetchApi } from "../../utility"

export default async function adminLoader() {
    const [allBrand, brandRes, carRes, customer, booking, content, reviews, viewBoard, Logo] = await Promise.all([
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car"),
        fetchApi("GET", "/api/customer/"),
        fetchApi("GET", "/api/booking"),
        fetchApi("GET", "/api/content"),
        fetchApi("GET", "/api/reviews"),
        fetchApi("GET", "/api/content/viewBoard"),
        fetchApi("GET", "/api/content/logo"),
    ])
    const AllBrand = await allBrand
    const Brand = await brandRes
    const Car = await carRes
    const Customer = await customer
    const Booking = await booking
    const Reviews = await reviews
    let viewBoards = await viewBoard.data.viewBoard
    let logo = await Logo?.data?.logo

    let contents = undefined
    try {
        contents = content.data !== null ? JSON.parse(content.data.value) : undefined
    }
    catch (error) {
        console.log(error);
    }
    return { Brand, Car, Customer, Booking, contents, Reviews, AllBrand, viewBoards, logo }
}
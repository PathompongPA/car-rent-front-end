import { createHashRouter } from "react-router";
import { Admin, FormBooking, FormContent } from "../components/admin";
import { Calendar, Contact, DescriptionCar, Filter, Footer, GalleryCar, JourneyBooking, Promotion, QAndAComponent, ResultCar, Review } from "../components/frontEnd";
import { CarPage, CustomerPage, ErrorPage, HistoryBookingPage, OutOfPage } from "../pages/admin";
import { HomePage } from "../pages/frontEnd";
import { fetchApi } from "../utility";
import { Loading, NavigationBar } from "../components/ui";

function getValueById(_rowData, _id) { return _rowData?.data?.filter(({ id }) => id === _id)[0].value }

async function adminLoader() {
    const [allBrand, brandRes, carRes, customer, booking, content, reviews] = await Promise.all([
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car"),
        fetchApi("GET", "/api/customer/"),
        fetchApi("GET", "/api/booking"),
        fetchApi("GET", "/api/content"),
        fetchApi("GET", "/api/reviews"),
    ])
    const AllBrand = await allBrand
    const Brand = await brandRes
    const Car = await carRes
    const Customer = await customer
    const Booking = await booking
    const Reviews = await reviews

    let contents = undefined
    try {
        contents = content.data !== null ? JSON.parse(content.data.value) : undefined
    } catch (error) {
        console.log(error);

    }
    return { Brand, Car, Customer, Booking, contents, Reviews, AllBrand }
}

async function carLoader() {
    const [allBrand, brandRes, carRes, customer, booking, content, reviews] = await Promise.all([
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car")
            .then(res => {
                return {
                    isSuccess: true,
                    data: res.data?.filter(item => item.isDelete === false)
                }
            }),
        fetchApi("GET", "/api/customer/"),
        fetchApi("GET", "/api/booking"),
        fetchApi("GET", "/api/content"),
        fetchApi("GET", "/api/reviews"),
    ])
    const AllBrand = await allBrand
    const Brand = await brandRes
    const Car = await carRes
    const Customer = await customer
    const Booking = await booking
    const Reviews = await reviews

    let contents = undefined
    try {
        contents = content.data !== null ? JSON.parse(content.data.value) : undefined
    } catch (error) {
        console.log(error);

    }
    return { Brand, Car, Customer, Booking, Reviews, AllBrand, contents }
}

const router = createHashRouter([
    {
        path: "/224",
        element: <Admin />,
        children: [
            {
                path: "",
                element: <HistoryBookingPage />,
                loader: adminLoader

            },
            {
                path: "จองรถ",
                element: <FormBooking />,
                loader: adminLoader,
            },
            {
                path: "ประวัติการจอง",
                element: <HistoryBookingPage />,
                loader: adminLoader,
            },
            {
                path: "รถ",
                element: <CarPage />,
                loader: adminLoader,
            },
            {
                path: "ลูกค้า",
                element: <CustomerPage />,
                loader: adminLoader,
            },
            {
                path: "หน้าเว็บ",
                element: <FormContent />,
                loader: adminLoader,
            }
        ],
        loader: adminLoader,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <Loading />

    },
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        loader: carLoader,
    },
    {
        path: "/car",
        loader: carLoader,
        element:
            <div className="flex flex-col justify-center items-center w-full ">
                <NavigationBar />
                <GalleryCar />
                <Calendar />
                <Promotion />
                <DescriptionCar />
                <Contact />
                <JourneyBooking />
                <Review />
                <QAndAComponent />
                <Footer />
            </div>,

    },
    {
        path: "*",
        element: <OutOfPage />
    },
])

export { router };


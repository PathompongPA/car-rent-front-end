import { createHashRouter } from "react-router";
import { Admin, FormBooking, FormContent } from "../components/admin";
import { Contact, DescriptionCar, Footer, GalleryCar, JourneyBooking, Promotion, QAndAComponent, Review } from "../components/frontEnd";
import { CarPage, CustomerPage, ErrorPage, HistoryBookingPage, OutOfPage } from "../pages/admin";
import { HomePage } from "../pages/frontEnd";
import { fetchApi } from "../utility";
import { Loading, NavigationBar } from "../components/ui";
import CalendarBooked from "../components/frontEnd/calendarBooked/calendar.booked.component";

async function adminLoader() {
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

async function carLoader() {
    const [allBrand, brandRes, carRes, customer, booking, content, reviews, viewBoard, Logo] = await Promise.all([
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car/brand"),
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
    let logo = await Logo.data.logo
    let contents = undefined
    try {
        contents = content.data !== null ? JSON.parse(content.data.value) : undefined
    } catch (error) {
        console.log(error);

    }
    return { Brand, Car, Customer, Booking, Reviews, AllBrand, contents, viewBoards, logo }
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
        hydrateFallbackElement: <Loading />
    },
    {
        path: "/car",
        loader: carLoader,
        hydrateFallbackElement: <Loading />,
        element:
            <div className="flex flex-col justify-center items-center w-full ">
                <NavigationBar />
                <GalleryCar />
                <CalendarBooked />
                <Promotion />
                <DescriptionCar />
                <Contact />
                <JourneyBooking />
                <Review />
                <QAndAComponent />
                <Footer />
            </div>

    },
    {
        path: "*",
        element: <OutOfPage />
    },
])

export { router };


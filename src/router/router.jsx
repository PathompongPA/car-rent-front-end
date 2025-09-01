import { createHashRouter } from "react-router";
import { Calendar, Contact, DescriptionCar, Filter, Footer, GalleryCar, JourneyBooking, NavigationBar, Promotion, QAndAComponent, ResultCar, Review } from "../components/frontEnd";
import { HomePage } from "../pages/frontEnd";
import { Admin, FormBooking, FormCar, FormContent, FormCustomer } from "../components/admin";
import { fetchApi } from "../utility";
import { CarPage, CustomerPage, ErrorPage, HistoryBookingPage, OutOfPage } from "../pages/admin";

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
    const Content = await content
    const Reviews = await reviews
    return { Brand, Car, Customer, Booking, Content, Reviews, AllBrand }
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
    },
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        loader: adminLoader,
        children: [
            {
                path: "",
                element:
                    [
                        <Filter />,
                        <ResultCar />,
                        <JourneyBooking />,
                        <Review />,
                        <Contact />
                    ],
                loader: adminLoader
            },
        ],
    },
    {
        path: "/car",
        loader: adminLoader,
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

export { router }
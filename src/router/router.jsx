import { createHashRouter } from "react-router";
import { Admin, FormBooking, FormContent } from "../components/admin";
import { Calendar, Contact, DescriptionCar, Filter, Footer, GalleryCar, JourneyBooking, NavigationBar, Promotion, QAndAComponent, ResultCar, Review } from "../components/frontEnd";
import { CarPage, CustomerPage, ErrorPage, HistoryBookingPage, OutOfPage } from "../pages/admin";
import { HomePage } from "../pages/frontEnd";
import { fetchApi } from "../utility";

async function loadFile(url) {
    const res = await fetch(url);
    const blob = await res.blob();
    const fileName = url.split("/").pop();
    const fileType = blob.type;
    return new File([blob], fileName, { type: fileType });
}
async function loadCarImages(urls) {
    return await Promise.all(urls.map(async (url) => await loadFile(url)));
}

async function adminLoader() {
    const [allBrand, brandRes, carRes, customer, booking, content, reviews] = await Promise.all([
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car/brand/all"),
        fetchApi("GET", "/api/car").then(async res => (
            {
                isSuccess: true,
                data: await Promise.all(res.data.map(async item => ({
                    ...item,
                    Imgs: await loadCarImages(item.Imgs),
                    carThumbnail: await Promise.resolve(loadFile(item.carThumbnail))
                }))
                )
            }
        )),
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
        hydrateFallbackElement: <div>Loading...</div>

    },
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        loader: carLoader,
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
                loader: carLoader
            },
        ],
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


import { createHashRouter } from "react-router";
import { Admin, FormBooking, FormContent } from "../components/admin";
import { CarPage, CustomerPage, ErrorPage, HistoryBookingPage, OutOfPage } from "../pages/admin";
import { CarPageClient, HomePage } from "../pages/frontEnd";
import { Loading } from "../components/ui";
import adminLoader from "./loader/admin.loader";
import clientLoader from "./loader/client.loader";


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
        loader: clientLoader,
        hydrateFallbackElement: <Loading />
    },
    {
        path: "/car",
        loader: clientLoader,
        hydrateFallbackElement: <Loading />,
        element: <CarPageClient />

    },
    {
        path: "*",
        element: <OutOfPage />
    },
])

export { router };


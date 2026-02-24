import { useEffect, useState } from "react"
import { Outlet, useLoaderData, useLocation } from "react-router"
import { Brander, Contact, Filter, Footer, JourneyBooking, QAndAComponent, ResultCar, Review } from "../../components/frontEnd"
import { NavigationBar } from "../../components/ui"

export default function HomePage() {
    let location = useLocation()
    const loader = useLoaderData();
    const [filter, setFilter] = useState({
        brands: loader.Brand.data,
        start: null,
        end: null
    })

    console.log(filter);
    let on = {
        search: (newValue) => { setFilter(newValue) }
    }

    useEffect(() => {
        if (location.pathname === "/") { document.title = "รถเช่าบ้านคุณบี 88" }
    }, [location])

    return (
        <div className="home-page *:flex *:items-center *:justify-center flex flex-col justify-center items-center  gap-0 ">
            <NavigationBar />
            <Brander onSearch={on.search} filter={filter} />
            <Outlet />
            <Filter filter={filter} onUpdate={on.search} />
            <ResultCar filter={filter} />
            <JourneyBooking />
            <Review />
            <Contact />
            <QAndAComponent />
            <Footer />
        </div>
    )
};

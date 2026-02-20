import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router"
import { Brander, Contact, Filter, Footer, JourneyBooking, QAndAComponent, ResultCar, Review } from "../../components/frontEnd"
import { NavigationBar } from "../../components/ui"

export default function HomePage() {
    let location = useLocation()
    const [filter, setFilter] = useState({
        brands: null,
        start: null,
        end: null
    })

    let on = {
        search: (newValue) => { console.log("on search :", filter); setFilter(newValue) }
    }

    useEffect(() => {
        if (location.pathname === "/") { document.title = "รถเช่าบ้านคุณบี 88" }
    }, [location])

    return (
        <div className="home-page *:flex *:items-center *:justify-center flex flex-col justify-center items-center  ">
            <NavigationBar />
            <Brander onSearch={on.search} />
            <Outlet />
            <Filter />
            <ResultCar filter={filter} />
            <JourneyBooking />
            <Review />
            <Contact />
            <QAndAComponent />
            <Footer />
        </div>
    )
};

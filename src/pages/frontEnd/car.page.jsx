import { CalendarBooked, Contact, DescriptionCar, Footer, GalleryCar, JourneyBooking, Promotion, QAndAComponent, Review } from "../../components/frontEnd"
import { NavigationBar } from "../../components/ui"

export default function CarPageClient() {
    return (
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
    )
};

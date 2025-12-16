import { useLoaderData } from "react-router";

export default function JourneyBooking() {
    const { Content } = useLoaderData();
    const { journeyBooking } = Content;

    return (
        <div id="journeyBooking" className=" journey-booking >> flex flex-col justify-center items-center | p-4 py-8  pb-0 gap-8 w-full h-full | lg:max-w-7xl lg:snap-center pt-24" >
            <h1 className="journey-booking__title >> hidden md:block text-blue-1 font-black text-title-2 | md:text-title-1">{journeyBooking.title.text}</h1>
            <div className="journey-flex -card >> flex justify-center items-center flex-wrap | gap-4 w-full h-full | lg:gap-8 ">
                {journeyBooking.card.map(({ title, detail }, index) =>
                    <button
                        // style={{ backgroundImage: `url(${image})` }}
                        className={`journey-booking__card --btn >> bg-cover group ease-in flex flex-col xl:justify-end items-center | w-full p-1 h-full | bg-blue-1  | rounded-lg | text-white text-xl font-extrabold | lg:w-[390px] text-center md:h-[400px] xl:h-[450px] `} key={`journey-booking-card-${index}`} index={index}>
                        <h1 className="journey-booking__card-title >> group-hover:md:text-title-3  group-focus:text-title-3 duration-300  flex justify-center items-center | xl:h-full w-full  h-fit p-4  lg:p-0| text-title-3 | md:p-8 lg:p-8 lg:w-full  | lg:text-title-2" index={index}> {title} </h1>
                        <div className={`jouryney-booking__container-detail >> backdrop-blur-lg  overflow-hidden 
                            p-4
                            border-red-500
                            h-full
                            lg:h-[30vh] xl:h-0
                            | w-full  gap-4 | bg-white/70 xl:bg-white | rounded-lg 
                            group-hover:xl:visible group-hover:xl:h-[1000px]  group-hover:xl:p-4 
                            duration-100 xl:duration-800 flex flex-col justify-start  items-start 
                            | xl:items-start xl:justify-start | xl:p-0 xl:max-w-full  lg:invalid:`} index={index}>
                            {detail.map((param, _index) =>
                                <div className={`journey-booking__card-detail >> flex justify-start items-start | h-fit | font-light text-blue-1 text-[16px] `} key={`journey-booking-card-detail-${_index}`} index={_index}>{`${_index + 1}. ${param}`}</div>
                            )}
                        </div>
                    </button>
                )
                }
            </div >
        </div >
    )
};

import { useState } from "react";
import { useLoaderData } from "react-router";

export default function Review() {
    const { Reviews } = useLoaderData();
    console.log("reviews", Reviews)
    const [showMore, setShowMore] = useState(false)
    function handleBtnShowMore() {
        setShowMore(!showMore)
    }
    return (
        <div id="review" className="review >> flex flex-col justify-center items-center | w-full gap-8  px-4 py-8 pt-24 | md:max-w-7xl md:gap-8 lg:snap-center">

            <h1 className="review__title >> text-center font-bold text-6xl text-blue-1">{"รีวิว"}</h1>

            <h3 className="review__description >> text-center font-bold text-blue-1">{`${"จากผู้ใช้งาน"} ${Reviews.length} รีวิว`}</h3>

            <div className={`review__container-card >> flex flex-col md:grid md:grid-cols-3 relative overflow-hidden items-center justify-self-center self-center | w-full gap-4  ${showMore ? "h-full" : "h-[70vh] md:h-[50vh]"} duration-600`}>

                {Reviews.map(({ profilePicUrl, name, text, time }, index) =>
                    <div className="review__card >> flex flex-col w-full h-full p-2 pb-8 | border border-golden-1 rounded-lg | md:p-4 " key={`review-card-${index}`}>

                        <div className="review__container-header-card >> flex items-center | w-full md:gap-4 gap-4 ">
                            <img className="review_card-img >> aspect-1/1 | w-[50px] bg-gray-1 rounded-full" src={profilePicUrl} />
                            <div className="review__container-title-card">
                                <h3 className="review__card-review-name >> font-bold text-blue-1">{name}</h3>
                                <div className="review__card-date >> text-xs font-medium text-blue-1">{time}</div>
                            </div>
                        </div>

                        <h1 className="review__card-message >> text-center  text-lg font-light text-blue-1 h-full items-center p-4 ">{`"${text}"`}</h1>

                    </div>
                )}

                <button className="review__btn-show-more --btn >> absolute bottom-4 md:left-[35%] lg:left-[40%] xl:left-[43%] rounded-full | px-8 w-fit p-4 | bg-blue-1 | font-bold text-white text-[18px]" onClick={handleBtnShowMore}>{!showMore ? "แสดงผลลัพธ์เพิ่มเติม" : "แสดงให้น้อยลง"}</button>

            </div>

        </div>
    )

};

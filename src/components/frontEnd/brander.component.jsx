import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export default function Brander() {
    let { Content } = useLoaderData();
    const list = Content?.data.filter(item => item.id === "viewBoard.image")[0].value
    let [index, setIndex] = useState(0)

    useEffect(() => {
        let Scroll = setInterval(() => {
            handleScrollNext()
        }, 4000);
        return () => clearInterval(Scroll)
    }, [handleScrollNext])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleScrollNext() {
        if (index === list.length - 1) {
            setIndex(0)
            scroll(0)
        } else {
            setIndex(index + 1)
            scroll(1)
        }
    }

    function handleScrollPre() {
        if (index !== 0) {
            setIndex(index - 1)
            scroll(-1)
        }
    }

    function scroll(position) {
        const percentOfImageSize = .8
        const imageSize = document.getElementsByClassName("brander__image")[0].clientWidth
        if (position === 0) {
            document.getElementsByClassName("brander__slide-image")[0].scrollLeft = 0
        } else {
            document.getElementsByClassName("brander__slide-image")[0].scrollLeft += imageSize * percentOfImageSize * position
        }
    }

    let isFristImage = index === 0
    let isOnlyOneImage = list?.length === 1
    return (
        <div className="brander ... relative items-start justify-center | w-full gap-4 | pt-16 xl:pt-0  md:max-w-7xl" >

            <div className="brander__interface ... flex flex-col justify-center absolute | w-full h-full top-0" >

                <div className={`brander__next-and-pre ... absolute flex | h-fit w-full p-4 || *:absolute *:justify-center *:items-center *:rounded-full *:aspect-1/1 *:font-black  *:w-[10vw] *:md:w-[3vw] *:md:text-xl *:bg-white/80 *:text-black ${isOnlyOneImage && "hidden"}`} >
                    <div className={`brander__btn-pre-image --btn ... left-4 ${isFristImage ? "hidden" : "flex"}`} onClick={handleScrollPre} > {`<`} </div>
                    <div className={`brander__btn-next-image --btn ... right-4 flex`} onClick={handleScrollNext} > {`>`} </div>
                </div>

                <div className={`brander__display-dot ... absolute bottom-0 flex flex-row justify-center | h-[4vh] md:h-[5vh] w-full gap-2 lg:gap-4 ${isOnlyOneImage && "hidden"} `} >
                    {list?.map((param, _index) => {
                        let isLocation = index === _index
                        return (
                            <div className={`brander__dot ... h-[1.5vh] rounded-full  w-[1.5vh] md:w-[1vh] md:h-[1vh] aspect-1/1 ${isLocation ? "bg-golden-1" : "bg-white"} `} key={_index}></div>
                        )
                    })}
                </div>

            </div >

            <div className="brander__slide-image --scroll-hide ... flex flex-row snap-x snap-mandatory overflow-x-scroll md:overflow-x-scroll overflow-y-hidden | w-full  ">
                {list?.map((image, _index) =>
                    <img className="brander__image ... snap-center  md:w-7xl object-cover aspect-21/9 brightness-95  " src={image} alt="big image" key={image + _index} />
                )}
            </div>

        </div >
    )
};

import { useLoaderData } from "react-router";

export default function Contact() {
    let { Content } = useLoaderData();
    const { card, title } = Content.contact;
    return (
        <div id="contact" className="contact >> flex flex-col justify-center items-center | w-full p-4 pt-24 | md:gap-8 lg:max-w-7xl lg:snap-center ">
            <h1 className="contact__title >> w-full | hidden text-center font-black text-title-1 text-blue-1 md:block">{title.text}</h1>
            <div className="contact__container >> flex flex-2/3 justify-center flex-wrap | w-full  gap-4 | xl:gap-0 lg:flex-nowrap ">
                {card.map(({ title, list }, index) =>
                    <div className={`contact__card --btn >> flex flex-col md:flex-1/3 | w-full md:py-4 gap-2 md:gap-8 |  bg-white  | text-blue-1  `} key={index}>
                        <h1 className={`contact__card-title >> text-center font-bold text-title-3 ${title === "โทรศัพท์" ? "text-golden-1" : title === "facebook" ? "text-blue-700" : title === "line" ? "text-lime-500" : ""}`} >{title}</h1>
                        <button className="contact__card-link-container >> flex flex-col items-center | gap-2 md:gap-4 h-full | md:flex-1">
                            {list.map(({ link, text }, index) =>
                                <a className="contact__card-link --btn >> text-wrap bg-blue-1 text-white px-8  py-4 w-full text-center rounded-full  active:text-white xl:bg-transparent xl:text-blue-1 md:active:bg-transparent text-title-3 font-bold" href={title === "โทรศัพท์" ? "tel:" + link : link} target="_blank" key={text + index}>{text}</a>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div >
    )

};

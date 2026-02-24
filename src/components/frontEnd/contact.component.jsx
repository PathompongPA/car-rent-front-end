import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import { Reveal } from "../materials";

export default function Contact() {
    let loader = useLoaderData();
    const { i18n } = useTranslation();
    return (
        <Reveal>
            <div id="contact" className="contact >> flex flex-col justify-center items-center | w-full p-4 pt-24 | md:gap-8 lg:max-w-7xl lg:snap-center ">
                <Reveal>
                    <h1 className="contact__title >> w-full | hidden text-center font-black text-title-1 text-blue-1 md:block">{loader?.contents?.contact[i18n.language]?.title}</h1>
                </Reveal>
                <div className="contact__container >> flex flex-2/3 justify-center flex-wrap | w-full  gap-4 | xl:gap-0 lg:flex-nowrap ">
                    {loader?.contents?.contact[i18n.language]?.card?.map((card, index) =>
                        <Reveal key={index}>
                            <div className={`contact__card --btn >> flex flex-col md:flex-1/3 | w-full md:py-4 gap-2 md:gap-8 |  bg-white  | text-blue-1  `} key={index}>
                                <h1 className={`contact__card-title >> text-center font-bold text-title-3 data-[title=โทรศัพท์]:text-golden-1 data-[title=phone]:text-golden-1 data-[title=facebook]:text-blue-800 data-[title=line]:text-lime-500 `} data-title={card.title} >{card.title}</h1>
                                <button className="contact__card-link-container >> flex flex-col items-center | gap-2 md:gap-4 h-full | md:flex-1">
                                    {card?.list?.map((list, index) =>
                                        <a className="contact__card-link --btn >> text-wrap bg-blue-1 text-white px-8  py-4 w-full text-center rounded-full  active:text-white xl:bg-transparent xl:text-blue-1 md:active:bg-transparent text-title-3 font-bold" href={card.title === "โทรศัพท์" ? "tel:" + list.link : list.link} target="_blank" key={index}>{list.text}</a>

                                    )}
                                </button>
                            </div>
                        </Reveal>

                    )}
                </div>
            </div >
        </Reveal>
    )

};

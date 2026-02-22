import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

export default function QAndAComponent() {
    let loader = useLoaderData();
    const { i18n } = useTranslation()
    let isHaveCard = loader?.contents?.faq[i18n.language]?.value?.length > 0
    return (
        isHaveCard &&
        <div id="Qa" className="q-and-a >> flex flex-col w-full p-4 pt-24 pb-4 md:max-w-7xl lg:snap-center" >
            <h1 className="q-and-a__title >> hidden  text-center text-6xl text-blue-1 font-black m-8 md:block ">{loader?.contents?.faq[i18n.language]?.title}</h1>
            <div className="q-and-q__container-card >> flex flex-row flex-wrap justify-center items-center gap-4 w-full ">
                {loader?.contents?.faq[i18n.language].value.map((item, index) =>
                    <details className=" h-fit text-xl text-blue-1 font-bold flex-1/2 " name={item?.q} key={`Q ${index}`} >
                        <summary className="bg-blue-1 text-white p-4 rounded-xl">{`${item?.a}`}</summary>
                        <p className="px-4 p-8 md:p-8 lg:pl-16 lg:text-xl text-blue-1/80 font-black bg-gray-1/40 rounded">{`${item?.a}`}</p>
                    </details>
                )}
            </div>
        </div >
    )
};

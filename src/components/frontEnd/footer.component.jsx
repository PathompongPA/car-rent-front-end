import { useLoaderData } from "react-router";

let varaintSocials = (_title) => {
    let textColor = ""
    switch (_title) {
        case "facebook": textColor = " fa-brands fa-facebook-square text-blue-600 text-5xl "; break;
        case "instagram": textColor = " fa-brands fa-instagram text-pink-600 text-5xl  "; break;
        case "line": textColor = " fa-brands fa-line text-lime-600 text-5xl "; break;
        case "tiktok": textColor = " fa-brands fa-tiktok text-black text-5xl p-2 "; break;
        case "X": textColor = " fa-brands fa-x-twitter text-black  text-5xl "; break;
        case "youtube": textColor = " fa-brands fa-youtube text-red-600 text-5xl "; break;
    }
    return textColor
}
export default function Footer() {
    let { Content } = useLoaderData()
    const { logo, address, socialMedia } = Content;
    let listSocialMedea = socialMedia?.map(({ type, link }) => <a className={` hover:scale-125 duration-300 ${varaintSocials(type)} `} href={link} target="_blank" ></a>)
    return (
        <div className="container-footer >> flex justify-center | w-full border-t-4 border-golden-1 ">
            <div className="footer >> flex  flex-col justify-center  items-center | p-4 | text-blue-1 | md:py-0 md:flex-row lg:w-7xl md:gap-16 *:*:h-full ">
                <img className="footer__logo >> w-full object-cover aspect-16/11 | md:w-[250px] " src={logo} alt="logo" />
                <div className="footer__contacts >> flex flex-col | p-4 gap-4 | md:gap-2 md:flex-1/3">
                    <p className="footer__title-contact >> text-center md:text-start text-description-3 font-bold ">ที่อยู่</p>
                    <p className=" indent-4 text-justify leading-snug px-8 md:px-1 ">
                        {address.text}
                    </p>
                </div>
                <div className="footer__follows >> flex flex-wrap items-center justify-around | w-full p-4 px-8 md:px-4 gap-4 | md:gap-2 md:flex-1/3 ">
                    <h1 className="footer__follows-title >> w-full text-description-3 font-bold text-center ">ติดตามเรา</h1>
                    {listSocialMedea}
                </div>
            </div>
        </div>
    )
};

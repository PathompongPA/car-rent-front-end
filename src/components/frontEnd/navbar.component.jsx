import { Link, useLoaderData } from "react-router";

export default function NavigationBar() {
    const { Content } = useLoaderData();
    const { navbar, logo } = Content;

    let handleBtnHamburgerMenu = () => setTimeout(() => { document.getElementsByClassName("navigation__menu")[0].classList.toggle("hidden") }, 75);
    return (
        <div className="navigation >> flex justify-center sticky | top-0 z-50 w-full | md:border-b-4 md:border-golden-1 md:bg-white md:px-4 md:sticky " >

            <div className="navigation__container >> flex flex-col grow |  max-w-7xl  md:h-[60px] | md:border-0 md:items-center md:flex-row">
                <div className="navigation__container-logo >>  flex grow justify-between items-center | pr-4 border-b-4 border-golden-1  | bg-white md:bg-none | md:bg-transparent md:border-b-0 ">
                    <Link to="/" className="">
                        <img className="navigation__logo >> aspect-16/9 object-cover | max-h-[60px] md:max-h-[60px] " src={logo} alt="logo" onClick={() => { window.scrollTo(0, 0) }} />
                    </Link>
                    <button className="navigation__btn-hamburger-menu --btn >> flex flex-col items-end | gap-[5px] | md:hidden group " onClick={handleBtnHamburgerMenu} >
                        <div className={`navigation__element-hamburger-menu >> bg-blue-1 w-[40px] h-[5px] rounded-lg group-active:bg-golden-1  `} ></div>
                        <div className={`navigation__element-hamburger-menu >> bg-blue-1 w-[40px] h-[5px] rounded-lg group-active:bg-golden-1  `} ></div>
                        <div className={`navigation__element-hamburger-menu >> bg-blue-1 w-[40px] h-[5px] rounded-lg group-active:bg-golden-1  `} ></div>
                    </button>
                </div>

                <div className="navigation__menu >> hidden flex flex-col items-end |  p-2 gap-8 grow h-[100vh] | bg-white/40 backdrop-blur-lg | md:flex md:flex-row md:justify-end | md:p-0 md:gap-14 md:h-fit | md:bg-transparent " onClick={handleBtnHamburgerMenu}>
                    {navbar.map(({ text, link }, index) =>
                        <button onClick={() => { document.getElementById(link).scrollIntoView() }} className="navigation__title --btn >> w-full text-end | text-blue-1 text-description-3 md:text-sm font-bold | md:w-fit | active:text-golden-1" key={text + index} > {text} </button>
                    )}
                </div>

            </div>
        </div>
    )
};

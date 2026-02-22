import { useState } from "react";
import { useLoaderData } from "react-router";

export default function useNavigationBar() {
    const loader = useLoaderData();
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    let on = {
        click: {
            menu: (link) => {
                document.getElementById(link).scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                })
            },
            logo: () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            },
            hamburgerMenu: (newState) => { setIsOpenMenu(newState) }
        }
    }
    return {
        state: {
            navbar: loader?.navbar,
            logo: loader?.logo,
            isOpenMenu
        },
        on,
        isOpenMenu
    }

};

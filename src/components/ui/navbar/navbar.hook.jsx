import { useState } from "react";
import { useLoaderData } from "react-router";

export default function useNavigationBar() {
    const { Content } = useLoaderData();
    const { navbar, logo } = Content;
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    let on = {
        click: {
            menu: (link) => { document.getElementById(link).scrollIntoView() },
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
            navbar, logo, isOpenMenu
        },
        on,
        isOpenMenu
    }

};

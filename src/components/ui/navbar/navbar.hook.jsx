import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export default function useNavigationBar() {
    const loader = useLoaderData();
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const { i18n } = useTranslation();

    useEffect(() => {
        if (isOpenMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpenMenu])

    let on = {
        click: {
            menu: (link) => {
                console.log(
                    location.pathname
                );
                document.getElementById(link).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
                setIsOpenMenu(false)
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
            navbar: loader?.contents?.navbar[i18n.language]?.value,
            logo: loader?.logo,
            isOpenMenu
        },
        on,
        isOpenMenu
    }

};

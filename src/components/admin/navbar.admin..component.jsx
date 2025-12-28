import { Link } from "react-router";

export default function NavbarAdmin() {
    function logout() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.assign("/#/224");
    }

    return (
        <ul className=" fixed flex flex-col  md:col-span-2 gap-4 text-end *:p-4 w-full bg-gray-900 z-40 " >
            <span className="text-description-1 font-bold text-end border-b-4 border-gray-800 cursor-pointer md:hidden " onClick={() => { document.getElementsByClassName("navbar-admin")[0].classList.toggle("hidden") }}>{decodeURIComponent(location.hash.substring(1)).split("/")[2] === undefined ? "ประวัติการจอง" : decodeURIComponent(location.hash.substring(1)).split("/")[2]} ☰ </span>
            <div className="navbar-admin --- border-gray-800 hidden flex flex-col md:flex-row md:flex md:h-fit md:justify-end h-[100vh] top-4 gap-4 *:p-2 *:not-first:hover:text-golden-1 " onClick={() => { document.getElementsByClassName("navbar-admin")[0].classList.toggle("hidden") }}>
                <Link to={"จองรถ"}>จองรถ</Link>
                <Link to={"ประวัติการจอง"}>ประวัติการจอง</Link>
                <Link to={"รถ"}>รถ</Link>
                <Link to={"ลูกค้า"}>ลูกค้า</Link>
                <Link to={"หน้าเว็บ"}>หน้าเว็บ</Link>
                <button className=" bg-gray-800 rounded-lg cursor-pointer" type="button" onClick={logout}>ออกจากระบบ</button>
            </div>
        </ul>
    )

};

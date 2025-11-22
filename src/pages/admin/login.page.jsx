import { fetchApi } from "../../utility";

export default function LoginPage() {

    async function submintFormLogin() {
        let userName = document.getElementsByClassName("login-page__input-admin-user")[0].value
        let password = document.getElementsByClassName("login-page__input-admin-password")[0].value
        let body = { userName, password }
        let isBodyRady = userName.length > 0 & password.length > 0
        if (isBodyRady) {
            const { data } = await fetchApi("POST", "/api/user/login", JSON.stringify(body))
            let isLogin = data.isLogin
            console.log(data)
            isLogin ? location.reload(true) : alert(data.msg)
            isLogin && alert("เข้าสู่ระบบสำเร็จ")
        }
        else {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน \n\tuser name \n\tpassword")
        }
    }

    return (
        <div className="login-page --- fixed h-full w-full z-50 bg-gray-900 flex flex-col justify-center items-center *:text-white gap-4 ">
            <h1 className="login-page__title --- text-title-3"> เข้าสู่ระบบ </h1>
            <form className="login-page__form-login --- *:text-white *:border *:border-gray-800 *:rounded-lg --- flex flex-col gap-4">
                <input className="login-page__input-admin-user ---" type="text" name="userName" id="input-admin-user" placeholder="user" />
                <div className="login-page___container-admin-password">
                    <input className="login-page__input-admin-password --- border-none" type="password" name="password" id="input-admin-password" placeholder="password" />
                    <button className="login-page__btn-show-password --- text-xs p-2 rounded-lg cursor-pointer hover:text-golden-1 border-golden-1 " type="button" onClick={() => { let inputPassword = document.getElementsByClassName("login-page__input-admin-password")[0]; inputPassword.type = inputPassword.type === "password" ? "text" : "password" }} > show</button>
                </div>
                <button className="login-page__btn-login ---- p-4 cursor-pointer  hover:text-golden-1 active:bg-gray-800 " type="button" onClick={submintFormLogin} >เข้าสู่ระบบ</button>
            </form >
        </div >
    )

};

import { useState } from "react";
import { Box } from "../../pages/admin/car.page/components";

export default function InputPassword({ value, onChange, className, ...props }) {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const onToggleShowPassword = () => { setIsShowPassword(!isShowPassword) }
    return (
        <Box variant={"row"} className={`${className} relative`} {...props}>
            <input className="text-gray-400" type={isShowPassword ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Password" />
            <Box className={"absolute items-center justify-center w-10  top-0 h-full right-0"}>
                <i className={`fa-solid ${!isShowPassword ? "fa-eye-slash text-gray-800" : "fa-eye text-gray-200"} hover:text-gray-500 active:scale-90 duration-100 text-xl hover:cursor-pointer  `} onClick={onToggleShowPassword}></i>
            </Box>
        </Box>
    )

};

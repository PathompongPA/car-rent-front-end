import { Box, Btn, Modal, Title } from "../../car.page/components";
import { useCustomerCreate } from "../hooks";

function InputText({ children, className, value, onChange, pattern }) {
    return (
        <Box className={`items-center grid grid-cols-12 ${className}`}>
            <Title variant="third" className={" col-span-3 md:col-span-1 text-lg"}>{children}</Title>
            <input className=" col-span-8 md:col-span-11" type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={pattern} />
        </Box>
    )
}

function InputDocument({ children, image, onChange = () => { }, ...props }) {
    return (
        <div className=" relative aspect-square h-[200px] overflow-hidden *:h-full *:w-full rounded-lg " {...props} >
            {image && <img className="absolute object-contain" src={URL.createObjectURL(image)} />}
            <label className=" absolute  bg-gray-800/50 top-0 flex justify-center items-center hover:cursor-pointer hover:bg-gray-700/50 duration-200 " htmlFor={children}>{children}</label>
            <input id={children} type="file" onChange={(e) => onChange(e.target.files[0])} hidden />
        </div>
    )
}

export default function CustomerCreate({ customerCreate, customerEvent, name, lastName, phone, idCard, driverLicense, facebook }) {
    const { Customer } = useCustomerCreate();
    return (
        <Modal onClose={customerEvent.create.close} className={` transition-all duration-5000 ease-out ${customerCreate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} `} >
            <Title>เพิ่มลูกค้า</Title>
            <Box variant={"col"}>
                <Title variant={"secondary"}> ข้อมูลทั่วไป</Title>
                <Box variant={"col"} className={"px-4"}>
                    <InputText value={name} onChange={customerEvent.create.info.name} pattern={"กรอกชื่อ"} >ชื่อ</InputText>
                    <InputText value={lastName} onChange={customerEvent.create.info.lastName} pattern={"กรอกนามสกุุล"} >นามสกุล</InputText>
                    <InputText value={phone} onChange={customerEvent.create.info.phone} pattern={"xxx-xxx-xxxx"} >เบอร์โทร</InputText>
                </Box>
            </Box>
            <Box variant={"col"}>
                <Title variant={"secondary"}>เอกสาร</Title>
                <Box variant={"row"} className={"justify-center px-4"}>
                    <InputDocument onChange={customerEvent.create.document.idCard} image={idCard}>บัตรประชาชน</InputDocument>
                    <InputDocument onChange={customerEvent.create.document.driverLicense} image={driverLicense}>ใบขับขี่</InputDocument>
                    <InputDocument onChange={customerEvent.create.document.facebook} image={facebook}>โปรไฟล์เฟสบุ๊ค</InputDocument>
                </Box>
            </Box>
            <Box variant={"row"} className={" mt-4 w-full items-center justify-center"}>
                <Btn onClick={customerEvent.create.save}>บันทึก</Btn>
                <Btn onClick={customerEvent.create.close} >ยกเลิก</Btn>
            </Box>
        </Modal>
    )

};

import { useState } from "react"
import { Box, Btn, Modal, Title } from "../../car.page/components"

function BtnCloseModal({ onClick, ...props }) {
    return (
        <Btn onClick={onClick} variant={"ghost"} className={"top-2 right-2"} {...props}>
            <Title variant={"secondary"}  >
                <i className="fa-solid fa-xmark"></i>
            </Title>
        </Btn>
    )
}

function ImageDisplay({ image, ...props }) {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const toggleFullScreen = () => setIsFullScreen(!isFullScreen)
    return (
        <Box className={"aspect-square rounded-lg max-h-[150px] overflow-hidden"}>
            <img className=" brightness-70 duration-300 hover:brightness-100  object-cover bg-gray-800/50 hover:cursor-pointer" src={image} {...props} onClick={toggleFullScreen} />
            {isFullScreen &&
                <Box className={"fixed w-full h-full top-0 left-0 bg-black/80 z-[60] flex justify-center items-center "} onClick={toggleFullScreen} >
                    <BtnCloseModal onClick={toggleFullScreen} />
                    <img className="object-cover bg-gray-800/50 hover:cursor-pointer" src={image} {...props} />
                </Box>}
        </Box>
    )
}

export default function CustomerDetail({ customerDetail, customerEvent }) {
    return (
        <Modal onClose={customerEvent.detail.close}>
            <Title>รายละเอียด</Title>
            <Box className={"flex flex-wrap flex-row justify-between gap-4"}>
                <Box className={"gap-4"}>
                    <Title variant={"third"}>คุณ</Title>
                    <Title variant={"third"}> {customerDetail.customerName} </Title>
                    <Title variant={"third"}> {customerDetail.customerLastName}</Title>
                </Box>
                <Box>
                    <Title variant={"third"} >เบอร์ติดต่อ </Title>
                    <Title variant={"third"}> {customerDetail.customerPhone}</Title>
                </Box>
            </Box>

            <Box className={""}>
                <ImageDisplay image={customerDetail?.customerIdCard} />
                <ImageDisplay image={customerDetail?.customerDriverLicense} />
                <ImageDisplay image={customerDetail?.customerFacebook} />
            </Box>

            <Box variant={"row"} className={"justify-center"}>
                <Btn onClick={customerEvent.edit.open}>แก้ไข</Btn>
                <Btn onClick={customerEvent.detail.close}>ปิด</Btn>
            </Box>
        </Modal>
    )
};

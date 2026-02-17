import { Box, Btn, Modal, Title } from "../../car.page/components"
import { InputText } from "../../../../components/inputs"
import { useEffect, useState } from "react"
import { fetchApi } from "../../../../utility"
import { useRevalidator } from "react-router"
import { Alert } from "../../../../components/alert"

function InputDocument({ children, image, onChange = () => { }, ...props }) {
    return (
        <div className=" relative aspect-square min-h-[200px]  overflow-hidden " {...props} >
            <img className="absolute h-full w-full object-contain" src={typeof image === "string" ? image : URL.createObjectURL(image)} />
            <label className=" absolute  bg-gray-800/50 top-0 w-full h-full flex justify-center items-center hover:cursor-pointer hover:bg-gray-700/50 duration-200 " htmlFor={children}>{children}</label>
            <input id={children} type="file" onChange={(e) => onChange(e.target.files[0])} hidden />
        </div>
    )
}

function useCustomerEdit(_customer) {
    const [customer, setCustomer] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)
    useEffect(() => { setCustomer(_customer) }, [_customer])
    let revalidator = useRevalidator()

    let event = {
        clear: {
            msgAlert: () => setMsgAlert(null),
            customer: () => setCustomer(null)
        },
        save: async () => {
            let body = new FormData();
            console.log("customer before send api : ", customer);
            body.append("id", customer.id)
            body.append("customerName", customer.customerName)
            body.append("customerLastName", customer.customerLastName)
            body.append("customerPhone", customer.customerPhone)

            body.append("customerIdCard", customer.customerIdCard)
            body.append("customerDriverLicense", customer.customerDriverLicense)
            body.append("customerFacebook", customer.customerFacebook)
            const { isSuccess, msg, data } = await fetchApi("PUT", `/api/customer/`, body, {})
            isSuccess ? revalidator.revalidate() & event.clear.customer() : setMsgAlert(msg)
            console.log(isSuccess, msg, data);
        },
        change: {
            idCard: (image) =>
                setCustomer((state) => {
                    let newState = { ...state }
                    newState.customerIdCard = image
                    return newState
                }),
            driverLicense: (image) =>
                setCustomer((state) => {
                    let newState = { ...state }
                    newState.customerDriverLicense = image
                    return newState
                }),
            facebook: (image) =>
                setCustomer((state) => {
                    let newState = { ...state }
                    newState.customerFacebook = image
                    return newState
                }),
        }
    }
    return { customer, event, msgAlert }
}

export default function CustomerEdit({ customerEdit, customerEvent }) {
    const { customer, msgAlert, event } = useCustomerEdit(customerEdit);
    return (customer &&
        <Modal onClose={customerEvent.edit.close}>
            <Box className={"gap-8"} variant={"col"}>
                <Title>แก้ไขข้อมูลลูกค้า</Title>
                <Box variant={"col"}>
                    <Title variant={"third"}>ข้อมูลทั่วไป</Title>
                    <InputText value={customerEdit?.customerName} onChange={customerEvent.edit.changeName} >ชื่อ</InputText>
                    <InputText value={customerEdit?.customerLastName} onChange={customerEvent.edit.changeLastName} >นามสกุล</InputText>
                    <InputText value={customerEdit?.customerPhone} onChange={customerEvent.edit.changePhone} type="tel" >เบอร์โทร</InputText>
                </Box>

                <Box variant={"col"} >
                    <Title variant={"third"}>เอกสาร</Title>
                    <Box variant={"row"} >
                        <InputDocument image={customer?.customerIdCard} onChange={event.change.idCard} >บัตรประชาชน</InputDocument>
                        <InputDocument image={customer?.customerDriverLicense} onChange={event.change.driverLicense} >ใบขับขี้</InputDocument>
                        <InputDocument image={customer?.customerFacebook} onChange={event.change.facebook} >facebook</InputDocument>
                    </Box>
                </Box>

                <Box variant={"row"} className={"justify-center"} >
                    <Btn onClick={event.save}>บันทึก</Btn>
                    <Btn onClick={event.clear.customer}>ยกเลิก</Btn>
                </Box>
            </Box>
            {msgAlert && <Alert onClose={event.clear.msgAlert}>{msgAlert}</Alert>}
        </Modal>
    )
};

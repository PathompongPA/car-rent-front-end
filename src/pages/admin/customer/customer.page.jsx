import { useLoaderData, useRevalidator } from "react-router";
import { Box, Btn, Loading, Modal, Title } from "../car.page/components";
import { InputSearch, InputText } from "../../../components/inputs";
import { useEffect, useState } from "react";
import { fetchApi } from "../../../utility";
import { Document, Page, Image, StyleSheet, Text, View, Font } from "@react-pdf/renderer";
import Papa from "papaparse";
import Alert from "../../../components/alert/alert.component";
import CustomerList from "./components/customer.list";
import CustomerCreate from "./components/customer.create";
import CustomerDetail from "./components/customer.detail";
import CustomerPdf from "./components/customer.pdf";
import CustomerEdit from "./components/customer.edit";
import { CustomerToolBar } from "./components";

const formatPhone = (value) => {
    const arr = value.replace(/\D/g, "").slice(0, 10).split("")
    if (arr.length > 3) arr.splice(3, 0, "-")
    if (arr.length > 8) arr.splice(8, 0, "-")
    return arr.join("")
}


function downloadCSV(data, fileName = "ข้อมูลลูกค้า.csv") {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
}

function ImageEditer({ image, ...props }) {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const toggleFullScreen = () => setIsFullScreen(!isFullScreen)
    return (
        <Box>
            <img className=" brightness-70 duration-300 hover:brightness-100 aspect-square rounded-lg h-[150px] object-cover bg-gray-800/50 hover:cursor-pointer" src={image} {...props} onClick={toggleFullScreen} />
            {isFullScreen &&
                <Box className={"fixed w-full h-full top-0 left-0 bg-black/80 z-[60] flex justify-center items-center "} onClick={toggleFullScreen} >
                    <BtnCloseModal onClick={toggleFullScreen} />
                    <img className="object-cover bg-gray-800/50 hover:cursor-pointer" src={image} {...props} />
                </Box>}
        </Box>
    )
}


function BtnCloseModal({ onClick, ...props }) {
    return (
        <Btn onClick={onClick} variant={"ghost"} className={"top-2 right-2"} {...props}>
            <Title variant={"secondary"}  >
                <i className="fa-solid fa-xmark"></i>
            </Title>
        </Btn>
    )
}
export default function CustomerPage() {
    const { Customer } = useLoaderData();
    const revalidator = useRevalidator()

    const [customer, setCustomer] = useState(null)

    const [filter, setFilter] = useState(null)

    const [customerCreate, setCreateCustomer] = useState(null)
    const [customerDetail, setCustomerDetail] = useState(null)
    const [customerEdit, setCustomerEdit] = useState(null)
    const [customerPdf, setCustomerPdf] = useState(null)

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [idCard, setIdCard] = useState(null)
    const [driverLicense, setDriverLicense] = useState(null)
    const [facebook, setFacebook] = useState(null)

    const [msgAlert, setMsgAlert] = useState(null)

    useEffect(() => {
        setCustomer(Customer?.data?.filter(({ customerName, customerLastName, customerPhone }) => {
            if (!filter) return true;
            let lowerFilter = filter.toLowerCase()
            return customerName.toLowerCase().includes(lowerFilter) || customerLastName.toLowerCase().includes(lowerFilter) || customerPhone.toLowerCase().includes(lowerFilter)
        }))
    }, [Customer?.data, filter])

    let sendAlert = (msg) => setMsgAlert(msg)
    let closeAlert = () => setMsgAlert(null)
    let customerEvent = {
        filter: {
            change: (value) => setFilter(value)
        },
        pdf: {
            open: (position) => setCustomerPdf(Customer?.data[position]),
            close: () => setCustomerPdf(null),
        },
        detail: {
            open: (position) => setCustomerDetail(Customer?.data[position]),
            close: () => setCustomerDetail(null),
            changeName: (newName) =>
                setCustomerDetail((state) => {
                    let newState = { ...state }
                    newState.customerName = newName
                    return newState
                }),
            changeLastName: (newLastName) =>
                setCustomerDetail((state) => {
                    let newState = { ...state }
                    newState.customerLastName = newLastName
                    return newState
                }),
            changePhone: (newPhone) =>
                setCustomerDetail((state) => {
                    let newState = { ...state }
                    newState.customerPhone = newPhone
                    return newState
                }),
        },
        edit: {
            open: () => {
                setCustomerEdit(customerDetail);
                setCustomerDetail(null)
            },
            close: () => setCustomerEdit(null),
            changeName: (newName) =>
                setCustomerEdit((state) => {
                    let newState = { ...state }
                    newState.customerName = newName
                    return newState
                }),
            changeLastName: (newLastName) =>
                setCustomerEdit((state) => {
                    let newState = { ...state }
                    newState.customerLastName = newLastName
                    return newState
                }),
            changePhone: (newPhone) =>
                setCustomerEdit((state) => {
                    let newState = { ...state }
                    newState.customerPhone = newPhone
                    return newState
                }),
            save: async () => {
                let body = new FormData();
                body.append("id", customerEdit.id)
                body.append("customerName", customerEdit.customerName)
                body.append("customerLastName", customerEdit.customerLastName)
                body.append("customerPhone", customerEdit.customerPhone)
                const { isSuccess, msg, data } = await fetchApi("PUT", "/api/customer", body, {})
                isSuccess ? sendAlert("แก้ไขลูกค้าสำเร็จ") & revalidator.revalidate() & customerEvent.edit.close() : sendAlert(msg)
                console.log(isSuccess, msg, data);
            }
        },
        create: {
            clearState: () => { setName(""); setLastName(""); setPhone(""); setIdCard(null); setDriverLicense(null); setFacebook(null); },
            save: async () => {
                let body = new FormData();
                body.append("customerName", name)
                body.append("customerLastName", lastName)
                body.append("customerPhone", phone)
                body.append("customerIdCard", idCard)
                body.append("customerDriverLicense", driverLicense)
                body.append("customerFacebook", facebook)
                const { isSuccess, msg, data } = await fetchApi("POST", "/api/customer", body, {})
                isSuccess ? sendAlert("เพิ่มลูกค้าสำเร็จ") & revalidator.revalidate() & customerEvent.create.clearState() & customerEvent.create.close() : sendAlert(msg)
                console.log(isSuccess, msg, data);
            },
            open: () => setCreateCustomer(true),
            close: () => {
                setCreateCustomer(false)
                setIdCard(null)
                setDriverLicense(null)
                setFacebook(null)
            },
            info: {
                name: (value) => { setName(value) },
                lastName: (value) => { setLastName(value) },
                phone: (value) => { setPhone(value) }
            },
            document: {
                idCard: (file) => { setIdCard(file) },
                driverLicense: (file) => { setDriverLicense(file) },
                facebook: (file) => { setFacebook(file) }
            }
        }
    }

    return (
        <Box className="customer-page mt-18 w-[1070px] h-full gap-8 p-4" variant={"col"}>
            <CustomerToolBar onClickCreateBtn={customerEvent.create.open} onDownLoadCsv={() => downloadCSV(Customer?.data, `${Date.now().toString()}_ข้อมูลลูกค้า.csv`)} onFilterChange={customerEvent.filter.change} />
            {/* <Loading isLoading={true} /> */}
            {customer && <CustomerList customer={customer} customerEvent={customerEvent} formatPhone={formatPhone} />}
            {customerCreate && <CustomerCreate customerCreate={customerCreate} customerEvent={customerEvent} name={name} lastName={lastName} phone={phone} idCard={idCard} driverLicense={driverLicense} facebook={facebook} />}
            {customerDetail && <CustomerDetail customerDetail={customerDetail} customerEvent={customerEvent} />}
            {customerEdit && <CustomerEdit customerEdit={customerEdit} customerEvent={customerEvent} />}
            {customerPdf && <CustomerPdf customerPdf={customerPdf} customerEvent={customerEvent} />}
            {msgAlert && <Alert onClose={closeAlert} >{msgAlert}</Alert>}
        </Box >
    )
}

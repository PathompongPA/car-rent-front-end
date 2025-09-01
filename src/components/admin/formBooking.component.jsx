import { useLoaderData } from "react-router";
import CalendarAdmin from "./calendar.admin.component";
import { fetchApi } from "../../utility";
import { useEffect, useState } from "react";

export default function FormBooking() {
    let { Car, Customer } = useLoaderData()
    const [carTarget, setCarTarget] = useState(undefined)
    const [customerTarget, setCustomerTarget] = useState(undefined)
    const [customerState, setCustomerState] = useState(undefined)
    const [slipe, setSlipe] = useState(undefined)
    const [step, setStep] = useState(1)
    const [booking, setbooking] = useState(undefined)
    const [newCustomer, setNewCustomer] = useState(undefined)

    useEffect(() => {
        setCustomerState(Customer)
    }, [Customer, step])


    function formChange() {
        let form = new FormData(document.getElementsByClassName("form-booking")[0])
        let target = Car.data.filter((res) => res.id === form.get("carId"))[0]
        setCarTarget(target)
    }

    function filterCustomer(e) {
        const searchValue = e.target.value.toLowerCase();
        const filtered = Customer.data.filter((customer) => customer.customerName.includes(searchValue));
        setCustomerState({ ...Customer, data: filtered });
    }

    function fileChage(e) {
        let img = e.target.files.length !== 0 ? URL.createObjectURL(e.target.files[0]) : undefined
        e.target.parentElement.children[2].src = img
    }

    async function submitForm(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        const { isSuccess, msg } = await fetchApi("POST", "/api/booking", form, {})
        !isSuccess && alert(msg)
        isSuccess && (() => { alert("บันทึกสำเร็จ"); location.reload(true) })()
    }

    function togglePopUp() {

        let isHaveSlip = slipe !== undefined
        if (isHaveSlip) {
            document.getElementsByClassName("form-booking__sumary-popup")[0].classList.toggle("hidden")
        } else {
            alert(`กรุณา\n\tเลือกหลักฐานการชำระเงิน`)
        }
    }
    function handleNextStep() {
        let form = new FormData(document.getElementsByClassName("form-booking")[0])

        let carId = form.get("carId")
        let checkIn = form.get("checkInDate")
        let checkOut = form.get("checkOutDate")
        let isHaveCarId = carId !== null
        let isHaveCheckIn = checkIn.length > 0
        let isHaveCheckOut = checkOut.length > 0
        let isFirstStepComplet = isHaveCarId & isHaveCheckIn & isHaveCheckOut

        let customerId = form.get("customerId")
        let customerName = form.get("customerName")
        let customerLastName = form.get("customerLastName")
        let customerPhone = form.get("customerPhone")
        let customerIdCard = form.get("customerIdCard")
        let customerDriverLicense = form.get("customerDriverLicense")
        let customerFacebook = form.get("customerFacebook")
        let newCustomer = { id: customerId, customerName, customerLastName, customerIdCard, customerDriverLicense, customerFacebook, customerPhone }
        let isHaveCustomerId = customerId.length > 0
        let isHaveName = customerName.length > 0
        let isHaveLastName = customerLastName.length > 0
        let isHaveIdCard = customerIdCard.name !== ""
        let isHaveDriverLicense = customerDriverLicense.name !== ""
        let isHaveFacebook = customerFacebook.name !== ""
        let isOldCustomer = customerTarget !== undefined
        let isSecondStepComplet = !isHaveCustomerId & isHaveName & isHaveLastName & isHaveIdCard & isHaveDriverLicense & isHaveFacebook

        switch (step) {
            case 1:
                if (isFirstStepComplet) {
                    setbooking({ checkInDate: checkIn, checkOutDate: checkOut })
                    setStep(step => step <= 2 ? step + 1 : step)
                } else {
                    alert(`กรุณาเลือก ${!isHaveCarId ? "\n\tรถ" : ""} ${!isHaveCheckIn ? "\n\tวันรับรถ" : ""} ${!isHaveCheckOut ? "\n\tวันคืนรถ" : ""}`)
                }
                break;
            case 2:
                if (isSecondStepComplet | isOldCustomer) {
                    setStep(step => step <= 2 ? step + 1 : step)
                    setNewCustomer(newCustomer)
                } else {
                    alert(`กรุณาเลือก \n\tลูกค้าเดิม หรือ \n\tกรอกข้อมูลลูกค้าใหม่`)
                }
        }
    }

    return (
        <form className={`form-booking *** w-full h-fit  rounded-lg border-white p-4 pt-20 max-w-7xl `} onChange={formChange} onSubmit={submitForm}>
            <h1 className="hidden md:flex md:pl-4 row-span-10 text-description-1 md:text-title-3 font-bold justify-center items-center p-2 " >ระบบ จองรถ</h1>

            <div className="status-bar md:row-span-5 hidden md:flex pl-4  justify-center items-center gap-[10vw] md:text-description-3 font-bold ">
                <div className={`${step !== 1 && "hidden md:text-gray-500 md:text-base  md:block "}`}>ชั้นตอนที่ 1 : เลือกรถและวันที่</div>
                <div className={`${step !== 2 && "hidden md:text-gray-500 md:text-base md:block "}`}>ชั้นตอนที่ 2 : กรอกข้อมูลลูกค้า</div>
                <div className={`${step !== 3 && "hidden md:text-gray-500 md:text-base md:block"}`}>ชั้นตอนที่ 3 : แนบหลักฐาน</div>
            </div>

            <div className={`md:row-span-80  md:overflow-hidden ${step !== 1 && "hidden md:hidden"} gap-4   *:rounded-lg  *:overflow-hidden md:flex md:justify-center items-center `}>
                <div className="flex flex-col md:grid md:grid-cols-2  border-red-600 *:flex-1/2  md:max-w-[7xl] ">
                    <div className="md:flex md:flex-col md:gap-4 md:px-2  md:p-0  ">
                        <span className=" w-full flex py-2  items-center text-description-3 md:text-description-2 md:w-full md:p-2 md:py-4 ">เลือกรุ่นรถ</span>
                        <select className={`form-booking__selector-car *** md:text-lg border border-gray-800  p-2  w-full bg-gray-900 rounded-lg`} name="carId" defaultValue={""}  >
                            <option value={""} disabled>รุ่นรถ</option>
                            {Car.data.map(({ id, carName, brand }) => <option value={id} key={id}>{`${brand.brandName} - ${carName}`}</option>)}
                        </select>
                        <div className=" hidden relative w-full aspect-video md:pt-8  *:absolute *:bg-gray-800 *:rounded-lg md:flex justify-center items-center ">
                            <img className=" aspect-video  object-cover z-10 " src={carTarget?.carThumbnail || undefined} />
                            <span className="w-full h-full flex justify-center items-center  ">ยังไม่ได้เลือกรถ</span>
                        </div>
                    </div>

                    <div className="">
                        <div className=" hidden md:flex text-description-2 w-full md:p-6" htmlFor="">เลือกวันที่</div>
                        <CalendarAdmin bookings={carTarget?.bookedDates} />
                    </div>
                </div>
            </div>

            <div className={`flex  flex-col w-full md:grid md:grid-cols-2  p-2 gap-1 md:gap-4 *:rounded-lg ${step !== 2 && "md:hidden hidden"} scrollbar-none  `}>

                <div className="flex flex-col gap-2 md:overflow-hidden md:p-4 h-full  ">
                    <div className="w-full  text-description-2"> รายชื่อลูกค้า</div>
                    <div className="flex flex-col  bg-gray-900 gap-1 md:gap-4 h-full ">
                        <div className="grid grid-cols-12 gap-1 md:gap-2 *:rounded-lg  *:md:p-2  bg-gray-900 rounded-lg">
                            <input className="col-span-9 border border-gray-800 " type="text" placeholder="ค้นหาลูกค้าด้วย ..." onChange={filterCustomer} />
                            <button className="col-span-3 border border-gray-800 " type="button">ค้นหา</button>
                        </div>
                        <div className="flex flex-col h-[40vh] md:h-[55vh] md:overflow-hidden border-gray-800 p-2  gap-2 rounded-lg border overflow-x-scroll *:w-[120vw]  *:md:w-full ">
                            <div className="grid grid-cols-7 *:not-first:col-span-2 *:text-center border-gray-800 rounded-lg w-[150vw] ">
                                <span className=""></span>
                                <span>ชื่อ</span>
                                <span>นามสกุล</span>
                                <span>เบอร์ติดต่อ</span>
                            </div>
                            <div className="h-full overflow-y-auto gap-2 *:not-even:bg-gray-800">
                                {customerState?.data.map((res) => {
                                    const { id, customerName, customerLastName, customerPhone } = res;
                                    return (
                                        <div className=" hover:bg-gray-700 rounded-lg grid grid-cols-7 *:not-first:col-span-2 p-2 items-center *:text-center " key={id} >
                                            <button className="p-1 rounded-lg cursor-pointer hover:text-golden-1 bg-lime-800 " type="button" onClick={() => { setCustomerTarget(res) }}>เลือก</button>
                                            <div className="">{`${customerName}`}</div>
                                            <div className="">{customerLastName}</div>
                                            <div className="">{`${customerPhone}`}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex flex-col p-4 mt-8 gap-2 overflow-hidden border-gray-800 ">
                    <div className="  text-description-2">เพิ่มข้อมูลูกค้าใหม่</div>
                    <div className=" grid md:grid-cols-12 *:not-first:not-[button]:col-span-4 *:border-gray-800 *:border  gap-2 *:rounded-lg  *:p-2 *:flex *:flex-col *:justify-center *:gap-2 ">
                        <input type="text" name="customerId" id="" hidden defaultValue={customerTarget?.id} />
                        <div className="*:p-2 *:rounded-lg">
                            <label className="text-description-3" htmlFor="">ชื่อ</label>
                            <input className="bg-gray-900 w-full border border-gray-800" type="text" name="customerName" placeholder="ชื่อลูกค้า" defaultValue={customerTarget ? customerTarget.customerName : ""} />
                        </div>
                        <div className="*:p-2 *:rounded-lg">
                            <label className="text-description-3" htmlFor="">นามสกุล</label>
                            <input className="bg-gray-900 w-full border border-gray-800" type="text" name="customerLastName" placeholder="นามสกุล" defaultValue={customerTarget ? customerTarget.customerLastName : ""} />
                        </div>
                        <div className="*:p-2 *:rounded-lg">
                            <label className="text-description-3" htmlFor="">เบอร์ติดต่อ</label>
                            <input className="bg-gray-900 w-full border border-gray-800" type="text" name="customerPhone" placeholder="เบอร์ติดต่อ" defaultValue={customerTarget ? customerTarget.customerPhone : ""} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 overflow-y-scroll md:h-[40vh]  snap-y *:snap-center snap-mandatory *:flex *:items-center *:justify-center *:relative ">
                        <div className="">
                            <label className=" absolute top-0 left-0 z-10 bg-gray-900/80 cursor-pointer  border border-gray-800 w-full h-full flex justify-center items-center " htmlFor="input-id-card">{`คลิกเพื่อแก้ไขรูป \n รูปบัตรประชาชน`}</label>
                            <input id="input-id-card" name="customerIdCard" type="file" hidden onChange={fileChage} />
                            <img className="form-booking__img-id-card *** w-full aspect-16/9 border-gray-800 rounded-lg object-cover" src={customerTarget?.customerIdCard} alt="" />
                        </div>
                        <div className="">
                            <label className=" absolute top-0 left-0 z-10 bg-gray-900/80 cursor-pointer  border border-gray-800 w-full h-full flex justify-center items-center " htmlFor="input-driver-license">{`คลิกเพื่อแก้ไขรูป \n รูปใบขับขี่`}</label>
                            <input id="input-driver-license" name="customerDriverLicense" type="file" hidden onChange={fileChage} />
                            <img className="form-booking__img-id-card *** w-full aspect-16/9 border-gray-800  rounded-lg object-cover" src={customerTarget?.customerDriverLicense} alt="" />
                        </div>
                        <div className="">
                            <label className=" absolute top-0 left-0 z-10 bg-gray-900/80 cursor-pointer  border border-gray-800 w-full h-full flex justify-center items-center" htmlFor="input-facebook"> {`คลิกเพื่อแก้ไขรูป \n รูปfacebook`}</label>
                            <input id="input-facebook" name="customerFacebook" type="file" hidden onChange={fileChage} />
                            <img className="form-booking__img-id-card *** w-full aspect-16/9 border-gray-800 rounded-lg object-cover" src={customerTarget?.customerFacebook} alt="" />
                        </div>
                    </div>
                    <div className="p-2">
                        <button className="col-span-2 w-full border border-gray-800  bg-gray-800/40 hover:bg-gray-800/60 row-span-1 rounded-lg p-2  cursor-pointer" type="button" onClick={() => { setCustomerTarget(undefined) }}>เคลีย</button>
                    </div>
                </div>

            </div>

            <div className={`row-span-80 pb-4 w-full ${step !== 3 && "hidden"} overflow-hidden`}>
                <div className="h-full flex flex-col justify-center ">
                    <div className="p-6 text-center text-description-2 ">
                        เลือกหลักฐานการโอนมัดจำ
                    </div>
                    <div className="h-[60vh]  flex justify-center aspect-16/9 relative ">
                        <img className="max-h-full  bg-gray-800" src={slipe} alt="" />
                        <label className="w-full h-full absolute flex justify-center items-center cursor-pointer z-10 bg-gray-900/70 " htmlFor="slip">คลิกเพื่อ เลือกหลักฐานการเงืน</label>
                        <input type="file" hidden name="slip" id="slip" onChange={(e) => { setSlipe(URL.createObjectURL(e.target.files[0])) }} />
                    </div>
                </div>
            </div>

            <div className={`form-booking__sumary-popup *** hidden fixed top-0  inset-0 bg-black/50 flex items-center justify-center z-50 `}>
                <div className=" rounded-xl w-[90vw] h-[90vh] p-6 md:w-full md:max-w-md shadow-xl bg-gray-800 gap-2 flex flex-col ">
                    <div className=" w-full text-center text-description-2">สรุป ข้อมูลการจอง</div>
                    <div className=" grid grid-cols-1 gap-2  *:not-[strong]:font-normal">
                        <div className=""><strong>รุ่นรถ : </strong> <span>{carTarget?.brand.brandName} {carTarget?.carName}</span></div>
                        <div className=""><strong>ลูกค้า : </strong>{`${customerTarget?.customerName || newCustomer?.customerName} ${customerTarget?.customerLastName || newCustomer?.customerLastName}`}</div>
                        <div className=""><strong>เบอร์ติดต่อ :</strong>{` ${customerTarget?.customerPhone || newCustomer?.customerPhone}`}</div>
                        <div className=""><strong>วันรับรถ : </strong><span>{`${booking?.checkInDate}`}</span></div>
                        <div className=""><strong>วันคืนรถ : </strong><span>{`${booking?.checkOutDate}`}</span></div>
                        <div className=" flex  gap-4">
                            <strong>หมายเหตุ : </strong>
                            <textarea className="border border-gray-900 " name="note" id="" placeholder="สามารถใส่เวลาหรือข้อจำกัดต่างๆ "></textarea>
                        </div>
                        {/* <div className=""><strong>รวม : </strong>{customerTarget?.customerPhone || newCustomer?.customerPhone} <strong> วัน</strong></div>
                        <div className=""><strong>ราคา: </strong>{customerTarget?.customerPhone || newCustomer?.customerPhone} <strong> วัน</strong></div> */}
                        <div className=""><strong>{`หลักฐานการโอน : `}</strong></div>
                    </div>
                    <div className=" flex justify-center ">
                        <img className=" h-[30vh] md:h-[45vh] object-cover " src={slipe} alt="" />
                    </div>
                    <div className=" flex  justify-center pt-4 gap-2 *:p-2 *:rounded-lg">
                        <button className="--btn col-span-1 " type="button" onClick={togglePopUp} >ยกเลิก</button>
                        <button className="--btn col-span-1 " type="sumbit" >บันทึก</button>
                    </div>
                </div>
            </div>

            <div className="row-span-10 flex justify-end  *:p-2 *:rounded-lg gap-4 *:border *:border-gray-800 *:w-fit *:h-fit">
                <button className={`--btn ${step === 1 && "hidden"} `} type="button" onClick={() => {
                    setStep(step => step > 1 ? step - 1 : step)
                }}>ย้อนกลับ</button>
                <button className={`--btn ${step === 3 && "hidden"}`} type="button" onClick={handleNextStep}>ถัดไป</button>
                <button className={`--btn ${step !== 3 && "hidden"} `} type="button" onClick={togglePopUp}>บันทึก</button>
            </div>

        </form >
    )

};
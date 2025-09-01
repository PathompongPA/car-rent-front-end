import { useState } from "react";
import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { fetchApi } from "../../utility";

export default function FormContent() {
    const [Content, setContent] = useState([])
    const [image, setImage] = useState([])

    let loaderData = useLoaderData().Content.data

    useEffect(() => {
        setContent(loaderData)
    }, [loaderData, image])


    async function save() {
        // document.getElementsByClassName("popup")[0].classList.toggle("hidden")
        let data = new FormData(document.getElementsByClassName("form-content")[0])
        data.append("data", JSON.stringify(Content))
        const { isSuccess, msg } = await fetchApi("POST", "/api/content", data, {});
        isSuccess ? alert("บันทึกสำเร็จ") : alert(msg)
        isSuccess && location.reload(true)
    }

    // console.log("content : ", Content)
    return (
        <form className="form-content *** flex flex-col gap-4 pb-20 w-full md:max-w-7xl">

            <button className=" z-40 bg-blue-700 fixed md:bottom-4 md:right-[100px]  bottom-4 right-4 border border-gray-800 p-4 rounded-lg hover:bg-gray-800 cursor-pointer active:bg-gray-900" type="button" onClick={save}>บันทึก</button>

            <div className=" text-title-3 font-bold bg-gray-900 ">
                <h1 className=" p-4 rounded-lg ">แก้ไขหน้าเว็บ</h1>
            </div>


            <div className="popup *** fixed w-full h-full bg-gray-950/30 top-0 z-50 left-0 text-black cursor-pointer flex justify-center hidden" onClick={(e) => { e.target.classList.toggle("hidden") }}>
                <div className=" bg-white absolute whitespace-pre-wrap  overflow-auto h-full"> {JSON.stringify(Content, null, 2)} </div>
            </div>

            <div className=" flex flex-col gap-1 md:border  border-gray-800  rounded-lg *:rounded-lg p-4">
                <h1 className="font-black text-description-1">แถบเมนูนำทาง</h1>
                <div className=" flex flex-col md:flex-row gap-4 md:border border-gray-800 rounded-lg p-4 ">
                    <label className="hidden md:block" htmlFor="">logo </label>
                    <div className=" relative flex items-center  justify-center ">
                        <label className=" absolute cursor-pointer w-[200px] hover:bg-gray-900/90 h-full border top-0 flex items-center justify-center bg-gray-800/50 " htmlFor="logo">คลิกเพื่อเปลี่ยนโลโก้</label>
                        <input type="file" name="logo" id="logo" hidden onChange={(e) => { document.getElementsByClassName("content-image-logo")[0].src = URL.createObjectURL(e.target.files[0]) }} accept="image/*" />
                        <img className="content-image-logo w-[200px] aspect-16/9 object-cover bg-gray-800" src={Content[5]?.value.image} alt={Content[5]?.value.image} />
                    </div>
                    <h4 className="text-gray-500">* โลโก้ ควรมีอัตราส่วนภาพ 16:9</h4>
                </div>
                {Content[6]?.value.map(({ text }, indexTitleNavbar) => {
                    return (
                        <div className=" flex flex-col md:flex-row gap-2 md:border border-gray-800 md:p-2" key={text + indexTitleNavbar}>
                            <label htmlFor="">{`เมนูนำทางที่ ${indexTitleNavbar + 1}`}</label>
                            <input type="text" name="" defaultValue={text} placeholder={`เมนูนำทางที่ ${indexTitleNavbar}`} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[6].value[indexTitleNavbar].text = e.target.value; return newState; }) }} />
                        </div>
                    )
                })}
            </div>

            <div className=" flex flex-col md:border border-gray-800 rounded-lg p-4 gap-4 ">
                <h1 className="font-bold text-description-1">view board</h1>

                <div className="flex flex-col md:flex-row gap-8 *:flex-1/2 h-[100vh] md:h-[400px] ">
                    <div className=" flex flex-col md:border  rounded-lg border-gray-800  relative p-4 pt-16 gap-4 ">
                        <div className="">
                            <h1 className=" absolute top-4 left-4 text-description-3 ">เพิ่ม</h1>
                            <div className=" absolute w-[200px] top-4 right-4 text-sm text-gray-500 ">* รูปควรมีขนาดมากกว่า 1280*720 และมีอัตราส่วน 16:9 </div>
                        </div>
                        <label className=" flex-1/5 border cursor-pointer border-gray-800 rounded-lg h-full flex justify-center items-center " htmlFor="view-board-image" >คลิกเพื่อเพิ่มรูป</label>
                        <input type="file" name="viewBoard" id="view-board-image" hidden onChange={(e) => { setImage(e.target.files) }} multiple accept="image/*" />
                        <div className="flex md:flex-col border border-gray-800 h-full  overflow-auto p-4 gap-4 ">
                            {Array.from(image).map((item, indexImageViewBoard) => {
                                return (<img className="object-cover  aspect-16/9" src={URL.createObjectURL(item)} key={item + indexImageViewBoard} />)
                            })}
                        </div>
                        <button className="border p-1 rounded-lg border-gray-800 bg-gray-800 cursor-pointer active:bg-gray-900 hover:text-golden-1" type="button" onClick={save}>ส่งรูป</button>
                    </div>

                    <div className=" overflow-x-hidden relative flex items-center  h-full">
                        <label className=" absolute w-full h-full flex justify-center items-center " htmlFor="">รูปทั้งหมด</label>
                        {/* <h1 className=" absolute top-4 left-4 text-description-3 z-20">ทั้งหมด</h1> */}
                        <div className={`absolute w-full justify-between *:p-2 *:px-4 *:rounded-full p-2 *:cursor-pointer *:hover:text-golden-1 *:bg-gray-700 *:active:bg-gray-700/40 z-20 ${Content[9]?.value.length === 0 ? "hidden" : "flex"} `}>
                            <button type="button" onClick={() => { document.getElementsByClassName("container-image-view-board")[0].scrollLeft -= 500 }}>{`<`}</button>
                            <button type="button" onClick={() => { document.getElementsByClassName("container-image-view-board")[0].scrollLeft += 500 }}>{`>`}</button>
                        </div>
                        <div className=" container-image-view-board h-full flex p-4 overflow-auto  gap-4 snap-x snap-mandatory"  >
                            {Content[9]?.value.map((item, indexImage) =>
                                <div className="aspect-21/9 w-full bg-gray-900 relative snap-center " key={indexImage + item}>
                                    <img className=" w-full h-full   object-cover snap-center bg-gray-800  " src={item} alt={item} key={item + indexImage} />
                                    <button className="px-2 rounded-full  bg-red-800 absolute right-1 top-1 cursor-pointer hover:text-golden-1 hover:bg-red-900" type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[9].value.splice(indexImage, 1); return newState }) }} >ลบ</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-4 md:border p-4 rounded-lg border-gray-800">
                <h1 className="text-description-1 font-bold">ขั้นตอนการจอง</h1>
                <div className="md:border md:p-4 flex flex-col md:flex-row gap-2 border-gray-800 rounded-lg">
                    <label className="" htmlFor="">หัวข้อ</label>
                    <input className="" type="text" name="" defaultValue={Content[4]?.value.text} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[4].value.text = e.target.value; return newState }) }} />
                </div>
                <div className="flex flex-col md:gap-4 gap-4">
                    {Content[3]?.value.map(({ title, detail }, indexCard) => {
                        return (
                            <div className="flex flex-col md:gap-4 md:p-4 justify-start md:border border-gray-800 rounded-lg" key={title + indexCard}>
                                <div className=" flex justify-between items-center">
                                    <div className="flex md:flex-row gap-2 md:items-center">
                                        <label className="" htmlFor="">หัวข้อขั้นตอนที่ {indexCard + 1}</label>
                                        <input className="w-[150px]" type="text" name="" defaultValue={title} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[3].value[indexCard].title = e.target.value; return newState }) }} />
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-4">
                                    {detail?.map((item, indexDetail) => {
                                        return (
                                            <div className=" flex md:gap-4  gap-2 md:flex-row" key={item + indexDetail}>
                                                <label htmlFor="">รายละเอียด {indexDetail + 1}</label>
                                                <input className="w-[150px]" type="text" name="" defaultValue={item} key={item + indexDetail} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[3].value[indexCard].detail[indexDetail] = e.target.value; return newState; }) }} />
                                                <button className=" px-2 md:p-2 bg-red-800 cursor-pointer hover:text-golden-1 rounded-lg" type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[3]?.value[indexCard].detail.splice(indexDetail, 1); return newState }) }}>ลบ</button>
                                            </div>)
                                    })}
                                    <button className=" cursor-pointer hover:text-golden-1  bg-gray-800 p-2 rounded-lg" type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[3].value[indexCard].detail.length < 7 ? newState[3].value[indexCard].detail.push("") : alert("ไม่สามารถเพิ่มรายละเอียดได้อีก"); return newState; }) }}>เพิ่มรายละเอียด</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-col  gap-4 *:not-first:border *:not-first:rounded-lg *:not-first:border-gray-800 border rounded-lg border-gray-800 p-4">
                <h1 className="text-description-1 font-bold ">ช่องทางการติดต่อ</h1>
                <div className="border border-gray-800 p-4 flex gap-2">
                    <label htmlFor="">หัวข้อ</label>
                    <input className="" type="text" name="" defaultValue={Content[1]?.value[0]?.text} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[1].value[0].text = e.target.value; return newState }) }} />
                </div>
                {Content[0]?.value?.map(({ list, title }, indexCard) =>
                    <div className=" flex flex-col md:gap-4 md:p-4 justify-start " key={title + indexCard}>
                        <div className=" flex justify-between">
                            <div className="flex  gap-2 items-center ">
                                <label htmlFor="">ช่องทางที่ {indexCard + 1}</label>
                                <input type="text" name="" defaultValue={title} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[0].value[indexCard].title = e.target.value; return newState }) }} />
                            </div>
                            <button className="text-end bg-red-800 p-2 rounded-lg cursor-pointer hover:text-golden-1 hover:bg-red-900" type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[0].value.splice(indexCard, 1); return newState }) }}>X</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {list?.map(({ title, link }, indexSubCard) =>
                                <div className=" flex flex-col md:flex-row gap-2 md:items-center *:not-[label,button]:flex-1/2" key={title + indexSubCard}>
                                    <div className="">
                                        <label htmlFor="">ชื่อ</label>
                                        <input type="text" name="" defaultValue={title} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[0].value[indexCard].list[indexSubCard].title = e.target.value; return newState }) }} />
                                    </div>
                                    <label htmlFor="">link</label>
                                    <input type="text" name="" defaultValue={link} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[0].value[indexCard].list[indexSubCard].link = e.target.value; return newState }) }} />
                                    <button className="rounded-lg  bg-red-800 cursor-pointer hover:text-golden-1   p-2" type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[0].value[indexCard].list?.splice(indexSubCard, 1); return newState }) }}>ลบ</button>
                                </div>
                            )}</div>
                        <button className="rounded-lg p-1 bg-gray-800 cursor-pointer hover:text-golden-1 hover:bg-gray-700 active:bg-gray-800 " type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[0].value[indexCard].list.push({ link: "", title: "" }); return newState }) }} >เพิ่ม</button>
                    </div>
                )}
                <button className="rounded-lg p-1 bg-gray-800 cursor-pointer hover:text-golden-1 hover:bg-gray-700 active:bg-gray-800 " type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[0].value.push({ list: [{ link: "", title: "" }], title: "" }); return newState }) }
                }>เพิ่มช่องทางการติดต่อ</button>
            </div>

            <div className="border flex flex-col gap-4 p-4 rounded-lg border-gray-800">
                <h1 className="font-bold text-description-1">Q & A</h1>
                <div className=" flex border p-2 gap-4 border-gray-800 rounded-lg">
                    <label className="font-bold" htmlFor="">หัวข้อ</label>
                    <input className="" type="text" name="" defaultValue={Content[8]?.value.text} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[8].value.text = e.target.value; return newState }) }} />
                </div>
                {Content[7]?.value.map(({ answer, question }, indexCardQa) => {
                    return (
                        <div className=" border flex gap-2 *:not-[label,button]:flex-1/4 border-gray-800 rounded-lg p-2 " key={answer + question + indexCardQa}>
                            <label htmlFor="">คำถาม</label>
                            <textarea type="text" name="" defaultValue={question} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[7].value[indexCardQa].question = e.target.value; return newState }) }} />
                            <label htmlFor="">คำตอบ</label>
                            <textarea type="text" name="" defaultValue={answer} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[7].value[indexCardQa].answer = e.target.value; return newState }) }} />
                            <button className=" h-fit p-2 px-4 bg-red-800 rounded-lg cursor-pointer hover:text-golden-1 " type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[7].value.splice(indexCardQa, 1); return newState }) }}>ลบ</button>
                        </div>
                    )
                })}
                <button className=" p-2 bg-gray-800 rounded-lg  hover:text-golden-1 cursor-pointer " type="button" onClick={() => { setContent(state => { let newState = [...state]; newState[7].value.push({ question: "", answer: "" }); return newState }) }}>เพิ่มคำถาม</button>
            </div>


            <div className=" border border-gray-800 rounded-lg p-4 flex flex-col">
                <h1 className="text-description-1 font-bold" htmlFor="">ที่อยู่</h1>
                <div className="border border-gray-800 rounded-lg p-4 justify-start flex flex-col">
                    <label htmlFor="">รายละเอียดที่อยู่</label>
                    <textarea type="text" name="" defaultValue={Content[2]?.value.text} onBlur={(e) => { setContent(state => { let newState = [...state]; newState[2].value.text = e.target.value; return newState; }) }} />
                </div>
            </div>


        </form >
    )
};

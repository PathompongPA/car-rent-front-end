import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { fetchApi } from "../../utility";

export default function FormCar({
    index = "",
    isCard = false,
    data = {
        id: undefined,
        brandId: undefined,
        carName: undefined,
        carDescription: undefined,
        carThumbnail: undefined,
        Imgs: [],
        offers: [
            {
                id: undefined,
                offerPrice: undefined,
                offerAmountDay: undefined
            }
        ]
    } }) {
    console.log(data)

    const { id, carName, carDescription, brandId, Imgs, offers, carThumbnail } = data;
    const { AllBrand } = useLoaderData();
    let navigate = useNavigate()

    const [stateOffer, setOffers] = useState(offers)
    const [IsCard, setIsCard] = useState(isCard)
    const [thumbnail, setThumbnail] = useState(carThumbnail)

    const [filesArray, setFilesArray] = useState([]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        async function getBlob(urls) {
            const files = await Promise.all(
                urls.map(async (item) => {
                    const res = await fetch(item);
                    const blob = await res.blob();
                    const fileName = item.split("/").pop();
                    const fileType = blob.type;
                    return new File([blob], fileName, { type: fileType });
                })
            );

            setFilesArray(() => files);
        }
        getBlob(Imgs)
    }, [IsCard])


    function resetForm() {
        document.getElementsByClassName(`form-car-${index}`)[0].reset()
        document.getElementsByClassName(`form-car__container-image-${index}`)[0].src = null;
    }

    function recallPage() {
        navigate(".", { replace: true })
    }

    function getForm(className) {
        let form = new FormData(document.getElementsByClassName(className)[0])
        !IsCard && form.delete("carId")
        return form
    }

    async function handleFileChange() {
        let arrayFile = []
        let arrayImage = []
        let files = document.getElementById(`input-car-image-${index}`).files
        let inputEmpty = files.length <= 0
        if (!inputEmpty) {
            // files.sort((a, b) => a.name.localeCompare(b.name))
            for (const file of files) {
                // arrImage.push({ url: URL.createObjectURL(file) })
                arrayImage.push(URL.createObjectURL(file))
                arrayFile.push(file)
            }
        }
        setFilesArray((state) => [...state, ...arrayFile])
        // setImages(arrayImage)
        // setImages(arrImage)
    }

    function validateDayPrice(form) {
        const days = form.getAll("day[]");
        const prices = form.getAll("price[]");

        let isValid = true;

        for (let index = 0; index < days.length; index++) {
            // const day = days[index];
            const price = prices[index];

            // const dayNum = Number(day);
            const priceNum = Number(price);

            // if (day === "" || isNaN(dayNum) || dayNum < 0) {
            //     alert(`ระดับราคาที่ ${index + 1}: จำนวนวันไม่ถูกต้อง`);
            //     isValid = false;
            // }

            if (price === "" || isNaN(priceNum) || priceNum <= 0) {
                alert(`ระดับราคาที่ ${index + 1}: ราคาต้องมากกว่า 0`);
                isValid = false;
            }
        }

        return isValid;
    }

    function validateCarForm(form) {
        let isCarNameNotNull = form.get("carName").length > 0
        let isBrandIdNotNull = form.get("brandId") !== null
        let isCarDescriptionNotNull = form.get("carDescription").length > 0
        let isHaveCarThumbnail = (form.get("carThumbnail").name !== "") | !IsCard
        !isHaveCarThumbnail && alert("กรุณาเลือกรูปปก รถ")
        !isCarNameNotNull && alert("กรุณากรอกชื่อ รถ")
        !isBrandIdNotNull && alert("กรุณาเลือกยี่ห้อ รถ")
        !isCarDescriptionNotNull && alert("กรุณากรอกคำอธิบาย รถ")

        return isCarNameNotNull & isBrandIdNotNull
    }

    function genOffer(form) {
        const days = form.getAll("day[]");
        const prices = form.getAll("price[]");
        return days
            .map((day, index) => ({
                offerAmountDay: day,
                offerPrice: prices[index]
            }))
            .filter(item => item.offerAmountDay !== "" && item.offerPrice !== "");

    }

    async function handleBtnSave() {
        let formCar = getForm(`form-car-${index}`)
        let isFormCarValid = validateCarForm(formCar)
        let isTairPriceValid = validateDayPrice(formCar);

        let offer = genOffer(formCar)
        formCar.append("offer", JSON.stringify(offer))
        formCar.delete("day[]")
        formCar.delete("price[]")

        filesArray.length > 0 && filesArray.forEach(file => {
            formCar.append("carImage", file)
        })

        console.log(formCar.getAll("carImage"))

        if (isFormCarValid & isTairPriceValid) {
            const { isSuccess, msg } = await fetchApi(isCard ? "PUT" : "POST", "/api/car/", formCar, {})
            isSuccess ? alert("บันทึกสำเร็จ") : alert(msg)
            isSuccess && location.reload(true)
            recallPage() & resetForm()
            isSuccess & index !== "" && handleToggleEdit()
        }
    }

    function addNewTair() {
        setOffers([
            ...stateOffer,
            { id: undefined, offerAmountDay: 0, offerPrice: 0 }
        ]);
    }

    function handleToggleEdit() {
        setIsCard(!IsCard)
    }

    function handleBtnDeleteTair(e) {
        let position = e.target.getAttribute("data-index")
        let newOffer = [...stateOffer]
        newOffer.splice(position, 1)
        setOffers(newOffer)
    }

    async function handleInputThumbnailChange() {
        let form = getForm(`form-car-${index}`)
        let file = form.get("carThumbnail")
        file.name !== "" && setThumbnail(URL.createObjectURL(file))
    }

    // const dragItem = useRef(null);

    // const handleDragStart = (e, index) => {
    //     e.currentTarget.classList.add("--dragging");
    //     dragItem.current = index;
    // };

    // const handleDragEnter = (e, index) => {
    //     const draggedOverItem = index;
    //     if (dragItem.current === draggedOverItem) return;
    //     const updatedList = [...images];
    //     const draggedItemContent = updatedList[dragItem.current];
    //     updatedList.splice(dragItem.current, 1);
    //     updatedList.splice(draggedOverItem, 0, draggedItemContent);
    //     dragItem.current = draggedOverItem;
    //     setImages(updatedList);
    // };

    // const handleChangeInputFile = (e) => {
    //     const files = Array.from(e.target.files);
    //     setFilesArray(files);
    // };

    const reorder = (arr, from, to) => {
        const updated = [...arr];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        return updated;
    };

    const handleDrop = () => {
        if (!inputRef.current) return;

        const dataTransfer = new DataTransfer();
        filesArray.forEach((file) => dataTransfer.items.add(file));
        inputRef.current.files = dataTransfer.files;

        const event = new Event("change", { bubbles: true });
        inputRef.current.dispatchEvent(event);

        setDraggingIndex(null);
    };

    function handleDragOver(e, index) {
        e.preventDefault();
        if (draggingIndex !== null && draggingIndex !== index) {
            setFilesArray((prev) => reorder(prev, draggingIndex, index));
            setDraggingIndex(index);
        }
    }

    async function handleClickHide() {
        console.log("click hide")
        let body = JSON.stringify({ id: id, isDelete: !data.isDelete })
        let method = "POST"
        let path = "/api/car/hide"
        let { isSuccess, msg } = await fetchApi(method, path, body)
        isSuccess ? alert("บันทึกสำเร็จ") : alert(msg)
        isSuccess && location.reload(true)
        recallPage() & resetForm()
    }

    return (

        <form className={`form-car-${index} *** snap-center  h-fit border border-gray-800  *:bg-gray-900 w-full flex flex-col gap-4 p-4 rounded-lg *:not-first:p-2 *:rounded-lg `} onSubmit={(event) => { event.preventDefault() }}  >

            <div className={`*:hover:cursor-pointer flex justify-end ${isCard ? "" : "hidden"} `}>
                <input className="" type="checkbox" name="" id={`hide-${index}`} checked={data.isDelete} onClick={handleClickHide} />
                <label htmlFor={`hide-${index}`}> ซ้อนจากหน้าเว็บ </label>
            </div>

            <fieldset className="  grid grid-cols-2 *:not-first:bg-gray-900  gap-4 p-4 *:p-2 *:rounded-lg *:w-full ">

                <input className="form-car__car-id" type="hidden" value={id} name="id" />

                <div className="col-span-2 relative ">
                    <label className=" absolute text-center top-0 left-0 w-full h-full bg-gray-800/40 cursor-pointer justify-center items-center flex text-xl" htmlFor={`input-car-thumbnail-${index}`} hidden={IsCard} >คลิกเพื่อแก้ไข</label>
                    <input className="" id={`input-car-thumbnail-${index}`} name="carThumbnail" type="file" accept="image/*" hidden onChange={handleInputThumbnailChange} />
                    <img className={`form-car__thumbnail-${index} *** w-full aspect-16/9 object-cover `} src={thumbnail} alt="" />
                </div>


                <select className={`form-car__select-brand-${index} *:text-white`} name="brandId" defaultValue={brandId} disabled={IsCard}  >
                    <option value={undefined} disabled>เลือกยี่ห้อ</option>
                    {AllBrand.data.map(({ brandName, id }, _index) => {
                        return <option className="" key={_index} value={id} >{brandName}</option>

                    })}
                </select>

                <input className={`form-car__car-name-${index} ***`} type="text" name="carName" defaultValue={carName} placeholder={!IsCard ? "ชื่อ" : ""} accept="image/*" readOnly={IsCard} />

                <textarea className={`form-car__car-description-${index} *** col-span-2 bg-white`} name="carDescription" placeholder="รายละเอียด" defaultValue={carDescription} readOnly={IsCard}></textarea>

            </fieldset>

            <div className={`flex justify-between items-center w-full *:p-2 `}>
                <h1 className={`font-black`}>{`รูปทั้งหมด ${filesArray.length}`}</h1>
                <label className={`form-car__label-input-car-image-${index} *** p-3 ${IsCard && "hidden"} hover:text-golden-1 font-normal hover:cursor-pointer rounded-lg text-sm bg-gray-800 `} htmlFor={`input-car-image-${index}`}>เพิ่มรูป</label>
            </div>

            <div className=" col-span-2  w-full relative  group *:group-hover:cursor-pointer overflow-x-auto flex flex-col justify-center items-center gap-4 pt-4 h-fit pb-4 "  >
                <input className={`form-car__input-image-${index} hidden`} type="file" id={`input-car-image-${index}`} accept="image/*" multiple onChange={handleFileChange} hidden={false} />
                <div className={`form-car__container-image-${index} *** gap-4  flex flex-nowrap pb-6 w-full overflow-auto`} >
                    <h1 className={`${filesArray.length === 0 ? "" : "hidden"} text-gray-500 pt-4 w-full text-center h-8`}>ยังไม่ได้เพิ่มรูป</h1>
                    {filesArray && filesArray.map((file, _index) =>
                        <div className={`form-car__box-image-${index}-${_index} --- min-w-[200px] aspect-video ${IsCard ? "border-0" : "border-2 hover:cursor-move "} p-1 relative border border-gray-300 border-dashed rounded-lg`} >
                            <button className={`form-car__btn-delete-image-${index}-${_index} --- ${IsCard ? "hidden" : ""} -right-1 -top-1 z-10 absolute px-4 py-1 bg-red-600 font-black text-2xl rounded-full hover:cursor-pointer`} type="button" onClick={() => { setFilesArray(state => { let newState = [...state]; newState.splice(_index, 1); console.log(newState); return newState }) }}>-</button>
                            < img
                                className={`form-car__imag-${index}-${_index} --- w-full h-full aspect-16/9 object-cover bg-gray-800/40 rounded-lg `}
                                src={file && URL.createObjectURL(file)}
                                alt=""
                                key={index + _index}
                                draggable={!IsCard}
                                onDragStart={() => setDraggingIndex(_index)}
                                onDragOver={(e) => handleDragOver(e, _index)}
                                onDrop={handleDrop}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className={`form-car__container-tair-${index} ***  flex flex-col gap-2 pt-2 ${IsCard && "min-h-[150px]"} pt-4 gap-4`}  >
                <div className=" flex justify-between items-center w-full *:p-2 ">
                    <h1 className="font-black">ระดับราคา</h1>
                    <button className={` hover:text-golden-1 text-sm cursor-pointer bg-gray-800 p-2 rounded-lg ${IsCard && "hidden"}`} onClick={addNewTair}>เพิ่มระดับราคา</button>
                </div>
                {stateOffer.map((offer, _index) => {
                    return (
                        <div className={`form-car__container-tair-${index}  grid grid-cols-7  gap-1 *:rounded-lg *:py-2 items-center *:text-center`} key={`${index}-${offer.id}`}>
                            <input type="hidden" defaultValue={offer.id} />
                            <input className={`form-car__tair-${index}-day-${_index} *** col-span-2 `} type="text" placeholder="จำนวน" name="day[]" readOnly={IsCard} defaultValue={offer.offerAmountDay} min={0} />
                            <label >วัน</label>
                            <input className={`form-car__tair-${index}-price-${_index} *** col-span-2 `} type="number" placeholder="ราคา" name="price[]" readOnly={IsCard} defaultValue={offer.offerPrice} min={0} />
                            <label >บาท</label>
                            <button className={`form-car__btn-delete-tair-${index} --btn col-span-1 bg-red-800 text-white p-2 rounded-lg hover:bg-red-600 btn-delete-tair ${IsCard && "hidden"}`} data-index={_index} onClick={handleBtnDeleteTair}>ลบ</button>
                        </div>
                    )
                })}
            </div>

            <fieldset className="container-btn-${index} flex gap-4 *:p-2 *:flex-1/2 *:rounded-lg *:hover:cursor-pointer justify-center">
                <button className={`form-car__btn-save-${index} *** --btn flex-1/2 bg-lime-800 ${IsCard && "hidden"} `} type="button" onClick={handleBtnSave}>บันทึก</button>
                <button className={`form-car__btn-cancel-${index} *** --btn flex-1/2 ${IsCard & index !== "" && "hidden"} ${!IsCard & index === "" && "hidden"}`} type="button" onClick={handleToggleEdit}>ยกเลิก</button>
                <button className={`form-car__btn-edit-${index} *** --btn flex-1/2 bg-blue-800 ${!IsCard && "hidden"}`} type="button" onClick={handleToggleEdit} >แก้ไข</button>
            </fieldset>
        </form >
    )
};
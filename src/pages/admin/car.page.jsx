import { Suspense, useEffect, useRef, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router";
import { fetchApi } from "../../utility";

export default function CarPage() {
    const { revalidate } = useRevalidator();
    let { Car, AllBrand } = useLoaderData()

    const [Brands, setBrands] = useState(AllBrand.data)
    const [Cars, setCars] = useState(Car.data)

    const [EditBrand, setEditBrand] = useState(Brands[0])
    const [EditCar, setEditCar] = useState(undefined)

    const [isPopUpBrandOpen, setIsPopUpBrandOpen] = useState(false)
    const [isShortBrandMode, setIsShortBrandMode] = useState(false)
    const [isPopUpBrandCreateMode, setisPopUBrandCreateMode] = useState(false)

    const [isPopUpCarOpen, setIsPopUpCarOpen] = useState(false)
    const [isShortCarMode, setIsShortCarMode] = useState(false)
    const [isPopUpCarCreateMode, setIsPopUCarCreateMode] = useState(false)

    const [popUpAlert, setPopUpAlert] = useState({ isOpen: false, msg: "" })

    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            if (event.key === 'Escape') {
                closePopUpBrand()
                closePopUpCar()
            }
        };
        setBrands(AllBrand.data)
        setCars(Car.data)
        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => { document.removeEventListener('keydown', handleGlobalKeyDown); };
    }, [AllBrand, Car]);

    const closePopUpCar = () => { setIsPopUpCarOpen(false); setIsPopUCarCreateMode(false) }
    const openPopUpCar = (index) => { setEditCar(Cars[index]); setIsPopUpCarOpen(true); }
    const openBlankingPopUpCar = () => { setIsPopUCarCreateMode(true); setIsPopUpCarOpen(true); setEditCar(undefined) }

    const closePopUpBrand = () => { setIsPopUpBrandOpen(false); setisPopUBrandCreateMode(false) }
    const handleOpenPopUpBrand = (index) => { setIsPopUpBrandOpen(true); setEditBrand(Brands[index]); }
    const handleOpenBlankingPopUpBrand = () => { setisPopUBrandCreateMode(true); setIsPopUpBrandOpen(true); setEditBrand({ id: null, brandName: null, brandImg: null }) }

    const changeImageBrand = (e) => { document.getElementsByClassName("pop-up-brand__img")[0].src = URL.createObjectURL(e.currentTarget.files[0]) }

    const changePositionArray = (array, from, to) => {
        const [moved] = array.splice(from, 1);
        array.splice(to, 0, moved);
        return array
    }

    const msgAlert = (msg, func = () => { }) => { setPopUpAlert({ isOpen: true, msg: msg }); func() }
    const closeAlert = () => {
        const scrollY = window.scrollY; // เก็บ scroll position
        setPopUpAlert({ isOpen: false, msg: "" });
        window.scrollTo(0, scrollY); // restore scroll position
    }

    function logFormData(formData) {
        console.log("------ FormData ------");
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File(name=${value.name}, size=${value.size})`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        console.log("----------------------");
    }

    const updateBrandOder = async () => {
        if (isShortBrandMode) {
            let BrandsNewIndex = Brands.map((brand, index) => ({ id: brand.id, name: brand.brandName, index: index }))
            let { isSuccess, msg } = await fetchApi("PUT", "/api/car/brand/index", JSON.stringify({ payload: BrandsNewIndex }))
            if (isSuccess) {
                msgAlert("บันทึกสำเร็จ")
                revalidate();
                setIsShortBrandMode(false);
            } else {
                msgAlert(`บันทึกผิดพลาด <${msg}>`)
            }
        }
    }
    const updateCarOder = async () => {
        if (isShortCarMode) {
            let newCarIndex = Cars.map((car, index) => ({ id: car.id, index: index }))
            let { isSuccess, msg } = await fetchApi("PUT", "/api/car/index", JSON.stringify({ payload: newCarIndex }))
            if (isSuccess) {
                msgAlert("บันทึกสำเร็จ")
                revalidate();
                setIsShortCarMode(false)
            } else {
                msgAlert(`บันทึกผิดพลาด <${msg}>`)
            }
        }
    }

    const updateBrand = async () => {
        let formData = new FormData(document.getElementsByClassName("pop-up-brand__form")[0])
        isPopUpBrandCreateMode && formData.delete("id")
        const { isSuccess, msg } = await fetchApi(isPopUpBrandCreateMode ? "POST" : "PUT", "/api/car/brand", formData, {})
        if (isSuccess) {
            if (isPopUpBrandCreateMode) {
                msgAlert("เพิ่มยี่ห้อ สำเร็จ")
                setisPopUBrandCreateMode(false);
            } else {
                msgAlert("แก้ไขยี่ห้อ สำเร็จ")
            }
            closePopUpBrand();
            revalidate()
        } else {
            msgAlert(`บันทึกผิดพลาด <${msg}>`)
        }
    }

    const PopUpAlert = ({ prop }) => {
        return prop.isOpen && (
            <div className="pop-up-alert --- fixed z-50 top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-4 bg-gray-950/40 backdrop-blur-lg ">
                <div className="pop-up-alert__container --- bg-gray-900 p-8 rounded-2xl flex flex-col gap-4 justify-center items-center ">
                    <h1 className="pop-up-alert__title --- text-xl text-center font-black"> ข้อความ</h1>
                    <h1 className="pop-up-alert__msg ---  p-10 text-center min-h-[10vh] min-w-[20vh]"> {prop.msg} </h1>
                    <button className="pop-up-alert__btn-close --btn --- bg-gray-700 p-2 rounded-lg " type="button" onClick={closeAlert}>รับทราบ</button>
                </div>
            </div>
        )
    }

    const Title = ({ className }) => {
        return (<h1 className={` md:p-4 hidden md:flex text-title-3 font-bold ${className} `}>จัดการข้อมูลรถ</h1>)
    }

    const PopUpEditBrand = ({ id = null, name = null, img = null }) => {
        return (
            <div className={`pop-up-brand --pop-up --- duration-500 transform flex justify-center scale-0 items-center gap-4 bg-gray-950/40 backdrop-blur-lg hover:cursor-pointer ${isPopUpBrandOpen && "scale-100"} `} onClick={closePopUpBrand} >
                <form className="pop-up-brand__form --- flex flex-col gap-4 p-12 rounded-2xl bg-gray-800/90 cursor-default" id={id} onClick={(e) => { e.stopPropagation() }}  >
                    <h1 className="pop-up-brand__title --- w-full text-center text-xl font-bold">{isPopUpBrandCreateMode ? "เพิ่มยี่ห้อใหม่" : "แก้ไขข้อมูล"}</h1>
                    <input className="pop-up-brand__input-id--- bg-gray-700/30 p-2 text-center" type="text" name="id" id={"brand-id-" + id} value={id} hidden readOnly />
                    <input className="pop-up-brand__input-name --- bg-gray-700/30 p-2 text-center" type="text" name="brandName" id="brand-name" defaultValue={name} placeholder="กรุณากรอกชื่อ" />
                    <div className="pop-up-brand__container-img --- relative aspect-square rounded-xl overflow-hidden bg-gray-800 hover:scale-[1.05] duration-200 ">
                        <img className="pop-up-brand__img --- absolute w-full h-full left-0 top-0 brightness-50 object-cover " src={img} />
                        <input className="pop-up-brand__input-img --- absolute w-full h-full left-0 top-0 " onChange={(e) => { changeImageBrand(e) }} hidden type="file" name="brandImg" id="pop-up-img-brand" accept="image/*" />
                        <label className="pop-up-brand__lable-input-img --- absolute w-full h-full text-center flex justify-center items-center hover:cursor-pointer hover:bg-gray-900/40 duration-200 " htmlFor="pop-up-img-brand">คลิกเพื่อแก้ไข</label>
                    </div>
                    <div className="pop-up-brand__container-btn --- flex gap-4 justify-center *:p-2 *:bg-gray-800 *:rounded-2xl ">
                        <button className="pop-up-brand__btn-save --btn ---" onClick={updateBrand} type="button">บันทึก</button>
                        <button className="pop-up-brand__btn-cancel --btn --- " onClick={closePopUpBrand} type="button">ยกเลิก</button>
                    </div>
                </form>
            </div >
        )
    }

    const PopUpEditCar = ({ data = { id: "", carName: "", carDescription: "", carThumbnail: "", brandId: "", offers: [{ id: "", offerAmountDay: "", offerPrice: "" }], Imgs: [], } }) => {
        useEffect(() => { console.log("re rendre pop up car", data) }, [data])
        let allImage = useRef()

        const updataCar = async (e) => {
            e.preventDefault()
            function genOffer(form) {
                const days = form.getAll("offerAmountDay[]");
                const prices = form.getAll("offerPrice[]");
                return days.map((day, index) => ({ offerAmountDay: day, offerPrice: prices[index] })).filter(item => item.offerAmountDay !== "" && item.offerPrice !== "");
            }
            let formData = new FormData(document.getElementsByClassName("pop-up-edit-car__container")[0])
            // console.log("imgs : ", Imgs)
            allImage.current.forEach(file => { formData.append("carImage", file) })

            let offer = genOffer(formData)
            formData.append("offer", JSON.stringify(offer))
            formData.delete("day[]")
            formData.delete("price[]")
            let { isSuccess, msg, data } = await fetchApi(isPopUpCarCreateMode ? "POST" : "PUT", "/api/car", formData, {})
            console.log("msg : ", msg, data)
            logFormData(formData)
            revalidate();
            if (isSuccess) {
                msgAlert("บันทึกสำเร็จ")
                closePopUpCar()
            } else {
                msgAlert(msg)
            }
        }
        const NameAndBrand = ({ _id, _name, _brandId }) => {
            const [id] = useState(_id)
            const [name, setName] = useState(_name)
            const [brandId, setBrandId] = useState(_brandId)
            return (
                <div className="row-span-1 bg-gray-700 rounded-2xl grid grid-cols-16  *:flex *:justify-center *:items-center ">
                    <input name="id" value={id} hidden></input>
                    <label className=" col-span-2">ชื่อ</label>
                    <input className="pop-up-edit-car__ --- text-sm col-span-6 rounded-2xl" type="text" name="carName" id="carName" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
                    <label className="col-span-3">ยี้ห้อ</label>
                    <select className="pop-up-edit-car__select-brand --- col-span-5 rounded-2xl bg-transparent" id="brandId" name="brandId" defaultValue={brandId} >
                        {AllBrand.data.map((brand) => <option className="pop-up-edit-car__option-brand bg-gray-800" id={`option-brand-id-${id}`} value={brand.id} key={brand.id} onClick={(e) => { setBrandId(e.target.value) }}>{brand.brandName}</option>)}
                    </select>
                </div>
            )
        }
        const Thumbnail = ({ _thumbnail }) => {
            const [thumbnail, setThumbnail] = useState(_thumbnail)
            return (
                <div className="pop-up-edit-car__container-thumbnail --- border row-span-3 aspect-3/2 h-fit relative rounded-2xl overflow-hidden ">
                    <img className="pop-up-edit-car__img-thumbnail --- w-full aspect-3/2 object-cover brightness-75 " src={thumbnail && URL.createObjectURL(thumbnail)} alt={`thumbnail-${thumbnail}`} />
                    <input className="pop-up-edit-car__" type="file" name="carThumbnail" id="carThumbnail" accept="image/*" hidden
                        // value={thumbnail}
                        onChange={(e) => { setThumbnail(e.target.files[0]) }}
                    />
                    <label className="pop-up-edit-car__label-input-file-thumbnail --- hover:cursor-pointer absolute w-full h-full top-0 flex justify-center items-center bg-gray-900/50" htmlFor="carThumbnail">คลิกเพื่อแก้ไข</label>
                </div>
            )
        }
        const Detail = ({ _detail }) => {
            const [detail, setDetail] = useState(_detail)
            return (
                <div className=" row-span-3 bg-gray-700 rounded-2xl p-4 flex flex-col gap-2 ">
                    <h1 className=" font-black text-xl">รายละเอียด</h1>
                    <textarea className="pop-up-edit-car__description --- bg-gray-900/50" value={detail} name="carDescription" id="carDescription" onChange={(e) => { setDetail(e.target.value) }}></textarea>
                </div >
            )
        }
        const Offers = ({ _offer }) => {
            useEffect(() => { }, [])
            const [offer, setOffer] = useState(_offer)
            return (
                <div className=" row-span-3 flex flex-col gap-2 p-4 bg-gray-700 rounded-2xl ">
                    <div className="flex justify-between *:flex *:justify-center *:items-center ">
                        <h1 className=" font-black text-xl">ระดับราคา</h1>
                        <button className="--btn px-4 py-2 bg-gray-900/50 rounded-2xl font-black hover:cursor-pointer " type="button" onClick={() => {
                            setOffer(
                                (state) => {
                                    let newState = [...state]
                                    newState.push({ id: "", offerAmountDay: "", offerPrice: "" })
                                    console.log("new state ", newState)
                                    return newState
                                }
                            )
                        }} >  เพิ่มระดับราคา </button>
                    </div>
                    <div className=" overflow-y-scroll h-full ">
                        {offer?.map(({ id, offerPrice, offerAmountDay }, index) => (
                            <div className="pop-up-edit-car__container-price --- grid grid-cols-13 gap-2 w-full p-1 pl-4 *:w-full   *:items-center *:flex *:justify-center *:not-[h1]:w-full" key={index + id}>
                                <input className="pop-up-edit-car__input-duration --- col-span-5 p-2 box-border bg-gray-900/50" type="text" name="offerAmountDay[]" id={`duration-${index}`} defaultValue={offerAmountDay}
                                    onChange={(e) => {
                                        setOffer((state) => {
                                            let newState = [...state]
                                            newState[index].offerAmountDay = e.target.value
                                            return newState
                                        })
                                    }
                                    } />
                                <h1 className="w-fit col-span-1 ">วัน</h1>
                                <input className="pop-up-edit-car__input-price --- col-span-5 p-2 bg-gray-900/50" type="text" name="offerPrice[]" id={`price-${index}`} defaultValue={offerPrice} onChange={
                                    (e) => {
                                        setOffer((state) => {
                                            let newState = state
                                            newState[index].offerPrice = e.target.value
                                            return newState
                                        })
                                    }
                                } />
                                <button className="--btn py-2 px-4 rounded-2xl col-span-2 bg-red-800/80" type="button" onClick={() => { setOffer(state => { let newState = [...state]; newState.splice(index, 1); return newState }) }}>ลบ</button>
                            </div>
                        ))}
                    </div>
                </div >
            )
        }
        const Gallery = ({ _Imgs }) => {
            const [indexStart, setIndexStart] = useState(null)
            const [indexEnd, setIndexEnd] = useState(null)
            const [image, setImage] = useState(_Imgs)
            useEffect(() => {
                allImage.current = image
            }, [image])

            console.log("image  : ", image)
            return (
                <div className="h-full box-border flex flex-col bg-gray-700 rounded-2xl p-2">
                    <div className=" flex justify-between items-center mb-2 ">
                        <label className="--btn p-4 bg-gray-900/50 rounded-2xl" htmlFor="carImages">เพิ่มรููป</label>
                        <input className="" type="file" accept="image/*" multiple hidden name="" id="carImages" onChange={e => setImage(state => [...state, ...e.target.files])} />
                        <div className=" text-xl font-black p-4">รูปทั้งหมด</div>
                    </div>

                    <div className=" grid grid-cols-3  gap-2 p-4 rounded-2xl bg-gray-700  overflow-y-scroll ">
                        {image?.map((img, index) => (
                            <div className="relative w-full aspect-video  rounded-2xl overflow-hidden duration-200 hover:cursor-pointer active:cursor-pointer "
                                draggable
                                onDragStart={(e) => {
                                    setIndexStart(index);
                                    e.currentTarget.classList.add("brightness-40")
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setIndexEnd(index);
                                    e.currentTarget.classList.add("brightness-40")
                                }}
                                onDragLeave={(e) => {
                                    e.currentTarget.classList.remove("brightness-40")
                                }}
                                onDrop={(e) => {
                                    e.currentTarget.classList.remove("brightness-40")
                                    setImage((state) => { return [...changePositionArray([...state], indexStart, indexEnd)] })
                                    setIndexStart(null)
                                    setIndexEnd(null)
                                }}
                            >
                                <h1 className=" absolute right-1 top-1 rounded-full bg-red-800  px-2 hover:cursor-pointer " onClick={
                                    () => {
                                        setImage(
                                            (state) => {
                                                let newState = [...state];
                                                newState.splice(index, 1);
                                                return newState
                                            }
                                        )
                                    }
                                }>-</h1>
                                <img className="gallery__image --- w-full rounded-lg aspect-video object-cover bg-gray-800 " src={URL.createObjectURL(img)} alt={`car-image-${index}`} key={index + img} draggable />
                            </div>
                        )
                        )}
                    </div>
                </div >
            )
        }
        const BtnSaveAndCancel = () => (
            <div className="pop-up-edit-car__btn-container --- col-span-10 flex gap-4 justify-center  *:bg-gray-950/50  *:px-5 *:rounded-2xl w-full ">
                <button className="pop-up-edit-car__btn-save --btn" type="submit" >บันทึก</button>
                <button className="pop-up-edit-car__btn-cancel --btn" type="button" onClick={closePopUpCar}>ยกเลิก</button>
            </div>
        )
        return (
            <div className={`pop-up-edit-car --pop-up --- ${isPopUpCarOpen ? "scale-100" : "scale-0"} h-full w-full flex justify-center items-center  duration-500 bg-gray-950/30 backdrop-blur-lg hover:cursor-pointer`} onClick={closePopUpCar} >
                <form className={`pop-up-edit-car__container --- bg-gray-800 grid grid-cols-10 grid-rows-10 p-8 rounded-2xl gap-4 m-4 h-fit w-full xl:h-[ 80vh ] xl:w-[1070px]  transition-all duration-1000 backdrop-blur-xs  delay-1000 hover:cursor-default`} onClick={(e) => { e.stopPropagation() }} onSubmit={(e) => { updataCar(e) }}  >
                    {/* <h1 className="col-span-10  text-3xl font-black w-full flex justify-center items-center">ข้อมูล</h1> */}
                    <div className="pop-up-edit-car__container-left --- grid grid-rows-10 gap-4 row-span-11 col-span-3 h-full">
                        <NameAndBrand _id={data.id} _name={data.carName} _brandId={data.brandId} />
                        <Thumbnail _thumbnail={data.carThumbnail} />
                        <Detail _detail={data.carDescription} />
                        <Offers _offer={data.offers} />
                    </div>
                    <div className="pop-up-edit-car__container-right --- col-span-7 row-span-11 ">
                        <Gallery _Imgs={data.Imgs} />
                    </div>
                    <BtnSaveAndCancel />
                </form >
            </div>
        )
    }

    const BrandMenager = () => {
        const ToolBar = () => {
            const Title = () => <div className="brand-manager__title --- text-2xl font-bold flex items-center p-2">ยี่ห้อทั้งหมด</div>
            const Tool = () => (
                <div className="brand-manager__tool --- flex gap-4">
                    <button className="brand-manger__btn-short --btn --- " type="button" onClick={updateBrandOder}>{isShortBrandMode && "บันทึก"}</button>
                    <button className="brand-manger__btn-cancel-short --btn --- " type="button" onClick={() => { setBrands(AllBrand.data); setIsShortBrandMode(false) }}>{isShortBrandMode && "ยกเลิก"}</button>
                    <button className="brand-manger__btn-create-brand --btn ---  font-bold p-4 bg-gray-700 rounded-2xl" onClick={handleOpenBlankingPopUpBrand} type="button">เพิ่มยี่ห้อใหม่</button>
                </div>
            )

            return (
                <div className="brand-manger__tool-bar --- flex justify-between p-4 gap-4 flex-wrap  z-20 bg-gray-900 ">
                    <Title />
                    <Tool />
                </div>
            )
        }
        const ListBrand = () => {
            let from = useRef()
            let to = useRef()
            const CardBrand = ({ id, img, name, index, isHaveCar }) => {
                return (
                    <div className={`card-brand-admin --card-admin --- relative  w-full   rounded-lg group overflow-visible ${!isHaveCar && "brightness-20"}  `} id={id}
                        draggable
                        onClick={async () => { await updateBrandOder(); handleOpenPopUpBrand(index) }}
                        onDragStart={() => { from.current = index }}
                        onDragOver={(e) => {
                            e.preventDefault()
                            e.currentTarget.classList.add("brightness-50", "scale-95")
                            to.current = index
                        }}
                        onDragLeave={(e) => {
                            e.currentTarget.classList.remove("brightness-50", "scale-95")
                        }}
                        onDragEnd={() => {
                            setBrands(state => changePositionArray([...state], from.current, to.current));
                            setIsShortBrandMode(true);
                        }}
                    >
                        <div className="card-brand-admin__btn-container --- absolute top-2 right-4 flex gap-2 ">
                            <button className="card-brand-admin___btn-move --- hidden " type="button">move</button>
                        </div>
                        <img className="card-brand-admin__img --- aspect-square rounded-2xl w-full object-cover  group-hover:brightness-75 bg-gray-800/50 " draggable={true} src={img} alt={`brand-name`} />
                        <h1 className="card-brnd-admin__name ---  text-center  w-full  truncate  text-xs md:text-sm  ">{name}</h1>

                        {/* <img className={`car-manger__btn-hide-car --- absolute top-0 right-0  opacity-80 p-1  hover:brightness-50  aspect-square rounded-lg  bg-gray-900/30 object-cover ${isHaveCar && "hidden"} `} src={!isHaveCar ? "../../../public/visibility_off_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" : "../../../public/visibility_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"} ></img> */}

                    </div >
                )
            }
            let List = Brands?.map((brand, index) => <CardBrand id={brand.id} img={brand.brandImg} name={brand.brandName} key={brand.id} index={index} isHaveCar={brand.cars.length > 0} />)
            return (
                <div className="list-brand --- grid grid-cols-4 md:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3 p-4  rounded-2xl " > {List} </div>
            )
        }
        return (
            <div className="brand-manager --- rounded-2xl ">
                <ToolBar />
                <ListBrand />
            </div>
        )
    }

    const CarMenager = () => {
        let from = useRef()
        let to = useRef()
        const Title = () => (<h1 className="car-manager__title ---  text-2xl font-bold flex items-center"> รถทั้งหมด</h1>)
        const Tool = () => (
            <div className="car-manger__tool --- flex gap-4">
                <button className="car-manger__btn-short --btn" type="button" onClick={async () => { await updateCarOder(); }}>{isShortCarMode && "บันทึก"}</button>
                <button className="car-manger__btn-cancel-short --btn" type="button" onClick={async () => { setCars(Car.data); setIsShortCarMode(false) }}>{isShortCarMode && "ยกเลิก"}</button>
                <button className="car-manger__btn-create-brand --btn ---  font-bold p-4 bg-gray-700 rounded-2xl" type="button" onClick={openBlankingPopUpCar}>เพิ่มรถใหม่</button>
            </div >
        )
        const ToolBar = () => (
            <div className="car-manager__tool-bar --- flex flex-col px-4 py-2 gap-5 overflow-hidden">
                <div className="car-manger___container-titler-bar --- flex justify-between gap-32">
                    <Title />
                    <Tool />
                </div>
            </div>
        )
        const CardCar = ({ index, id, name, thumbnail, brand, isHide }) => (
            <div className="car-manager__card --card-admin --- rounded-lg overflow-hidden relative aspect-3/2  group bg-gray-800 duration-200 " id={id}
                draggable
                onDragStart={(e) => {
                    from.current = index;
                    e.currentTarget.classList.add("brightness-50");
                }}
                onDragOver={(e) => {
                    e.currentTarget.classList.add("brightness-50");
                    e.currentTarget.classList.add("scale-90");
                    e.preventDefault();
                    to.current = index
                }}
                onDragLeave={(e) => {
                    e.currentTarget.classList.remove("brightness-50");
                    e.currentTarget.classList.remove("scale-90");
                }}
                onDrop={(e) => {
                    e.currentTarget.classList.remove("brightness-50");
                    setCars(state => changePositionArray([...state], from.current, to.current))
                    setIsShortCarMode(true)
                }}
            >
                <img className={`car-manger__img-car --- ${isHide ? "brightness-10 group-hover:brightness-5" : "brightness-75 group-hover:brightness-50"}  w-full h-full object-cover  bg-gray-800 `} src={URL.createObjectURL(thumbnail)} alt={`thumnail-${name}`} onClick={async () => { openPopUpCar(index) }} />
                <h1 className="car-manger__name-car --- absolute bottom-0 text-white text-sm w-full p-2 group-hover:brightness-100 ">{brand} {name}</h1>
                <div className="car-manger__container-hide --- absolute top-1 right-1 " onClick={async () => {
                    let { isSuccess, data } = await fetchApi("POST", "/api/car/hide", JSON.stringify({ id: id }))
                    console.log("data : ", data)
                    if (isSuccess) {
                        revalidate();
                        msgAlert("บันทึกสำเร็จ")
                    }
                }}>
                    <img className="car-manger__btn-hide-car --- p-1 brightness-75 hover:brightness-50  aspect-square rounded-lg  bg-gray-900/30 object-cover " src={isHide ? "/src/assets/visibility_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" : "/src/assets/visibility_off_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"} ></img>
                </div>
            </div >
        )
        const ListCar = () => (
            <div className="car-manager__list-car --- grid grid-cols-2  md:grid-cols-3   gap-3 p-4  ">
                {Cars?.map((item, index) => {
                    return <CardCar id={item.id} name={item.carName} thumbnail={item.carThumbnail} brand={item.brand.brandName} key={item.id} index={index} isHide={item.isDelete} />
                })}
            </div>
        )
        return (
            <div className="car-menager --- flex flex-col ">
                <ToolBar />
                <ListCar />
            </div>
        )
    }

    return (
        <div className="flex  flex-col w-full xl:w-[1070px]  pt-18 gap-2 ">
            <Suspense fallback={<div>Loading...</div>}>
                <Title />
                <BrandMenager />
                <CarMenager />
                <PopUpEditBrand id={EditBrand.id} name={EditBrand.brandName} img={EditBrand.brandImg} />
                <PopUpEditCar data={EditCar} />
                <PopUpAlert prop={popUpAlert} />
            </Suspense >
        </div >
    )

};

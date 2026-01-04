import AllImage from "./all.image.component"
import Box from "./Box.component"
import Btn from "./btn.component"
import OfferForm from "./offer.form.component"
import Title from "./title.component"

function InputText({ children, className, value, onChange, }) {
    return (
        <Box variant={"row-between"} className={`items-center ${className}`}>
            <Title variant="secondary">{children}</Title>
            <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={`กรุณากรอก${children}`} />
        </Box>
    )
}
function Select({ children, className, name, value, onChange }) {
    return (
        <select value={value} className={`${className} `} onChange={(e) => onChange(e.target.value)}>
            <option className="bg-gray-900" value="" disabled>กรุณาเลือก {name}</option>
            {children}
        </select>
    )
}
function EditImage({ className, img, name, onChange, allBrand, brandId, onChangeBrand, onChangeName }) {
    return (
        <Box variant={"col"} className={`h-full w-full rounded-lg overflow-hidden  justify-center items-center ${className} `}>
            <Box variant={"col"} className={` relative aspect-3/2 max-w-full min-h-full border border-white/50 rounded-lg overflow-hidden`}>
                <label className=" absolute flex justify-center items-center bg-gray-900/50 hover:bg-gray-900/80 hover:cursor-pointer duration-300 w-full h-full select-none " htmlFor="thumbnail-car" >{!img ? "ยังไม่มีรูปคลิกเพื่อเพิ่ม" : "คลิกเพื่อแก้ไขรูปปก"}</label>
                <input id="thumbnail-car" type="file" onChange={(e) => onChange(e.target.files[0])} hidden />
                <img className=" w-full h-full aspect-video object-cover" src={img} />
                <Box className={"absolute bottom-0 right-0 p-2 w-[60%] grid grid-cols-12 "}>
                    <Select className={" text-end col-span-6  rounded-lg border border-white/40 "} name="ยี่ห้อ" value={brandId} onChange={onChangeBrand} >
                        {allBrand?.map(({ id, brandName }, brandINdex) => <option className="bg-gray-900" value={id} key={brandINdex} >{brandName} </option>)}
                    </Select >
                    <input className="p-0 border border-white/50 rounded-lg px-2 col-span-6 text-end" placeholder="ชื่อรถ" value={name} onChange={(e) => onChangeName(e.target.value)}></input>
                </Box>
            </Box>
        </Box>
    )
}

function TextBox({ className, name, value, onChange }) {
    let onKey = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;

            const newValue =
                value.substring(0, start) +
                "\t" +
                value.substring(end);

            onChange(newValue);

            requestAnimationFrame(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 1;
            });
        }
    }
    return (
        <Box variant="col" className={`${className} p-0`}  >
            <Title variant="secondary" >{name}</Title>
            <textarea className=" w-full h-full  whitespace-nowrap" value={value || ""} onChange={(e) => { onChange(e.target.value) }} placeholder={`กรุณากรอก ${name}`} onKeyDown={onKey}></textarea>
        </Box>
    )
}

function BtnAddImage({ className, onChange }) {
    return (
        <Box className={className}>
            <label className="hover:cursor-pointer hover:scale-95 duration-300" htmlFor="car-images">เพิ่มรูป</label>
            <input id="car-images" type="file" accept="image/*" hidden onChange={(e) => onChange(e.target.files)} multiple />
        </Box>
    )
}

function FormCar({ allBrand, name, description, thumbnail, brandId, offer, images, onClose, onSave, onChangeThumbnail, onChangeName, onChangeDay, onChangePrice, onAddOffer, onDeleteOffer, onChangeBrand, onChangeDescription, onAddImages, onDeleteImage, onDragStart, onDragOver, onDragLeave, onDrop }) {
    let LeftSession = Box
    let RigthSession = Box
    let BottmSession = Box
    let FormCar = Box
    let OfferSession = Box
    return (
        <FormCar className={" flex flex-col md:grid  md:grid-rows-1 md:grid-cols-2 bg-gray-900 gap-8 p-8 md:p-16 min-w-[80vw] min-h-[60vh] max-h-[95vh] max-w-[95vw] md:max-h-[90vh] md:max-w-[1070px]  overflow-auto  rounded-2xl "}>

            <LeftSession className={" flex flex-col  md:grid md:grid-cols-2 md:grid-rows-12"} >
                <EditImage className={"col-span-full row-span-6 "} img={thumbnail} onChange={onChangeThumbnail} name={name} onChangeName={onChangeName} onChangeBrand={onChangeBrand} allBrand={allBrand} brandId={brandId} />
                <TextBox className={"col-span-full row-span-6 "} name={"รายละเอียด"} value={description} onChange={onChangeDescription} />
            </LeftSession>

            <RigthSession className=" grid grid-cols-1 grid-rows-12 gap-8 ">
                <Box variant="row-between" >
                    <Title variant="secondary" >รูปทั้งหมด</Title>
                    <BtnAddImage onChange={onAddImages} />
                </Box>
                <AllImage imgs={images} onDeleteImage={onDeleteImage} onDragStart={onDragStart} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} />
                <OfferSession className={"col-span-full row-span-5 content-start grid grid-cols-6 h-full gap-4"}>
                    <Box variant={"row-between"} className={"col-span-full"} >
                        <Title variant="secondary"  >โปรโมชั่น</Title>
                        <Btn variant="primary" size="smaill" onClick={onAddOffer}>เพิ่ม</Btn>
                    </Box>
                    <Box className={"col-span-full grid grid-cols-1 overflow-y-scroll min-h-full"}>
                        {offer.length === 0
                            ? <Box variant={"row"} className={" p-8 text-gray-300 h-full text-center justify-center"}>ยังไม่มีราคา</Box>
                            : offer?.map(({ id, offerPrice, offerAmountDay }, offerIndex) =>
                                <Box className="md:mx-4 h-fit " variant="row-between" key={`offer-${offerIndex}-${id}`}>
                                    <InputText name="วัน" value={offerAmountDay} onChange={(day) => onChangeDay(offerIndex, day)} >วัน</InputText>
                                    <InputText name="ราคา" value={offerPrice} onChange={(price) => onChangePrice(offerIndex, price)} >ราคา</InputText>
                                    <Btn variant="danger" onClick={() => onDeleteOffer(offerIndex)}>ลบ</Btn>
                                </Box>
                            )}
                    </Box>
                </OfferSession >
            </RigthSession>

            <OfferForm />

            <BottmSession variant={"row"} className={"col-span-2  justify-center fixed bottom-10  left-0 w-full md:static z-50"}>
                <Btn variant="primary" onClick={onSave}>บันทึก</Btn>
                <Btn variant="primary" onClick={onClose} >ยกเลิก</Btn>
            </BottmSession>

        </FormCar>
    )
};

let FormEditCar = FormCar
export { FormEditCar, InputText }

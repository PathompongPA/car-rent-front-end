import Box from "./Box.component";
import Btn from "./btn.component";
import Title from "./title.component";

function FormBrand({ title, name, img, onChangeImage, onChangeName, onCancel, onSave }) {
    return (
        <div className=" bg-gray-900 p-10 rounded-xl gap-2 flex flex-col justify-center items-center select-none ">
            <Title variant="secondary">{title}</Title>
            <input className="text-center bg-gray-900/80  " type="text" value={name || ""} onChange={(e) => onChangeName(e.target.value)} />
            <div className=" relative w-[200px] aspect-square rounded-lg group ">
                <label className=" rounded-lg  text-gray-200 duration-300 bg-gray-900/50 hover:bg-gray-900/90 group-hover:cursor-pointer  absolute w-full  justify-center h-full flex items-center" htmlFor="brandImage">คลิกเพื่อแก้ไข</label>
                <input type="file" id="brandImage" onChange={e => onChangeImage(e.target.files[0])} hidden />
                <img className=" object-cover w-full h-full" src={img} alt={name} />
            </div>
            <Box variant={"row-between"}>
                <Btn variant={"primary"} onClick={onSave}>บันทึก</Btn>
                <Btn variant={"primary"} onClick={onCancel}>ยกเลิก</Btn>
            </Box>
        </div>
    )
};
let FormEditBrand = FormBrand
let FormCreateBrand = FormBrand

export { FormBrand, FormEditBrand, FormCreateBrand }

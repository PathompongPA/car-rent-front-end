import { useLoaderData } from "react-router";
import { useFormCreateCar } from "../hook";
import Box from "./Box.component";
import Btn from "./btn.component";
import TextInput from "./input.component";
import Modal from "./modal.component";
import Selector from "./selector.component";
import Title from "./title.component";

export default function FormCreateCar({ onClose, sendAlert }) {
    const { AllBrand } = useLoaderData()
    const { state, event } = useFormCreateCar(onClose, sendAlert)
    const { name, brandId } = state;
    let options = AllBrand?.data?.map(({ id, brandName }) => <option value={id} key={id}>{brandName}</option>)
    return (
        <Modal onClose={onClose} >
            <Box variant={"col"} className={"bg-gray-900 p-8 rounded-lg justify-center items-center gap-4"}>
                <Title>เพิ่มรถใหม่</Title>
                <Box className={"relative aspect-4/3 w-[500px] rounded-lg border border-gray-800 overflow-hidden"}>
                    <Box className={"absolute w-full h-full top-0 left-0 justify-center items-center"}>
                        <label htmlFor="carThumbnail" className=" z-10 cursor-pointer hover:bg-gray-800/40 duration-300 text-gray-400 hover:text-white w-full h-full flex justify-center items-center ">คลิกเพื่อเพิ่มรูปปก</label>
                        {state.thumbnail &&
                            <img src={URL.createObjectURL(state?.thumbnail)} alt="" className=" absolute w-full h-full z-0 brightness-80  " />
                        }
                        <input type="file" name="" id="carThumbnail" hidden onChange={(e) => event.thumbnail.change(e.target.files[0])} />
                    </Box>
                    <Box variant={"row-between"} className={" absolute h-fit bottom-0 right-0 p-4 z-20"}>
                        <select className="*:bg-gray-900 border p-2 rounded-lg border-gray-800 " onChange={(e) => event.brandId.change(e.target.value)} value={brandId} >
                            <option value="">กรุณาเลือกยี่ห้อ</option>
                            {options}
                        </select>
                        <TextInput value={name} onChange={event.name.change} className="text-end" >ชื่อรถ</TextInput>
                    </Box>
                </Box>
                <Box variant={"row-between"}  >
                    <Btn onClick={event.save}>บันทึก</Btn>
                    <Btn onClick={onClose}>ยกเลิก</Btn>
                </Box>
            </Box>
        </Modal >
    )
};

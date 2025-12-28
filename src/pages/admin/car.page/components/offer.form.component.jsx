import { useState } from "react";
import Box from "./Box.component";
import Modal from "./modal.component";
import Btn from "./btn.component";
import { InputText } from "./form.car.component";
const useFormOffer = () => {
    const [day, setDay] = useState(null)
    const [price, setPrice] = useState(null)
    const event = {
        changeDay: (day) => { setDay(day) },
        changePrice: (price) => { setPrice(price) }
    }
    let offer = {
        "offerAmountDay": day,
        "offerPrice": price
    }
    return { day, price, event, offer }
}

export default function OfferForm({ isShow, offerAmountDay, offerPrice, onSubmit, onCancel }) {
    const { offer, day, price, event } = useFormOffer(offerAmountDay, offerPrice);
    return isShow && (
        <Modal>
            <Box variant={"col"} className={"bg-gray-900 p-4 rounded-lg"}>
                <InputText name="จำนวน" value={day} onChange={(e) => { event.changeDay(e.target.value) }} >จำนวนวัน</InputText>
                <InputText name="ราคา" value={price} onChange={(e) => { event.changePrice(e.target.value) }} >ราคา</InputText>
                <Box>
                    <Btn onClick={() => onSubmit(offer)}>บันทึก</Btn>
                    <Btn onClick={onCancel} >ยกเลิก</Btn>
                </Box>
            </Box>
        </Modal>
    )

};

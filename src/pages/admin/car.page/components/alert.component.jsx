import Box from "./Box.component";
import Btn from "./btn.component";
import Modal from "./modal.component";
import Title from "./title.component";

export default function Alert({ msg, onClose }) {
    return msg &&
        <Modal >
            <Box variant={"col"} className={"justify-center items-center bg-gray-900 p-8 rounded-lg gap-12 "}>
                <Title>แจ้งเตือน</Title>
                <Box> {msg} </Box>
                <Btn variant={"primary"} onClick={onClose}>รับทราบ</Btn>
            </Box>
        </Modal>


};

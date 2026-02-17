import { Box, Btn, Modal, Title } from "../../pages/admin/car.page/components";

export default function Alert({ children, onClose }) {
    return children &&
        <Modal >
            <Box variant={"col"} className={"justify-center items-center bg-gray-900  rounded-lg gap-12 "}>
                <Title className={"select-none"}>แจ้งเตือน</Title>
                <Title variant={"third"}>{children}</Title>
                <Btn variant={"primary"} onClick={onClose}>รับทราบ</Btn>
            </Box>
        </Modal>


};
import Modal from "./modal.component";
import Title from "./title.component";

export default function Loading({ isLoading }) {

    return isLoading &&
        <Modal className="z-50" >
            <Title variant={"secondary"} className={"animate-bounce"}>
                loading . . .
            </Title>
        </Modal>

};

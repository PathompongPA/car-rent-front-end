import { useState } from "react";

export default function useCarPageUi() {
    const [isShowModal, setIsShowModal] = useState(false)
    let uiEvent = {
        closeModal: () => setIsShowModal(false),
        openModal: () => setIsShowModal(true)
    }
    return {
        isShowModal,
        uiEvent
    }
};

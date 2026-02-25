import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

let defaultState = {
    stepBooking: {
        th: {
            title: "ขั้นตอนการจอง",
            card: [
                {
                    subTitle: "ขั้นตอนการจอง",
                    list: [
                        "เลือกรถรุ่นที่คุณสนใจ",
                        "ระบุวันที่ต้องการใข้งาน",
                        "โลเคชั่นที่ต้องการจัดส่ง",
                        "โอนมัดจำจองรถ",
                        "รับรถพร้อม ชำระค่าเช่าและเงินมัดจำเต็มจำนวน",
                    ]
                },
                {
                    subTitle: "เอกสารที่ต้องใช้",
                    list: [
                        "บัตรประชาชน",
                        "ใบขับขี่",
                        "ใบขับขี่สากล (ต่างชาติ)",
                    ]
                },
                {
                    subTitle: "ช่องทางการชำระเงิน",
                    list: [
                        "สแกน QR",
                        "โอนบัญชีธนาคาร",
                        "เงินสด",
                    ]
                },
            ]
        },
        en: {
            title: "How to book",
            card: [
                {
                    subTitle: "Booking step",
                    list: []
                },
                {
                    subTitle: "Document",
                    list: []
                },
                {
                    subTitle: "Payment",
                    list: []
                },
            ]
        }
    }
}
export default function useFormBookingStep(onUpdate) {
    const loader = useLoaderData();
    const { i18n } = useTranslation();

    const [stepBooking, setStepBooking] = useState(loader?.contents?.stepBooking || defaultState.stepBooking)

    useEffect(() => {
        onUpdate(stepBooking)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepBooking, loader])

    return {
        ui: {
            title: stepBooking[i18n.language].title,
            card: stepBooking[i18n.language].card,
        },
        on: {
            click: {
                detailCard: {
                    add: (indexCard) => {
                        setStepBooking((state) => {
                            let newState = { ...state }
                            newState[i18n.language].card[indexCard].list.push("")
                            return newState
                        })
                    },
                    delete: (indexCard, indexDetail) => {
                        setStepBooking((state) => {
                            let newState = { ...state }
                            newState[i18n.language].card[indexCard].list.splice(indexDetail, 1)
                            return newState
                        })
                    },
                },
            },
            change: {
                title: (newValue) => {
                    setStepBooking((state) => {
                        let newState = { ...state }
                        newState[i18n.language].title = newValue
                        return newState
                    })
                },
                subTitle: (indexCard, newValue) => {
                    setStepBooking((state) => {
                        let newState = { ...state }
                        newState[i18n.language].card[indexCard].subTitle = newValue
                        return newState
                    })
                },
                detailCard: (indexCard, indexDetail, newValue) => {
                    setStepBooking((state) => {
                        let newState = { ...state }
                        newState[i18n.language].card[indexCard].list[indexDetail] = newValue
                        return newState
                    })

                }
            }
        }
    }
};

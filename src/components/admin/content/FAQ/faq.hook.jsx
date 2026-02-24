import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

let defaultValue = {
    th: {
        title: "คำถามที่พบบ่อย", value: [
            { q: "เอกสารที่ต้องใช้มีอะไรบ้าง", a: "บัตรประชาชน ใบขับขี่ ใบขับขี่สากล หรือพาสปอร์ต (สำหรับชาวต่างชาติ)" },
            { q: "จุดรับส่งรถอยู่ที่ไหน", a: "ลูกค้าสามารถเลือกจุดรับ-คืนรถได้ เช่น บ้าน คอนโด สนามบิน โรงแรม (ทั้งในกรุงเทพฯ และต่างจังหวัด)  หมายเหตุ : อาจมีค่าบริการเพิ่มเติม ขึ้นอยู่กับระยะทาง" },
            { q: "มีจำจัดระยะทางไหม", a: "ไม่มีจำกัดระยะทางครับ" },
            { q: "ขับออกต่างจังหวัดได้ไหม", a: "ขับออกต่างจังหวัดได้ ไม่มีบวกเพิ่มครับ" },
            { q: "มีบริการรับส่งไหม", a: "มีบริการรับส่งถึงที่ครับ" },
            { q: "ต้องการใช้รถด่วน ส่งได้เร็วสุด", a: "ภายใน 2-3 ชม.ครับ" },
            { q: "เงินมัดจำเท่าไหร่", a: "เงินมัดจำ 10,000 บาท คุณลูกค้าจะได้รับคืนทันทีวันรับรถครับ" },
            { q: "เช่าขั้นต่ำกี่วัน", a: "1 วันก็สามารถเช่าได้ครับ" },
            { q: "ถ้าเกิดอุบัติเหตุระหว่างการเช่าจะเป็นอย่างไร", a: "รถทุกคันมีประกันภัย กรณี ไม่ใช่ความผิดของผู้เช่า: ไม่ต้องจ่ายค่าเสียหาย กรณี ผู้เช่าเป็นฝ่ายผิด หรือไม่มีคู่กรณี  Premium car: 3,000 บาท/จุด Supercar: 10,000 บาท/จุด" },
            { q: "ต้องรถล้างคืนไหม", a: "ไม่ต้องล้างคืนครับ" },
            { q: "กรณีอยากเช่าวันเพิ่ม", a: "สามารถจ้างล่วงหน้าอย่างน้อย 24 ชม. หรือ 1 วัน" },
            { q: "หากใช้รถเกินเวลา มีค่าปรับเท่าไหร่", a: "ชั่วโมงละ 500 บาท ชั่วโมงที่ 2 นับ 1 วันครับ" },
            { q: "เช่าแบบหลายวันมีส่วนลดไหม", a: "มีครับ ดูตารางโปรชั่นได้เลยครับ ยิ่งเช่าจะได้รับส่วนลดเพิ่ม" },
            { q: "สนใจเป็นพาร์ทเนอร์กับทางร้าน", a: "LINE : @CARRENT88 จะมีเจ้าหน้าให้ข้อมูลครับ" },
        ]
    },
    en: {
        title: 'FAQ ?', value: [
            { q: "", a: "" }
        ]
    }
}

export default function useFormQuestion(onUpdate) {
    const { contents } = useLoaderData();
    const { i18n } = useTranslation();
    const [faq, setFaq] = useState(contents?.faq || defaultValue)
    let lang = i18n.language

    useEffect(() => {
        onUpdate(faq)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faq])

    return {
        ui: {
        },
        state: {
            title: faq[lang]?.title,
            value: faq[lang]?.value
        },
        on: {
            click: {
                btn: {
                    create: () => {
                        setFaq((state) => {
                            let newState = { ...state }
                            newState[lang].value.push({ q: "", a: "" })
                            return newState
                        })
                    },
                    delete: (index) => {
                        setFaq((state) => {
                            let newState = { ...state }
                            newState[lang].value.splice(index, 1)
                            return newState
                        })
                    }
                }
            },
            change: {
                title: (newValue) => {
                    setFaq((state) => {
                        let newState = { ...state }
                        newState[lang].title = newValue
                        return newState
                    })
                },
                q: (index, newValue) => {
                    setFaq((state) => {
                        let newState = { ...state }
                        newState[lang].value[index].q = newValue
                        return newState
                    })
                },
                a: (index, newValue) => {
                    setFaq((state) => {
                        let newState = { ...state }
                        newState[lang].value[index].a = newValue
                        return newState
                    })
                }
            }


        }
    }
};

import { useState } from "react"
import { fetchApi } from "../../../../utility"

export default function useFormCreateCar(close, sendAlert) {
    const [name, setName] = useState()
    const [brandId, setBrandId] = useState()
    const [thumbnail, setThumbnail] = useState()

    let state = {
        name,
        brandId,
        thumbnail
    }

    let event = {
        thumbnail: {
            change: (file) => { setThumbnail(file) }
        },
        name: {
            change: (name) => setName(name)
        },
        brandId: {
            change: (brandId) => {
                console.log(brandId);
                setBrandId(brandId)
            }
        },
        save: async () => {
            if (!name) return sendAlert("กรุณา กรอกชื่อ")
            if (!brandId) return sendAlert("กรุณา เลือกแบรน์")
            if (!thumbnail) return sendAlert("กรุณา กรอกรูป")
            let form = new FormData()
            form.append("carName", name)
            form.append("brandId", brandId)
            form.append("carThumbnail", thumbnail)
            const { isSuccess, msg } = await fetchApi("POST", "/api/car", form, {})
            if (msg?.errors[0].type === "unique violation") sendAlert(`ชื่อ ${name} ถูกใช้แล้ว`)
            if (isSuccess) close();
        }
    }
    return {
        state,
        event
    }
};

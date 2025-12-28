import { useEffect, useRef, useState } from "react";
import { useRevalidator } from "react-router";
import { fetchApi } from "../../../../utility";
const changePositionArray = (array, from, to) => {
    const [moved] = array.splice(from, 1);
    array.splice(to, 0, moved);
    return array
}
function mapIndex(array) {
    return array.map((item, index) => ({ id: item.id, index }))
}

export default function useBrand(Brand) {
    let toPosition = useRef()
    let fromPosition = useRef()
    let repage = useRevalidator()

    const [brands, setBrands] = useState(null)
    const [brandEditing, setBrandEditing] = useState(null)
    const [editPosition, setEditPosition] = useState(null)
    const [newBrand, setNewBrand] = useState(null)
    const [isReOder, setIsReOder] = useState(false)
    const [isEditBrand, setIsEditBrand] = useState(false)
    const [isCreateBrand, setIsCreateBrand] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)


    useEffect(() => { setBrands(Brand.data) }, [Brand.data])

    let brandEvent = {
        updateOrder: async () => {
            const { isSuccess } = await fetchApi("PUT", "/api/car/brand/index", JSON.stringify({ payload: mapIndex(brands) }))
            isSuccess && setIsReOder(false) & repage.revalidate()
        },
        cancelOrder: () => { setIsReOder(false); setBrands(Brand.data); setIsEditBrand(false) },

        updateBrand: async () => {
            let data = new FormData()
            data.append("id", brands[editPosition].id)
            data.append("brandName", brands[editPosition].brandName)
            const { isSuccess, msg } = await fetchApi("PUT", "/api/car/brand", data, {})
            if (!isSuccess) {
                let error = msg
                switch (msg) {
                    case "Validation error":
                        error = `ชื่อ ${brands[editPosition].brandName} ถูกใช้แล้ว, กรุณณากรอกใหม่`
                        break;
                }
                setErrorMsg(error)
            } else {
                repage.revalidate(); setIsEditBrand(false)
            }
        },
        changeName: (name) => setBrands((state) => {
            let newState = [...state]
            newState[editPosition].brandName = name
            return newState
        }
        ),
        changeImage: async (image) => {
            let data = new FormData()
            data.append("id", brands[editPosition].id)
            data.append("brandImg", image)
            const { isSuccess } = await fetchApi("PUT", "/api/car/brand", data, {})
            if (isSuccess) repage.revalidate()
        }
        ,
        editBrand: (index) => { setIsEditBrand(true); setEditPosition(index) },
        clearBrandEditing: () => { setIsEditBrand(false); setBrandEditing(null); setEditPosition(null) },

        saveNewBrand: async () => {
            let data = new FormData()
            if (!newBrand.file) return setErrorMsg("กรุณาเลือกรูป")
            if (!newBrand.brandName) return setErrorMsg("กรุณา กรอกชื่อแบรนด์")
            data.append("brandName", newBrand.brandName)
            data.append("brandImg", newBrand.file)
            const { isSuccess, msg } = await fetchApi("POST", "/api/car/brand", data, {})
            if (!isSuccess) {
                let error = msg
                switch (msg) {
                    case "Validation error":
                        error = `ชื่อ ${brands[editPosition].brandName} ถูกใช้แล้ว, กรุณณากรอกใหม่`
                        break;
                }
                setErrorMsg(error)
            }
            if (isSuccess) repage.revalidate(); setIsCreateBrand(false)
        },
        createBrand: () => { setIsCreateBrand(true); setNewBrand({ brandName: null, brandImg: null }) },
        changeNameCreate: (name) => setNewBrand((state) => ({ ...state, brandName: name.trimStart() })),
        changeImageCreate: (image) => setNewBrand((state) => ({ ...state, brandImg: URL.createObjectURL(image), file: image })),
        clearNewBrand: () => { setIsCreateBrand(false); setNewBrand(null) },

        setEditPosition,
        clearErrorMsg: () => { setErrorMsg(null) },

        drag: {
            start: (index, e) => {
                setIsReOder(true)
                fromPosition.current = index;
                e.target.classList.add("brightness-50");
            },
            over: (index, e) => {
                e.target.classList.add("brightness-50");
                e.target.classList.add("scale-90");
                toPosition.current = index
            },
            leave: (e) => {
                e.target.classList.remove("brightness-50");
                e.target.classList.remove("scale-90");
            },
            drop: (e) => {
                e.target.classList.remove("brightness-50");
                setBrands(state => changePositionArray([...state], fromPosition.current, toPosition.current))
            },
        }
    }
    return {
        brands,
        newBrand,
        brandEditing,
        brandEvent,
        editPosition,
        isReOder,
        isEditBrand,
        isCreateBrand,
        errorMsg
    }
};

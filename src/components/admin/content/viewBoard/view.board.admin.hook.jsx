import { useEffect, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router";
import { fetchApi } from "../../../../utility";

export default function useViewBoard() {
    const loader = useLoaderData();
    const revalidator = useRevalidator();
    const [image, setImage] = useState(null)
    const [images, setImages] = useState([])
    useEffect(() => {
        setImages(loader.viewBoards)
        setImage(loader.viewBoards[0])
    }, [loader])

    return {
        ui: {
            image,
            images
        },
        on: {
            change: {
                input: async (file) => {
                    let form = new FormData()
                    Array.from(file).map(item => form.append("viewBoard", item))
                    let { isSuccess } = await fetchApi("POST", "/api/content/view-board", form, {})
                    isSuccess && revalidator.revalidate()
                }
            },
            click: {
                select: (indexImage) => {
                    setImage(images[indexImage])
                },
                delete: async (indexImage) => {

                    let body = JSON.stringify({ id: images[indexImage].split("/").at(-1) })
                    let { isSuccess } = await fetchApi("DELETE", "/api/content/view-board", body)
                    isSuccess && revalidator.revalidate()
                    // fetch  to delete
                }
            }
        }
    }

};

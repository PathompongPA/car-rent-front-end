import Box from "./Box.component";
import Btn from "./btn.component";

function CardImage({ img, onDragStart, onDragOver, onDragLeave, onDrop, onDeleteImage }) {
    return (
        <Box
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragOver={(e) => { e.preventDefault(); onDragOver(e) }}
            onDragLeave={(e) => onDragLeave(e)}
            onDrop={(e) => onDrop(e)}
            className={" w-full h-fit relative hover:cursor-pointer "}
        >
            <Btn variant={"danger"} onClick={onDeleteImage} className=" p-1 absolute text-xs  right-1 top-1 z-50">ลบ</Btn>
            <img
                className=" rounded-lg aspect-video object-contain bg-gray-800 "
                src={img}
                alt="" />
        </Box>
    )

}
export default function AllImage({ imgs, onDeleteImage, onDragStart, onDragOver, onDragLeave, onDrop }) {
    return (
        <Box className={"row-span-7 grid grid-cols-2 xl:grid-cols-3  overflow-auto w-full xl:p-4 gap-2 border-gray-800 rounded-lg border "}>
            {
                imgs?.length === 0
                    ? <Box className={"flex justify-center w-full col-span-full items-center "}>ยังไม่มีรูป </Box>
                    : imgs?.map((img, index) =>
                        <CardImage
                            img={img}
                            onDeleteImage={() => onDeleteImage(index)}
                            onDragStart={(e) => onDragStart(index, e)}
                            onDragOver={(e) => onDragOver(index, e)}
                            onDragLeave={(e) => onDragLeave(e)}
                            onDrop={(e) => onDrop(e)}
                            key={index}
                        />)}
        </Box>
    )
};

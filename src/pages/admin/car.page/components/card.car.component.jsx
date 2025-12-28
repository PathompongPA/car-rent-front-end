import Box from "./Box.component";
import Btn from "./btn.component";
import Title from "./title.component";

export default function CardCar({ img, name, brand, isShow, onClick, onDragStart, onDragOver, onDragLeave, onDrop, onToggleHide }) {
    return (
        <div
            className="aspect-3/2 relative hover:cursor-pointer  duration-300 rounded-lg overflow-hidden bg-gray-800 group hover:scale-99"
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <img className={`w-full h-full object-cover select-none  duration-300 ${isShow ? " brightness-10 hover:brightness-10 " : " brightness-80 hover:brightness-100 "} `} src={img} alt={`image-${name}`} onClick={onClick} />
            <Box className={"absolute bottom-0 w-full text-end p-4 flex justify-end"}>
                <Title variant="secondary" className={"truncate"} >{brand}</Title>
                <Title variant="secondary" className={""} >{name}</Title>
            </Box>
            <Btn variant="glass" className={`${isShow ? "fa-eye-slash" : "fa-eye"} fa-solid absolute top-1 right-1 hover:cursor-pointer hover:scale-95 duration-300 z-40`} onClick={onToggleHide} />
        </div>
    )

};

export default function CardBrand({ name, img, isActive, onOpenEdit, onDragStart, onDragOver, onDragLeave, onDrop }) {
    return (
        <div
            className={`select-none flex rounded-lg aspect-square relative bg-gray-800 hover:cursor-pointer hover:bg-gray-800/50 hover:scale-95 duration-300 ${isActive && " brightness-20 "}`}
            draggable
            onClick={onOpenEdit}
            onDragStart={(e) => onDragStart(e)}
            onDragOver={(e) => onDragOver(e)}
            onDragLeave={(e) => onDragLeave(e)}
            onDrop={(e) => onDrop(e)}

        >
            <div className=" absolute bottom-2 w-full text-center ">{name}</div>
            <img className=" object-contain p-2" src={img} alt=""
            />
        </div>
    )
};

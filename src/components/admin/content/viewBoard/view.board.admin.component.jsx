export default function ViewBoard({ viewBoards, viewBoardFocus, onAddViewBoard, onRemoveViewBoard, onSetToImageFocus, onSend }) {
    let AllImage = ({ children }) => <div className=" grid grid-cols-12 py-4 md:p-4   gap-4 w-full h-[150px] "> {children} </div>
    let SingleImage = ({ children, image, scale, onClick = () => { } }) =>
        <div className={` relative  ${scale} hover:cursor-pointer `} onClick={() => onClick(image)}>
            <img className=" w-full h-full object-cover snap-center bg-gray-800  " src={image} />
            {children}
        </div>
    let BtnDeleteImage = ({ position }) => <button className="  px-3 rounded-xl bg-red-800 absolute right-1 top-1 cursor-pointer  hover:bg-red-700 font-black active:scale-90 duration-150" type="button" onClick={() => { onRemoveViewBoard(position) }} >x</button>
    let BtnAddImage = () =>
        <div className=" col-span-4 md:col-span-2  rounded-xl bg-gray-800 hover:bg-gray-700 m-2  duration-150 active:scale-95 ">
            <label className=" text-center cursor-pointer border-gray-800 rounded-lg h-full flex flex-col justify-center items-center " htmlFor="view-board-image" >
                <h1> คลิกเพื่อเพิ่มรูป </h1> <h1 className=" text-gray-400 text-xs"> * ภาพควรเป็น 16:9 </h1>
            </label>
            <input type="file" name="viewBoard" id="view-board-image" hidden onChange={() => { onAddViewBoard(); onSend() }} multiple accept="image/*" />
        </div>

    return (
        <div className=" col-span-2 px-4 ">
            <SingleImage image={viewBoardFocus} scale={"aspect-21/9"} />
            <AllImage>
                <BtnAddImage />
                <div className=" col-span-8 md:col-span-10 flex gap-4 overflow-x-auto py-4">
                    {viewBoards?.map((image, indexImage) =>
                        <SingleImage image={image} onClick={onSetToImageFocus} key={indexImage} scale={"aspect-16/9"} >
                            <BtnDeleteImage position={indexImage} />
                        </SingleImage>
                    )}
                </div>
            </AllImage>
        </div>
    )
}
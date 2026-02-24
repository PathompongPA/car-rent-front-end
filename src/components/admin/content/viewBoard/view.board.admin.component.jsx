import useViewBoard from "./view.board.admin.hook";

export default function ViewBoard() {
    const { ui, on } = useViewBoard();
    let SingleImage = ({ children, image, scale, onClick = () => { } }) =>
        <div className={` relative  ${scale} hover:cursor-pointer `} onClick={() => onClick(image)}>
            <img className=" w-full h-full object-cover snap-center bg-gray-800  " src={image} />
            {children}
        </div>

    return (
        <div className=" col-span-2 p-4 flex flex-col gap-2 bg-bg-4/50 rounded-lg ">
            <SingleImage image={ui.image} scale={"aspect-21/9"} />
            <div className=" grid grid-cols-12 gap-2 w-full h-[150px] ">
                <div className="  col-span-4 md:col-span-2  rounded-xl bg-gray-800 hover:bg-gray-700 m-2  duration-150 active:scale-95 ">
                    <label className=" text-center cursor-pointer rounded-lg h-full flex flex-col justify-center items-center " htmlFor="view-board-image" >
                        <h1> คลิกเพื่อเพิ่มรูป </h1>
                    </label>
                    <input type="file" name="viewBoard" id="view-board-image" hidden onChange={(e) => { on.change.input(e.target.files) }} multiple accept="image/*" />
                </div>
                <div className=" col-span-8 md:col-span-10 flex gap-4 overflow-x-auto py-4">
                    {ui.images?.map((image, indexImage) =>
                        <SingleImage image={image} onClick={() => { on.click.select(indexImage) }} key={indexImage} scale={"aspect-16/9"} >
                            <button className="  px-3 rounded-xl bg-red-800 absolute right-1 top-1 cursor-pointer  hover:bg-red-700 font-black active:scale-90 duration-150" type="button" onClick={() => { on.click.delete(indexImage) }} >x</button>
                        </SingleImage>
                    )}
                </div>
            </div>
        </div>
    )
}
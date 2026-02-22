export default function Notification({ isShow, msg, onCloseNotification }) {
    return (
        isShow &&
        <div className=" fixed  top-0 left-0  w-full h-full bg-black/50 z-50 flex justify-center items-center backdrop-blur-xs delay-300" >
            <div className=" w-[60vw] aspect-square md:max-w-[30vw] xl:max-w-[15vw]  bg-gray-800 flex flex-col justify-around items-center rounded-2xl gap-10 p-8 pb-4 ">
                <h1 className=" text-gray-400 font-black">ข้อความ</h1>
                <h1 className=" text-xl">{msg}</h1>
                <button className=" text-white p-4 py-2 bg-gray-700 rounded-lg  hover:cursor-pointer hover:text-golden-1 hover:bg-gray-600 active:bg-gray-900 active:text-golden-1 active:scale-90 duration-150 " type="button" onClick={onCloseNotification}>รับทราบ</button>
            </div>
        </div>
    )
}
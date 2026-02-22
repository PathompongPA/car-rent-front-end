export default function Loading({ isLoading }) {
    return (
        isLoading &&
        <div className=" fixed  top-0 left-0  w-full h-full bg-black/50 z-[99] flex justify-center items-center backdrop-blur-xs" >
            <div className=" w-[20vh]  aspect-16/9 flex flex-col  justify-around items-center rounded-2xl gap-10 p-8 pb-4 ">
                <h1 className={`flex animate-bounce [animation-duration:.5s] `}>loading . . .</h1>
            </div>
        </div>
    )
}
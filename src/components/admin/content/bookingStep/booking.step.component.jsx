import useFormBookingStep from "./booking.step.hook";

export default function FormBookingStep({ onUpdate }) {
    const { ui, on } = useFormBookingStep(onUpdate);
    return (
        <div className=" col-span-full grid grid-cols-3 grid-rows-12 gap-4 gap-y-2 md:border p-4 rounded-lg border-gray-800 ">
            <input className=" col-span-full md:col-start-2 row-span-2 md:col-span-1 h-full text-center text-4xl" type="text" value={ui.title} onChange={(e) => on.change.title(e.target.value)} />
            {ui?.card?.map((card, indexCard) =>
                <div className=" border p-4 col-span-full row-span-11  md:col-span-1 md:row-start-3 flex flex-col w-full h-full py-8 gap-4 min-h-[20vh] md:gap-4 md:p-4 justify-start items-center md:border border-gray-800 rounded-lg" key={indexCard}  >
                    <div className="grid grid-cols-12 grid-rows-1 w-full gap-4 ">
                        <input className=" col-span-10 text-xl text-center" type="text" placeholder="หัวข้อ" value={card.subTitle} onChange={(e) => on.change.subTitle(indexCard, e.target.value)} />
                        <button className=" col-span-2 w-full cursor-pointer hover:text-golden-1  bg-gray-800 p-2 rounded-lg" type="button" onClick={() => on.click.detailCard.add(indexCard)}>เพิ่ม</button>
                    </div>

                    <div className=" w-full flex flex-col gap-2">
                        {card?.list?.map((text, indexDetail) =>
                            < div className=" w-full grid grid-cols-12 items-center  gap-4 " key={indexDetail} >
                                <div className="text-center"> - </div>
                                <input className=" col-span-9" type="text" value={text} placeholder="รายละเอียด" onChange={(e) => on.change.detailCard(indexCard, indexDetail, e.target.value)} />
                                < button className=" col-span-2 w-full h-full  bg-red-800 cursor-pointer hover:text-golden-1 text-xs rounded-lg" type="button" onClick={(e) => { e.preventDefault(); on.click.detailCard.delete(indexCard, indexDetail) }}> ลบ</ button >
                            </div >)}
                    </div>
                </div>
            )}
        </div>
    )
}
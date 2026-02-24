import { cva } from "class-variance-authority";
import useFormBookingStep from "./booking.step.hook";

let style = {
    box: cva(" bg-bg-3/50 col-span-full grid grid-cols-3 grid-rows-12 gap-4 gap-y-2 md:border p-4 rounded-lg border-gray-800 "),
    title: cva(" bg-bg-4/50 col-span-full md:col-start-2 row-span-2 md:col-span-1 h-full text-center text-4xl"),
    card: {
        box: cva(" bg-bg-4/50  border p-4 col-span-full row-span-11  md:col-span-1 md:row-start-3 flex flex-col w-full h-full py-8 gap-4 min-h-[20vh] md:gap-4 md:p-4 justify-start items-center md:border border-gray-800 rounded-lg"),
        bar: {
            box: cva(" w-full gap-4 px-2 "),
            title: cva(" bg-bg-2/50 col-span-9 text-xl text-center"),
        },
        btnCreateDetaill: cva(" col-span-3 w-full cursor-pointer hover:text-golden-1  bg-gray-800 px-4 p-2 rounded-lg"),
        detail: {
            box: cva("  w-full flex flex-col gap-2 "),
            card: {
                box: cva("  w-full grid grid-cols-12 items-center  gap-2 "),
                text: cva(" bg-bg-2/50 col-span-9"),
                btnDeleteDetail: cva(" col-span-2 w-full h-full  bg-red-800 cursor-pointer hover:text-golden-1 text-xs rounded-lg")
            }
        }
    }
}
export default function FormBookingStep({ onUpdate }) {
    const { ui, on } = useFormBookingStep(onUpdate);
    return (
        <div className={style.box()}>
            <input className={style.title()} type="text" value={ui.title} onChange={(e) => on.change.title(e.target.value)} />
            {ui?.card?.map((card, indexCard) =>
                <div className={style.card.box()} key={indexCard}  >
                    <div className={style.card.bar.box()}>
                        <input className={style.card.bar.title()} type="text" placeholder="หัวข้อ" value={card.subTitle} onChange={(e) => on.change.subTitle(indexCard, e.target.value)} />
                    </div>

                    <div className={style.card.detail.box()}>
                        {card?.list?.map((text, indexDetail) =>
                            < div className={style.card.detail.card.box()} key={indexDetail} >
                                - <input className={style.card.detail.card.text()} type="text" value={text} placeholder="รายละเอียด" onChange={(e) => on.change.detailCard(indexCard, indexDetail, e.target.value)} />
                                < button className={style.card.detail.card.btnDeleteDetail()} type="button" onClick={(e) => { e.preventDefault(); on.click.detailCard.delete(indexCard, indexDetail) }}> ลบ</ button >
                            </div >)}
                    </div>
                    <button className={style.card.btnCreateDetaill()} type="button" onClick={() => on.click.detailCard.add(indexCard)}>เพิ่ม</button>
                </div>
            )}
        </div>
    )
}
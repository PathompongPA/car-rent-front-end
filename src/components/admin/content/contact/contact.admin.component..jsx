import { cva } from "class-variance-authority";
import useFormContact from "./contact.admin.hook";

let style = {
    box: cva(" bg-bg-2 col-span-full grid md:grid-cols-3 gap-4 *:not-first:border *:not-first:rounded-lg *:not-first:border-gray-800 md:border rounded-lg border-gray-800 p-4"),
    bar: {
        box: cva("md:col-span-3 grid grid-cols-12 gap-4 "),
        title: cva(" bg-bg-4/50  col-span-9 col-start-2 md:col-span-11 h-fit w-full text-center text-4xl"),
        btnAddCard: cva(" bg-bg-3/50 col-span-2 md:col-span-1 rounded-lg p-1  cursor-pointer hover:text-golden-1 hover:bg-gray-700 active:bg-gray-800"),
    },
    card: {
        box: cva(' bg-bg-4/50 rounded-2xl flex flex-col gap-4 p-4 md:gap-4 md:p-4 justify-start'),
        bar: {
            box: cva("grid grid-cols-12 gap-2"),
            title: cva(" bg-bg-2/50 col-span-10 w-full text-center"),
            btnDeleteCard: cva("col-span-2 text-center bg-red-800 p-2 rounded-lg cursor-pointer hover:text-golden-1 hover:bg-red-900"),
        },
        detail: {
            box: cva("flex flex-col gap-2"),
            card: {
                box: cva("grid grid-cols-12 gap-2 md:items-center *:not-[label,button]:flex-1/2"),
                text: cva(" bg-bg-2/50 col-span-5"),
                link: cva(" bg-bg-2/50 col-span-5"),
                btnDeleteDetail: cva("col-span-2 rounded-lg bg-gray-800 cursor-pointer hover:text-golden-1 p-2")
            },
            btnCreateDetail: cva(" bg-bg-4/50 rounded-lg p-1  cursor-pointer hover:text-golden-1 hover:bg-gray-800 active:bg-gray-800")
        }
    }
}

export default function FormContact({ onUpdate }) {
    const { ui, on } = useFormContact(onUpdate);
    return (
        <div className={style.box()}>
            <div className={style.bar.box()}>
                <input className={style.bar.title()} type="text" placeholder="ชื่อหัวข้อ เช่น ติดต่อเรา ..." value={ui.title || ""} onChange={(e) => on.change.title(e.target.value)} />
                <button className={style.bar.btnAddCard()} type="button" onClick={on.click.addCard} > เพิ่ม </button>
            </div>
            {ui?.card?.map((card, indexCard) => (
                <div className={style.card.box()} key={indexCard}>
                    <div className={style.card.bar.box()}>
                        <input className={style.card.bar.title()} placeholder="ช่องทาง เช่น โทรศัพท์ line facebook" type="text" value={card?.title} onChange={(e) => on.change.titleCard(indexCard, e.target.value)} />
                        <button className={style.card.bar.btnDeleteCard()} type="button" onClick={() => on.click.deleteCard(indexCard)} > ลบ </button>
                    </div>
                    <div className={style.card.detail.box()}>
                        {card?.list?.map((item, indexDetailCardContent) =>
                            <div className={style.card.detail.card.box()} key={indexDetailCardContent}>
                                <input className={style.card.detail.card.text()} placeholder="ข้อความแสดงหน้าเว็บ" type="text" value={item.text} onChange={(e) => on.change.detail.text(indexCard, indexDetailCardContent, e.target.value)} />
                                <input className={style.card.detail.card.link()} placeholder="link เช่น https://..." type="text" value={item.link} onChange={(e) => on.change.detail.link(indexCard, indexDetailCardContent, e.target.value)} />
                                <button className={style.card.detail.card.btnDeleteDetail()} type="button" onClick={() => on.click.deleteDetailCard(indexCard, indexDetailCardContent)} > X </button>
                            </div>
                        )
                        }
                    </div>
                    <button className={style.card.detail.btnCreateDetail()} type="button" onClick={() => on.click.addDetailCard(indexCard)} > เพิ่ม </button>
                </div>
            )
            )}
        </div>
    )
}

import useFormContact from "./contact.admin.hook";

export default function FormContact({ onUpdate }) {
    const { ui, on } = useFormContact(onUpdate);
    return (
        <div className="col-span-full grid md:grid-cols-3 gap-4 *:not-first:border *:not-first:rounded-lg *:not-first:border-gray-800 md:border rounded-lg border-gray-800 p-4">
            <div className="md:col-span-3 grid grid-cols-12 gap-4 px-4">
                <input className="col-span-9 col-start-2 md:col-span-11 h-fit w-full text-center text-4xl" type="text" placeholder="ชื่อหัวข้อ เช่น ติดต่อเรา ..." value={ui.title || ""} onChange={(e) => on.change.title(e.target.value)} />
                <button className="col-span-2 md:col-span-1 rounded-lg p-1 bg-gray-800 cursor-pointer hover:text-golden-1 hover:bg-gray-700 active:bg-gray-800" type="button" onClick={on.click.addCard} > เพิ่ม </button>
            </div>
            {ui?.card?.map((card, indexCard) => (
                <div className="flex flex-col gap-4 p-4 md:gap-4 md:p-4 justify-start" key={indexCard}>
                    <div className="grid grid-cols-12 gap-2">
                        <input className="col-span-10 w-full text-center" placeholder="ช่องทาง เช่น โทรศัพท์ line facebook" type="text" value={card?.title} onChange={(e) => on.change.titleCard(indexCard, e.target.value)} />
                        <button className="col-span-2 text-center bg-red-800 p-2 rounded-lg cursor-pointer hover:text-golden-1 hover:bg-red-900" type="button" onClick={() => on.click.deleteCard(indexCard)} > ลบ </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {card?.list?.map((item, indexDetailCardContent) =>
                            <div className="grid grid-cols-12 gap-2 md:items-center *:not-[label,button]:flex-1/2" key={indexDetailCardContent}>
                                <input className="col-span-5" placeholder="ข้อความแสดงหน้าเว็บ" type="text" value={item.text} onChange={(e) => on.change.detail.text(indexCard, indexDetailCardContent, e.target.value)} />
                                <input className="col-span-5" placeholder="link เช่น https://..." type="text" value={item.link} onChange={(e) => on.change.detail.link(indexCard, indexDetailCardContent, e.target.value)} />
                                <button className="col-span-2 rounded-lg bg-gray-800 cursor-pointer hover:text-golden-1 p-2" type="button" onClick={() => on.click.deleteDetailCard(indexCard, indexDetailCardContent)} > X </button>
                            </div>
                        )
                        }
                    </div>
                    <button className="rounded-lg p-1 bg-gray-800 cursor-pointer hover:text-golden-1 hover:bg-gray-700 active:bg-gray-800" type="button" onClick={() => on.click.addDetailCard(indexCard)} > เพิ่ม </button>
                </div>
            )
            )}
        </div>
    )
}

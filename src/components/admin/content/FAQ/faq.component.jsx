import { cva } from "class-variance-authority";
import useFormQuestion from "./faq.hook";

let style = {
    container: cva(" col-span-full border flex flex-col gap-4 p-4 rounded-lg border-gray-800 min-h-[40vh] w-full bg-bg-2"),
    bar: {
        container: cva("grid grid-cols-12 gap-4 items-center "),
        title: cva(" col-span-9 col-start-2 md:col-span-11 text-center text-4xl bg-bg-4 rounded-2xl"),
        btnCreate: cva(" col-span-2 md:col-span-1 h-full  rounded-lg  hover:text-golden-1 cursor-pointer bg-bg-4/50 ")
    },
    list: {
        container: cva(" flex flex-col gap-2 rounded-2xl"),
        item: {
            container: cva(" grid grid-cols-13 grid-rows-3 md:grid-rows-1 gap-2 p-2 items-center  border-gray-800 rounded-2xl bg-bg-4"),
            input: {
                answer: cva(" col-span-full md:col-span-6 md:row-start-1 row-start-1 bg-bg-1/50"),
                question: cva(" col-span-full md:col-span-6 md:row-start-1 row-start-2 bg-bg-1/50")
            },
            btnDelect: cva(" col-span-full row-span-1  md:col-span-1 md:row-start-1 row-start-3  p-2 px-4 bg-red-800 rounded-lg cursor-pointer hover:text-golden-1 ")
        }
    }
}

export default function FormQuestion({ onUpdate }) {
    const { state, on } = useFormQuestion(onUpdate);
    return (
        <div className={style.container()}>
            <div className={style.bar.container()}>
                <input className={style.bar.title()} type="text" name="" placeholder="กรุณากรอกชื่อ หัวข้อ (ถามตอบ)" value={state.title || ""} onChange={e => on.change.title(e.target.value)} />
                <button className={style.bar.btnCreate()} type="button" onClick={on.click.btn.create}>เพิ่ม</button>
            </div>
            <div className={style.list.container()}>
                {state?.value?.map(({ q, a }, index) =>
                    <div className={style.list.item.container()} key={index}>
                        <input className={style.list.item.input.question()} type="text" placeholder="กรุณากรอก คำถาม" value={q} onChange={e => on.change.q(index, e.target.value)} />
                        <input className={style.list.item.input.answer()} type="text" placeholder="กรุณากรอก คำตอบ" value={a} onChange={e => on.change.a(index, e.target.value)} />
                        <button className={style.list.item.btnDelect()} type="button" onClick={() => on.click.btn.delete(index)}>ลบ</button>
                    </div>
                )}
            </div>
        </div>
    )
}
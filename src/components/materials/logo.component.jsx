import { cva } from "class-variance-authority"

export default function Logo({ className, onClick, src }) {
    let style = cva(" aspect-square w-20 hover:cursor-pointer active:scale-90")
    return <img src={src} className={style({ className })} onClick={onClick} />
}

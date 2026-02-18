import { cva } from "class-variance-authority"
import { Link } from "react-router"

export default function Logo({ className, onClick, src }) {
    let style = cva(" aspect-square w-20 hover:cursor-pointer active:scale-90 duration-300")
    return (
        <Link to="/">
            <img src={src} className={style({ className })} onClick={onClick} />
        </Link>
    )
}

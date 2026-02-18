import { cva } from "class-variance-authority"
import { Link } from "react-router"

export default function Logo({ className, onClick, src }) {
    let style = cva(" h-full w-full object-cover hover:cursor-pointer active:scale-90 duration-300")
    return (
        <Link to="/" className=" h-[80px] aspect-square">
            <img src={src} className={style({ className })} onClick={onClick} />
        </Link>
    )
}

import { useRef, useState } from "react"
import Box from "./Box.component"
import { cva } from "class-variance-authority"
import { cn } from "../../../../utility"
import Btn from "./btn.component"
import Title from "./title.component"

let imgVariant = cva(
    " bg-gray-950 rounded-lg duration-300  object-contain w-full   ",
    {
        variants: {
            variant: {
                "secondary": " snap-mandatory snap-start",
                "btn": ""
            },
            scale: {
                "seqare": "aspect-square ",
                "full": "aspect-video",
                "card": "aspect-3/2",
            },
            isActive: {
                false: " brightness-30 hover:brightness-90 cursor-pointer hover:scale-95"
            }
        },
        defaultVariants: {
            scale: "full"
        }
    }
)

const Image = ({ img, onClick, isActive, variant, scale, className }) => <img className={cn(imgVariant({ variant, scale, isActive, className }))} src={img} onClick={onClick} />

function useGallery() {
    let listImageRef = useRef()
    const [position, setPosition] = useState(0)
    let evnet = {
        position: {
            set: (newPosition) => setPosition(newPosition)
        },
        scroll: {
            on: () => {
                let width = listImageRef.current.scrollWidth
                let all = listImageRef.current.clientWidth
                console.log("on : ", width, all)
            },
            next: () => { listImageRef.current.scrollBy({ left: listImageRef.current.clientWidth, behavior: "smooth" }) },
            pre: () => { listImageRef.current.scrollBy({ left: -listImageRef.current.clientWidth, behavior: "smooth" }) }
        }
    }
    return {
        listImageRef, position, evnet
    }


}
export default function Gallery({ className, images }) {
    const { listImageRef, position, evnet } = useGallery();
    return images &&
        <Box className={`aspect-video relative flex justify-center rounded-lg *:select-none ${className} `}>
            <Title variant={"third"} className={"absolute right-[2%] top-[2%] text-sm text-gray-600  "}>{`${position + 1} / ${images.length}`}</Title>
            <Image img={images[position]} />
            <Box variant={"row"} className={" absolute h-[20%] bottom-[5%] left-0 mx-[5vw] overflow-hidden justify-start z-30 snap-x "} ref={listImageRef} onScroll={evnet.scroll.on} >
                {images?.map((img, index) => <Image variant="secondary" isActive={position === index} img={img} onClick={() => evnet.position.set(index)} key={index} />)}
            </Box>
            <Box variant={"row-between"} className={"absolute h-[20%]  w-full px-[3vw] bottom-[5%] *:z-40 "}>
                <Btn onClick={evnet.scroll.pre}>{"<"}</Btn>
                <Btn onClick={evnet.scroll.next}>{">"}</Btn>
            </Box>
        </Box>

};

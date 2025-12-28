import { cva } from "class-variance-authority";
import Box from "./Box.component";
import { cn } from "../../../../utility";

let modalVariant = cva(
    " fixed w-full h-full z-[50] bg-black/80 top-0 left-0 flex flex-col justify-center items-center duration-300 ",
)
export default function Modal({ children, className }) {
    return (
        <Box className={cn(modalVariant({ className }))}>
            <Box >
                <Box>{children}</Box>
            </Box>
        </Box>
    )
};

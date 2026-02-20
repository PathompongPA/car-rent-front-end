import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

function useReveal(options = { threshold: 0.2 }) {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            options
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [options]);

    return { ref, isInView };

}

let style = cva(
    "", {
    variants: {
        isInView: {
            false: " opacity-0 ",
            true: "animate-fade ",
        }
    }
})

export default function Reveal({ children, className }) {
    const { ref, isInView } = useReveal();
    return (
        <div ref={ref} className={style({ isInView, className })} >
            {children}
        </div>
    );
};

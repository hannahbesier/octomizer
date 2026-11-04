import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
export default function Slideshow({ images, index, setIndex }: { images: string[], index: number, setIndex: Dispatch<SetStateAction<number>> }) {
    useEffect(() => {
        const timer = setTimeout(() => { if (index !== images.length - 1) { setIndex(index + 1) } else { setIndex(0) } }, 8000);
        return () => clearTimeout(timer);
    }, [index]);
    return (
        <div className="relative rounded-sm shadow dark:shadow-darkmode w-[80%] aspect-[9/16] sm:aspect-[15/8] overflow-hidden">
            <div key={index} className="h-1 w-full bg-primaryLight animate-slider"></div>
            {images.map((img, idx) => (
                <img
                    key={img}
                    src={img}
                    alt="Issue Edit Example"
                    fetchPriority="high"
                    loading="eager"
                    data-active={idx === index}
                    className="absolute h-full w-full object-cover transition-transform duration-500 data-[active=true]:translate-x-0 translate-x-full "
                />
            ))}
        </div>
    )
}
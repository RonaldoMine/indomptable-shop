import React from "react";
import {StaticImageData} from "next/dist/client/image";
import Image from "next/image";

interface OnePeopleProps {
    img: string | StaticImageData,
    title: string,
    onClick: () => void
}

export default function OnePeople({img, title, onClick}: OnePeopleProps) {
    return (
        <div className={"md:w-72 w-full bg-[var(--color-orange)] mb-4 rounded hover:cursor-pointer"} onClick={onClick}>
            <Image src={img} alt={title} height={0} width={768}
                   className={"h-full object-cover rounded transition-transform duration-100 hover:translate-x-[-10px] hover:translate-y-[-10px]"}></Image>
        </div>
    )
}

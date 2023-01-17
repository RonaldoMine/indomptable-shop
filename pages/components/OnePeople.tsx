import React, {MouseEventHandler} from "react";
import {StaticImageData} from "next/dist/client/image";
import Image from "next/image";

interface OnePeopleProps {
    img: string | StaticImageData,
    title: string,
    onClick: () => void
}

export default function OnePeople({img, title, onClick}: OnePeopleProps) {
    return (
        <div className={"h-[150] md:w-72 w-full bg-red-400 mb-4 rounded hover:cursor-pointer"} onClick={onClick}>
            <Image src={img} alt={title} height={1024} width={768}
                   className={"h-full object-cover rounded transition-transform duration-100 hover:translate-x-[-10px] hover:translate-y-[-10px]"}></Image>
        </div>
    )
}

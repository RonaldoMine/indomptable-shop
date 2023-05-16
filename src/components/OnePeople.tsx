import React from "react";
import {StaticImageData} from "next/dist/client/image";
import Image from "next/image";
import Link from "next/link";

interface OnePeopleProps {
    img: string | StaticImageData;
    title: string;
    blurUrl: string;
    width: number;
    height?: number;
}

export default function OnePeople({img, title, blurUrl, width, height = 100}: OnePeopleProps) {
    return (
        <div
            className={
                "md:w-60 lg:w-72 w-full mb-4 rounded"
            }
        >
            <Image
                src={img}
                alt={title}
                placeholder="blur"
                blurDataURL={blurUrl}
                height={height}
                width={width}
                className={
                    "h-[400px] sm:h-[200px] md:h-[300px] object-cover rounded duration-100"
                }
            ></Image>
        </div>
    );
}

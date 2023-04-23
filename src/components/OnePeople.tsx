import React from "react";
import { StaticImageData } from "next/dist/client/image";
import Image from "next/image";

interface OnePeopleProps {
  img: string | StaticImageData;
  title: string;
  onClick: () => void;
  blurUrl: string;
  width:number;
  height:number;
}

export default function OnePeople({ img, title, onClick, blurUrl, width, height }: OnePeopleProps) {
  return (
    <div
      className={
        "md:w-72 w-full mb-4 rounded hover:cursor-pointer"
      }
      onClick={onClick}
    >
      <Image
        src={img}
        alt={title}
        placeholder="blur"
        blurDataURL={blurUrl}
        height={height}
        width={width}
        className={
          "h-full object-cover rounded duration-100"
        }
      ></Image>
    </div>
  );
}

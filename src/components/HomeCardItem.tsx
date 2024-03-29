import Image from "next/image";
import {StaticImageData} from "next/dist/client/image";
import Link from "next/link";
import {HiOutlineExternalLink} from "react-icons/hi";

export enum HomeCardType {
    left = "left",
    right = "right"
}
interface HomeCardItemProps {
    src: string | StaticImageData,
    alt: string,
    title: string,
    typeCategory: string,
    slugProduct: string,
    typeClass: HomeCardType
}

export default function HomeCardItem({src, alt, title, typeClass, typeCategory, slugProduct}: HomeCardItemProps) {
    return (
        <div className={`item-card relative flex justify-center ${typeClass} overflow-hidden`}>
            <Image className={"w-96 sm:w-[26rem] z-20"} placeholder="blur" width={539} height={885} src={src} alt={alt}/>
            <Link className={"z-30"} href={`/category/${typeCategory}/${slugProduct}`}><button title={alt} className={"absolute p-4 rounded-full text-white top-5"}><HiOutlineExternalLink  /></button></Link>
            <span className={`text-[10rem] w-auto absolute top-0 bottom-0 z-10 font-semibold text-gradient opacity-90`}>{title.toUpperCase()}</span>
        </div>
    )
}

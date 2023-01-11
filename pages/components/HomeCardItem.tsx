import Image from "next/image";
import {StaticImageData} from "next/dist/client/image";
import styles from "../../styles/Landing.module.css"

export enum HomeCardType {
    left = "left",
    right = "right"
}
interface HomeCardItemProps {
    src: string | StaticImageData,
    alt: string,
    title: string
    typeClass: HomeCardType
}

export default function HomeCardItem({src, alt, title, typeClass}: HomeCardItemProps) {
    return (
        <div className={`item-card relative flex justify-center ${typeClass}`}>
            <Image className={"w-96 sm:w-[26rem] z-20"} src={src} alt={alt}/>
            <span className={`${styles.title} w-auto absolute top-0 bottom-0 z-10 font-semibold text-gradient opacity-70`}>{title.toUpperCase()}</span>
        </div>
    )
}

import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import React from "react";
import { useBasket } from "../context/BasketContext";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ButtonBorder, ButtonGradient } from "./Button";

type ToastProductProps = {
  product: any;
  size: string;
  onClose?: () => void;
};
export default function ToastProduct({
  product,
  size,
  onClose,
}: ToastProductProps) {
  const { basket } = useBasket();
  const router = useRouter();
  const { t } = useTranslation("product-page");
  return (
    <div className="dark:bg-neutral-800">
      <div className="flex items-center justify-between mb-2">
        <AiFillCheckCircle className={"fill-green-500 mr-3"} />
        <h3>{t("toast-title")}</h3>
        <AiOutlineClose
          className={"fill-red-500 mr-3 hover:cursor-pointer"}
          onClick={() => {
            onClose && onClose();
          }}
        />
      </div>
      <div className="flex mb-6">
        <Image
          className="w-32 h-32 object-contain mr-2"
          src={product?.thumbnail}
          placeholder="blur"
          blurDataURL={product?.thumbnail + '&blur=70'}
          alt={product?.name}
          width={128}
          height={211.2}
          quality={100}
        />
        <div className={"grid items-center"}>
          <p className={"font-bold text-slate-700 dark:text-neutral-200"}>
            {product?.name}
          </p>
          <p className="dark:text-neutral-400">
            {t("size")}{" "}
            <span className={"text-neutral-700 dark:text-neutral-300"}>
              {size}
            </span>
          </p>
          <p className="dark:text-neutral-300">
            XAF{" "}
            <span className={"text-neutral-700 dark:text-neutral-300"}>
              {product?.pricePromo > 0 ? product?.pricePromo : product?.price}
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ButtonBorder
          className={"w-full"}
          onClick={() => {
            router.push("/cart");
            onClose && onClose();
          }}
        >
          {t("view-cart")} ({basket.totalProduct})
        </ButtonBorder>
        <ButtonGradient
          onClick={() => {
            onClose && onClose();
            router.push("/checkout");
          }}
        >
          {t("checkout")}
        </ButtonGradient>
      </div>
    </div>
  );
}

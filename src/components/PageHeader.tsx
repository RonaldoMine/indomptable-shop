import React from "react";
import {BiArrowBack} from "react-icons/bi";

export default function PageHeader({title}: { title: string }) {
    return (
        <>
            <div className={"flex justify-between items-center"}>
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-neutral-100 text-center sm:text-left">
                    {title}
                </h1>
{/*
                <button onClick={() => window.history.back()} title={"Back"}><BiArrowBack/></button>
*/}
            </div>
            <hr className="my-6"/>
        </>
    )
}

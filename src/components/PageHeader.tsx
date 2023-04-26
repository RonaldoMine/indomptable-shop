import React from "react";

export default function PageHeader({title}: {title:string}){
    return (
        <>
            <h1 className="text-3xl font-bold dark:text-neutral-100 text-center sm:text-left">
                {title}
            </h1>
            <hr className="my-6"/>
        </>
    )
}

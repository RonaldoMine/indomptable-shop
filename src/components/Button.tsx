import React from "react";

type ButtonProps =  {
    children: React.ReactNode,
    className?: string,
    onClick?: () => void;
}

export function ButtonGradient({children, className, onClick}: ButtonProps) {
    return (<button type={"submit"} onClick={onClick}
                    className={`font-space px-10 py-3 hover:bg-opacity-20 text-white bg-orange-gradient rounded-button ${className}`}>
        {children}
    </button>);
}
export function ButtonBorder({children, className, onClick}: ButtonProps){
    return (
        <button
            onClick={onClick}
            className={`border-slate-700 border-2 px-10 py-3 font-space dark:border dark:border-neutral-600 dark:text-neutral-300 rounded-button ${className}`}
        >
            {children}
        </button>
    )
}

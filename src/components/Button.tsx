import React from "react";

type ButtonProps =  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
    className?: string,
    onClick?: () => void;
}

export function ButtonGradient({children, className, onClick, ...rest}: ButtonProps) {
    return (<button type={"submit"} onClick={onClick}
                    className={`font-copy px-4 py-3 hover:bg-opacity-20 text-white bg-orange-gradient ${className}`} {...rest}>
        {children}
    </button>);
}
export function ButtonBorder({children, className, onClick, ...rest}: ButtonProps){
    return (
        <button
            onClick={onClick}
            className={`border-slate-700 border-2 px-4 py-3 font-copy dark:border dark:border-neutral-600 dark:text-neutral-300 rounded-button ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}

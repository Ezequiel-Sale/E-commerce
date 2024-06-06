import React from "react"
import { IButton } from "./interface"
import clsx from "clsx"

const Button: React.FC<IButton> = ({ children, onClick,  className, id }) => {
    const defaultClass = "rounded-md text-white"

    return (
        <div className="">
            <button className={clsx(className, defaultClass)} onClick={onClick}>{children}</button>
        </div>
    )
}

export default Button
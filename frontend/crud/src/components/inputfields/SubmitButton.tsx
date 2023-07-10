import React, { MutableRefObject } from 'react'

interface SubmitButtonProps {
    top?: number,
    bottom?: number,
    x?: number,
    y?: number,
    text: string,
    disabled?: boolean
}
export const SubmitButton = ({ top, bottom, x, y, text, disabled }: SubmitButtonProps) => {

    return (
        <div className={`mt-${top ? top : 0} mb-${bottom ? bottom : 0} my-${y ? y : 0} mx-${x ? x : 0}`}>
            <button className="btn btn-primary  d-grid w-100" type="submit" disabled={disabled ? disabled : false}>
                {text}
            </button>
        </div>
    )
}

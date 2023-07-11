import React, { MutableRefObject } from 'react'

interface SubmitButtonProps {
    top?: number,
    bottom?: number,
    x?: number,
    y?: number,
    text: string,
    disabled?: boolean,
    callback: () => void
}
export const EditButton = ({ top, bottom, x, y, text, disabled, callback }: SubmitButtonProps) => {

    return (
        <div className={`mt-${top ? top : 0} mb-${bottom ? bottom : 0} my-${y ? y : 0} mx-${x ? x : 0}`}>
            <button onClick={e => { callback() }} className="btn btn-primary  d-grid w-100" type="submit" disabled={disabled ? disabled : false}>
                {text}
            </button>
        </div>
    )
}

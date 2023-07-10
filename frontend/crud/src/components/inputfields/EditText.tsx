import React, { MutableRefObject } from 'react'
import './EditText.css'

interface EditTextProps {
    top?: number,
    bottom?: number,
    x?: number,
    y?: number,
    label?: string,
    reference: MutableRefObject<HTMLInputElement>,
    type?: string,
    placeholder?: string,
    value?: string,
    autoFocus?: boolean
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const EditText = ({ top, bottom, x, y, label, reference, type, placeholder, value, autoFocus,onInput }: EditTextProps) => {
    return (
        <div className={`mt-${top ? top : 0} mb-${bottom ? bottom : 0} my-${y ? y : 0} mx-${x ? x : 0} label-text`}>
            <label className="form-label">{label ? label : ""} </label>
            <input defaultValue={value} ref={reference} type={type ? type : 'text'} className="form-control editText" placeholder={placeholder ? placeholder : "Enter"}
                autoFocus={autoFocus ? autoFocus : false} onInput={onInput} />
        </div>
    )
}

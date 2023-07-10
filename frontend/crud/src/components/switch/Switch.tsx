import React, { MutableRefObject } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Switch.css'

interface SwitchProps {
    reference: MutableRefObject<HTMLInputElement>,
    text: string,
    defaultVal: boolean
}
export const Switch = ({ reference, text, defaultVal }: SwitchProps) => {
    function handleChange(e: any) {
        reference.current.value = e.checked
    }
    return (
        <div className="switchdiv form-switch">
            <input ref={reference} defaultChecked={defaultVal} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={e => { handleChange(e) }} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{text}</label>
        </div>
    )
}

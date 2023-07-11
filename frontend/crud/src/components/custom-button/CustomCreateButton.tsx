import React from 'react'
import './CustomCreateButton.css'
interface CustomCreateButtonProps {
    danger?: boolean,
    callback: () => void,
    text: string,
}
export const CustomCreateButton = ({ danger, callback, text }: CustomCreateButtonProps) => {
    return (
        <div className='custom-create-div'>
            {<div className={`add-btn${danger ? '-red' : ''}`} onClick={e => { callback() }}>
                <span className='btn-txt'>{text}</span>
            </div>}
            <div className={`line${danger ? '-red' : ''}`} />
        </div>
    )
}

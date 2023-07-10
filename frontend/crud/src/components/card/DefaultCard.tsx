import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

interface CardProps {
    children:JSX.Element
}
export const Card = ({ children }: CardProps) => {
    return (
        <div className="card shadow-sm border-0 ">
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}
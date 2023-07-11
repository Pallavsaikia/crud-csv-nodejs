import React, { useState } from 'react'
import { AlertContext } from './context/AlertContext';
import { AlertData } from './data/alert.type';
import { AlertType } from './alert-type';
import './Alert.css'

export interface AlertProps {
    children: JSX.Element,
    duration: number
}

export const Alert = ({ children, duration }: AlertProps) => {
    const [alert, setAlert] = useState<AlertData | null>(null);

    function updateAlert(alertObj: AlertData | null) {
        console.log(alertObj)
        setAlert(alertObj)
        setTimeout(() => {
            setAlert((null))
        }, duration)

    }

    function alertUI() {
        if (alert === null) {
            return (null)
        } else {
            return (
                <div className={`shadow ${(alert.type===AlertType.success) ? 'alertNotification-primary' : 'alertNotification-danger'}`} role="alert">
                    <div className="alert-header" >
                        <div className="alert-header-div">
                            <strong className="alert-header-text">Server Response</strong>
                        </div>
                        <button type="button" className="alert-button-close" onClick={e => updateAlert(null)}></button>
                    </div>
                    <div className="alert-message">
                        {alert.message}
                    </div>
                </div>
            )
        }
    }

    return (
        <AlertContext.Provider value={{ alert, updateAlert }}>
            {children}
            {alertUI()}

        </AlertContext.Provider>
    )
}





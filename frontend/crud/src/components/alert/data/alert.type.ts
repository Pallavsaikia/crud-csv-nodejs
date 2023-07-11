import { AlertType } from "../alert-type";

export interface AlertData {
    message?: string,
    type?: AlertType
}

export interface AlertContextType {
    alert: AlertData | null,
    updateAlert: (alertObj: AlertData | null) => void
}
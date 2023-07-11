import React from 'react';
import { AlertContextType } from '../data/alert.type';



export const AlertContext = React.createContext<AlertContextType | null>(null)
export const AlertProvider = AlertContext.Provider

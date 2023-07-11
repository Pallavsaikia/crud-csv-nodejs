import { ServerError } from "../error"




export interface DeleteUserByIDResponse {
    success: boolean,
    message: string,
    data?: {
        user: any
    },
    error?: ServerError[]

}
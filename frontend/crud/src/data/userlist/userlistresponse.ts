import { ServerError } from "../error"


export interface User {
    firstname: string,
    lastname: string,
    email: string,
    _id: string,

}

export interface UserListResponse {
    success: boolean,
    message: string,
    data?: {
        user: User[]
    },
    error?: ServerError[]
    
}
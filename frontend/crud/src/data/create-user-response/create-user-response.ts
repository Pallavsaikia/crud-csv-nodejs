import { ServerError } from "../error"

interface User {
    firstname: string,
    lastname: string,
    email: string,
    _id: string,

}


export interface CreateUserResponse {
    success: boolean,
    message: string,
    data?: {
        user: User
    },
    error?: ServerError[]

}
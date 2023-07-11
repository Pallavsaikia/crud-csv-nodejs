import { ServerError } from "../error"

export interface UserDetails {
    firstname: string,
    lastname: string,
    email: string,
    _id: string,
    isAdult: boolean,
    age:number,
    createdAt:string,
    updatedAt:string
        
}


export interface GetUserByIDResponse {
    success: boolean,
    message: string,
    data?: {
        user: UserDetails
    },
    error?: ServerError[]

}
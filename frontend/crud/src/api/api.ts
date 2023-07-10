import axios from "axios"
import { URLs } from "../meta/urls"
import { UserListResponse } from "../data/userlist"
import { CreateUserResponse } from "../data/create-user-response"

const enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}


function axiosInit(method: METHOD = METHOD.GET, url: string, payload: any) {
    return {
        method: method,
        url: url,
        data: payload,
        // cancelToken: request ? request.token : null,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    }
}

async function axiosHandler<T>(method: METHOD = METHOD.GET, url: string, payload: any): Promise<T> {
    try {
        const response = await axios(axiosInit(method, url, payload))
        return response.data
    } catch (e: any) {
        return e.response.data
    }
}


export async function getUsers(): Promise<UserListResponse> {
    const res = await axiosHandler<UserListResponse>(METHOD.GET, URLs.CRUD_URL, null)
    if (res instanceof Error) {
        return {
            success: false,
            message: res.message
        }
    }
    return res
}

interface CreateUserData {
    firstname: string,
    lastname: string,
    email: string,
    age: number,
    isadult: boolean
}
export async function createUser(createUser: CreateUserData): Promise<CreateUserResponse> {
    const res = await axiosHandler<CreateUserResponse>(METHOD.POST, URLs.CRUD_URL, createUser)

    return res
}
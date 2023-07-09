import { DBConflictError } from "../middleware"
import { User, UserDoc, UserModel } from "../models/user"
import { omit, pick } from "../util"


interface SaveUserReturnAttr {
    error?: DBConflictError,
    data?: UserModel
}
export async function saveUserService(userModel: UserModel): Promise<SaveUserReturnAttr> {
    const dBConflictError = new DBConflictError([])
    try {
        const userExist = await new User().findOne({ email: userModel.email })
        if (userExist) {
            dBConflictError.push({ msg: "Email already exist", param: "email" })
            return {
                error: dBConflictError
            }
        } else {
            const user = await new User(userModel).save()
            return {
                data: user
            }
        }
    } catch (e: any) {
        dBConflictError.push({ msg: "Something went wrong", param: "DB" })
        return {
            error: dBConflictError
        }
    }

}

interface GetAllUserServiceReturnAttr {
    error?: DBConflictError,
    data?: UserData[]
}
interface UserData {
    _id: string,
    email: string
}
export async function getAllUserService(): Promise<GetAllUserServiceReturnAttr> {
    const dBConflictError = new DBConflictError([])
    try {
        const userList = await new User().findAll()

        return {
            data: userList.map<UserData>(itm => {
                return pick<UserData>(itm, "_id", "email")
            })
        }

    } catch (e: any) {
        dBConflictError.push({ msg: "Something went wrong", param: "DB" })
        return {
            error: dBConflictError
        }
    }

}

interface GetUserDetailsServiceReturnAttr {
    error?: DBConflictError,
    data?: UserDoc
}

export async function getUserDetailsByIDService(_id: string): Promise<GetUserDetailsServiceReturnAttr> {
    const dBConflictError = new DBConflictError([])
    try {
        const user = await new User().findByID(_id)
        if (!user) {
            dBConflictError.push({ msg: "user with id doesnot exist", param: "_id" })
            return {
                error: dBConflictError
            }
        }
        return {
            data: user
        }
    } catch (e: any) {
        dBConflictError.push({ msg: "Something went wrong", param: "DB" })
        return {
            error: dBConflictError
        }
    }

}




interface DeleteUserDetailsServiceReturnAttr {
    error?: DBConflictError,
    data?: UserDoc
}

export async function deleteUserDetailsByIDService(_id: string): Promise<DeleteUserDetailsServiceReturnAttr> {
    const dBConflictError = new DBConflictError([])
    try {
        const user = await new User().deletedByID(_id)
        if (!user) {
            dBConflictError.push({ msg: "user with id doesnot exist", param: "_id" })
            return {
                error: dBConflictError
            }
        }
        return {
            data: user
        }
    } catch (e: any) {
        dBConflictError.push({ msg: "Something went wrong", param: "DB" })
        return {
            error: dBConflictError
        }
    }

}


interface FinduserByIDAndUpdateServiceReturnAttr {
    error?: DBConflictError,
    data?: UserDoc
}

export async function finduserByIDAndUpdateService(userdoc: UserModel): Promise<FinduserByIDAndUpdateServiceReturnAttr> {
    const dBConflictError = new DBConflictError([])
    try {
        if (!userdoc._id) {
            dBConflictError.push({ msg: "invalid id", param: "_id" })
            return {
                error: dBConflictError
            }
        }
        const userList = await new User().find({ email: userdoc.email })
        if (userList.length == 1 && userList[0]._id !== userdoc._id) {
            dBConflictError.push({ msg: "email already taken", param: "email" })
            return {
                error: dBConflictError
            }
        }
        const updateduser = await new User().findByIDAndUpdate(userdoc._id, omit(userdoc, "_id", "updatedAt", "createdAt"))
        if (!updateduser) {
            dBConflictError.push({ msg: "user with id doesnot exist", param: "_id" })
            return {
                error: dBConflictError
            }
        }
        return {
            data: updateduser
        }
    } catch (e: any) {
        dBConflictError.push({ msg: "Something went wrong", param: "DB" })
        return {
            error: dBConflictError
        }
    }

}
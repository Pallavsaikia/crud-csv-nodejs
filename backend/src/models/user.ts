import { Models, DocumentAttr, ModelsAttr, Schema } from "../database"


export interface UserDoc extends DocumentAttr {
    email: string,
    lastname: string,
    firstname: string,
    isAdult: Boolean,
    age: Number
}
export interface UserModel extends ModelsAttr {
    email: string,
    lastname: string,
    firstname: string,
    isAdult: Boolean,
    age: Number
}

const userSchema = new Schema(
    {
        email: {
            type: String
        },
        lastname: {
            type: String
        },
        firstname: {
            type: String
        },
        age: {
            type: Number
        },
        isAdult: {
            type: Boolean
        }
    }
)

export class User extends Models<UserDoc, UserModel>{
    constructor(data?: UserModel) {
        super("user", userSchema, data)
    }


}
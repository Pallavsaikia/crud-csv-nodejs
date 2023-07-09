import { Models, DocumentAttr, ModelsAttr, Schema } from "../../../database"


export interface TestDoc extends DocumentAttr {
    email: string,
    name: string,
    isMarried: boolean,
}
export interface TestModel extends ModelsAttr {
    email: string,
    name: string,
    isMarried: boolean,
}

const testSchema = new Schema(
    {
        email: {
            type: String
        },
        name: {
            type: String
        },
        isMarried: {
            type: Boolean
        }
    }
)

export class TestScehma extends Models<TestDoc, TestModel>{
    constructor(data?: TestModel) {
        super("test", testSchema, data)
    }


}
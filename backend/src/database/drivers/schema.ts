export class Schema {
    schema: any
    constructor(schema: any) {
        this.schema = schema
        this.schema.createdAt= {
            type: Date
        }
        this.schema.updatedAt= {
            type: Date
        }
    }

    convertToProperType<T>(data: any): T {
        Object.keys(this.schema).map(itm => {
            if (this.schema[itm].type === String) {
                data[itm] = String(data[itm])
            }
            if (this.schema[itm].type === Boolean) {
                try{
                    data[itm] = data[itm].toString.toLowerCase() === "true" ? true : false
                }catch{
                    data[itm] = data[itm] === "true" ? true : false
                }
                
            }
            if (this.schema[itm].type === Number) {
                data[itm] = Number(data[itm])
            }
            if (this.schema[itm].type === Date) {
                data[itm] = new Date(data[itm])

            }
        })
       
        return data as T
    }
}


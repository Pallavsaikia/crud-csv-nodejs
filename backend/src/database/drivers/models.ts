import { DBConnect } from '../connect'
import path from 'path'
import fs from 'fs'
import * as csv from 'fast-csv';
import { checkFileExist, generateId, DataUtil } from '../util'
import { DatabaseResourseError } from '../errors';
import { Schema } from './schema';


export interface DocumentAttr {
    _id: string,
    createdAt: Date,
    updatedAt: Date
}
export interface ModelsAttr {
    _id?: string,
    createdAt?: Date,
    updatedAt?: Date

}



export abstract class Models<T extends DocumentAttr, U extends ModelsAttr>  {
    private modelname: string
    private filepath: string
    private data?: U
    private schema: Schema

    constructor(modelname: string, schema: Schema, data?: U) {
        this.modelname = modelname
        this.schema = schema
        if (data) {
            this.data = data
            this.data._id = generateId()
        }
        if (DBConnect.getBaselocation()) {
            this.filepath = path.resolve(DBConnect.getBaselocation(), this.modelname + ".csv")
        } else {
            throw new DatabaseResourseError("undefined db path")
        }

    }

    // private async create() {
    //     const promise = new Promise<boolean>(async (resolve, reject) => {
    //         if (this.data) {


    //             if (DBConnect.getBaselocation()) {
    //                 const fileExist = await checkFileExist(this.filepath)
    //                 if (!fileExist) {
    //                     const writableStream = fs.createWriteStream(this.filepath);
    //                     const csvStream = csv.format({ headers: true });
    //                     csvStream.pipe(writableStream);
    //                     const currentDatetime = new Date()
    //                     this.data!.createdAt = currentDatetime
    //                     this.data!.updatedAt = currentDatetime
    //                     csvStream.write(Object.keys(this.data))
    //                     console.log("created")
    //                     resolve(true)
    //                 }

    //             } else {
    //                 /**
    //                  * TODO throw error
    //                  */
    //                 throw new DatabaseResourseError("unable to create db because database not initialized")
    //             }
    //         }
    //     })
    //     return promise

    // }

    async findAll(): Promise<T[]> {
        const promise = new Promise<T[]>(async (resolve, reject) => {
            if (DBConnect.getBaselocation()) {
                try {
                    const fileExist = await checkFileExist(path.resolve(DBConnect.getBaselocation(), this.modelname + ".csv"))
                    if (fileExist) {

                        const data: T[] = [];
                        fs.createReadStream(this.filepath)
                            .pipe(csv.parse({ headers: true }))
                            .on('data', (row: T) => {
                                data.push(this.schema.convertToProperType<T>(row));
                            })
                            .on('end', () => {
                                resolve(data);
                            })
                            .on('error', (err: any) => {
                                reject(err);
                            });

                    } else {
                        resolve([]);
                    }
                } catch (e) {
                    reject(e)
                }

            } else {
                reject("error")
            }
        })
        return promise
    }
 
    async findOne(uniqueField: any): Promise<T | null> {
        const promise = new Promise<T | null>(async (resolve, reject) => {
            if (DBConnect.getBaselocation()) {
                try {
                    const fileExist = await checkFileExist(path.resolve(DBConnect.getBaselocation(), this.modelname + ".csv"))
                    if (fileExist) {


                        const readStream = fs.createReadStream(this.filepath)
                            .pipe(csv.parse({ headers: true }))
                            .on('data', (row: T) => {
                                const rowAsAny = row as any
                                Object.keys(row as any).map(itm => {
                                    if (Object.keys(uniqueField)[0] === itm) {
                                        if (uniqueField[itm].toString().toLowerCase() == rowAsAny[itm].toString().toLowerCase()) {
                                            resolve(this.schema.convertToProperType(row))
                                            readStream.destroy()
                                        }
                                    }
                                })
                            })
                            .on('end', () => {
                                try {
                                    resolve(null)
                                } catch (e) {
                                    reject(e)
                                }

                            })
                            .on('error', (err: any) => {
                                reject(err);
                            });

                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e)
                }

            } else {
                reject("error")
            }
        })
        return promise
    }

    async find(uniqueField: any): Promise<T[]> {
        const promise = new Promise<T[]>(async (resolve, reject) => {
            if (DBConnect.getBaselocation()) {
                try {
                    const fileExist = await checkFileExist(path.resolve(DBConnect.getBaselocation(), this.modelname + ".csv"))
                    if (fileExist) {

                        let data: T[] = []
                        const readStream = fs.createReadStream(this.filepath)
                            .pipe(csv.parse({ headers: true }))
                            .on('data', (row: T) => {
                                const rowAsAny = row as any
                                Object.keys(row as any).map(itm => {
                                    if (Object.keys(uniqueField)[0] === itm) {
                                        if (uniqueField[itm].toString().toLowerCase() == rowAsAny[itm].toString().toLowerCase()) {
                                            data.push(this.schema.convertToProperType(row))

                                        }
                                    }
                                })
                            })
                            .on('end', () => {
                                try {
                                    resolve(data)
                                } catch (e) {
                                    reject(e)
                                }

                            })
                            .on('error', (err: any) => {
                                reject(err);
                            });

                    } else {
                        resolve([]);
                    }
                } catch (e) {
                    reject(e)
                }

            } else {
                reject("error")
            }
        })
        return promise
    }

    async findByID(_id: string): Promise<T | null> {
        const promise = new Promise<T | null>(async (resolve, reject) => {
            if (DBConnect.getBaselocation()) {
                try {
                    const fileExist = await checkFileExist(path.resolve(DBConnect.getBaselocation(), this.modelname + ".csv"))
                    if (fileExist) {

                        let data: T | null = null
                        const readStream = fs.createReadStream(this.filepath)
                            .pipe(csv.parse({ headers: true }))
                            .on('data', (row: T) => {
                                if (row._id === _id) {
                                    data = this.schema.convertToProperType<T>(row);
                                    resolve(data);
                                    readStream.destroy()
                                }

                            })
                            .on('end', () => {
                                resolve(data);
                            })
                            .on('error', (err: any) => {
                                reject(err);
                            });

                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e)
                }

            } else {
                reject("error")
            }
        })
        return promise
    }

    async deletedByID(_id: string): Promise<T | null> {
        const promise = new Promise<T | null>(async (resolve, reject) => {
            DBConnect.lock.acquire(this.filepath, async (done) => {
                if (DBConnect.getBaselocation()) {
                    try {
                        const fileExist = await checkFileExist(path.resolve(DBConnect.getBaselocation(), this.modelname + ".csv"))
                        if (fileExist) {

                            const data: T[] = []
                            let deletedData: T | null = null

                            const readStream = fs.createReadStream(this.filepath)
                                .pipe(csv.parse({ headers: true }))
                                .on('data', (row: T) => {
                                    if (row._id !== _id) {
                                        data.push(this.schema.convertToProperType<T>(row))
                                    } else {
                                        deletedData = row
                                    }

                                })
                                .on('end', () => {
                                    try {
                                        const csvStream = csv.format({ headers: true });
                                        const writableStream = fs.createWriteStream(this.filepath, { flags: 'w' });
                                        csvStream.pipe(writableStream);
                                        for (let i = 0; i < data.length; i++) {
                                            csvStream.write(data[i]);
                                        }
                                        csvStream.end(() => {
                                            done()
                                            if(deletedData){
                                                resolve(this.schema.convertToProperType<T>(deletedData))
                                            }else{
                                                resolve(deletedData)
                                            }
                                            

                                        });
                                    } catch (e) {
                                        done()
                                        reject(e)
                                    }

                                })
                                .on('error', (err: any) => {
                                    done()
                                    reject(err);
                                });

                        } else {
                            done()
                            resolve(null);
                        }
                    } catch (e) {
                        done()
                        reject(e)
                    }

                } else {
                    done()
                    reject("error")
                }
            })
        })
        return promise
    }

    async findByIDAndUpdate(_id: string, updates: any): Promise<T | null> {
        const promise = new Promise<T | null>(async (resolve, reject) => {
            DBConnect.lock.acquire(this.filepath, async (done) => {
                if (DBConnect.getBaselocation()) {
                    try {
                        const fileExist = await checkFileExist(path.resolve(DBConnect.getBaselocation(), this.modelname + ".csv"))
                        if (fileExist) {

                            const data: T[] = []
                            let updateIndex = -1
                            let count = 0
                            let updatedData: T
                            const readStream = fs.createReadStream(this.filepath)
                                .pipe(csv.parse({ headers: true }))
                                .on('data', (row: T) => {
                                    if (row._id === _id) {
                                        updateIndex = count
                                    }
                                    data.push(row)
                                    count++
                                })
                                .on('end', () => {
                                    try {
                                        if (updateIndex != -1) {
                                            const csvStream = csv.format({ headers: true });
                                            const writableStream = fs.createWriteStream(this.filepath, { flags: 'w' });
                                            csvStream.pipe(writableStream);
                                            for (let i = 0; i < data.length; i++) {
                                                if (i == updateIndex) {
                                                    data[i] = DataUtil.update<T>(data[i], updates)
                                                    const currentDatetime = new Date()
                                                    data[i].updatedAt = currentDatetime
                                                    updatedData = data[i]
                                                }

                                                csvStream.write(data[i]);
                                            }
                                            csvStream.end(() => {
                                                done()
                                                resolve(this.schema.convertToProperType<T>(updatedData));
                                            });
                                        } else {
                                            done()
                                            reject("invalid id")
                                        }
                                    } catch (e) {
                                        done()
                                        reject(e)
                                    }

                                })
                                .on('error', (err: any) => {
                                    done()
                                    reject(err);
                                });

                        } else {
                            done()
                            resolve(null);
                        }
                    } catch (e) {
                        done()
                        reject(e)
                    }

                } else {
                    done()
                    reject("error")
                }
            })
        })
        return promise
    }


    async save() {
        if (!this.data) {
            return new Promise<U>((resolve, reject) => {
                reject("cannot be empty row")
            })
        }

        if (DBConnect.getBaselocation()) {
            const promise = new Promise<U>(async (resolve, reject) => {
                DBConnect.lock.acquire(this.filepath, async (done) => {
                    try {

                        const fileExist = await checkFileExist(this.filepath)
                        let csvStream: csv.CsvFormatterStream<csv.FormatterRow, csv.FormatterRow>
                        let writableStream: fs.WriteStream
                        if (!fileExist) {
                            csvStream = csv.format({ headers: true });
                            writableStream = fs.createWriteStream(this.filepath, { flags: 'w' });
                        } else {
                            csvStream = csv.format({ headers: false });
                            writableStream = fs.createWriteStream(this.filepath, { flags: 'a' });
                            writableStream.write('\n');
                        }
                        csvStream.pipe(writableStream!);
                        const currentDatetime = new Date()
                        this.data!.createdAt = currentDatetime
                        this.data!.updatedAt = currentDatetime
                        csvStream.write(this.data);
                        csvStream.end(() => {
                            console.log('added data to ' + this.modelname.toUpperCase() + " model");
                            done();
                            resolve(this.schema.convertToProperType<U>(this.data))

                        });
                    } catch (e) {
                        done();
                        reject(e)
                    }
                })

            })
            return promise

        } else {
            /**
             * TODO throw error
             */
            throw new DatabaseResourseError("unable to create db because database not initialized")
        }
    }
}